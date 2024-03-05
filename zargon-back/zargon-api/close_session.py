import boto3
import json

from boto3.dynamodb.conditions import Key

# Define our region and dynamo table
region_name = "us-east-2"
session_table = boto3.resource("dynamodb", region_name=region_name).Table("dev-sessions")


def handler(event, context):
    try:
        # Get sessionId from our path parameters
        path_params = event.get("pathParameters", {})
        sessionId = path_params.get("sessionId", "")

        # Get the current session from our dynamodb table
        session_data = session_table.get_item(Key={"sessionId": sessionId}).get("Item")

        # Checks if session exists or not
        if session_data is None:
            response(404, "Session not found")  # If it doesn't exist, we return a 404

        # save the current players for later
        current_players = session_data.get("players", [])

        # If it does exist, we save and close our current sessions
        session_data.update({"joinCode": "", "players": [], "unavailableHeroes": []})

        # Update the session in dynamo
        session_table.put_item(Item=session_data)

        # send close message to all players
        url = f"https://7dbdyzg58a.execute-api.us-east-2.amazonaws.com/dev"
        socket_client = boto3.client("apigatewaymanagementapi", endpoint_url=url)
        socket_message = {"action": "closeSession", "sessionId": sessionId}
        encoded_socket_message = json.dumps(socket_message).encode("utf-8")

        connection_table_name = "zargons-domain-dev-user-connections"
        connection_table = boto3.resource("dynamodb", region_name=region_name).Table(connection_table_name)

        # get all user sockets
        for player in current_players:
            connection = connection_table.query(
                IndexName="UserIdIndex",
                KeyConditionExpression=Key("userId").eq(player),
            )

            if len(connection.get("Items", [])) == 0:
                print("No connections found for user:", player)

            connectionId = connection["Items"][0]["connectionId"]

            try:
                print("Sending message to connectionId:", connectionId)
                socket_client.post_to_connection(ConnectionId=connectionId, Data=encoded_socket_message)
            except socket_client.exceptions.GoneException:
                print("ConnectionId:", connectionId, "is gone")
                connection_table.delete_item(Key={"connectionId": connectionId})

        # send message to all players

        # Return a 200 with our code
        return response(200, {"message": "Session closed successfully", "session": session_data})

    except Exception as e:
        # If something goes wrong, we return a 500
        print(e)
        return response(500, {"message": "Internal Server Error"})


def response(code, body):
    return {"statusCode": code, "headers": {"Content-Type": "application/json"}, "body": json.dumps(body)}
