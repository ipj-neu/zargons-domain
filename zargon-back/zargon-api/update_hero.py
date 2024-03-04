import boto3
import json

from boto3.dynamodb.conditions import Key

# hardcoding region name
region_name = "us-east-2"

# getting the correct table from dynamoDB
dynamoTable = boto3.resource("dynamodb", region_name=region_name).Table("dev-sessions")
connections_table = boto3.resource("dynamodb", region_name=region_name).Table("zargons-domain-dev-user-connections")


def handler(event, context):

    try:

        sessionId = event.get("pathParameters", {}).get("sessionId")

        heroType = event.get("pathParameters", {}).get("heroType")

        if heroType not in ["Barbarian", "Dwarf", "Elf", "Wizard"]:
            return {"statusCode": 400, "body": json.dumps({"message": "Select correct hero type"})}

        # storing the body of the request
        body = json.loads(event.get("body", "{}"))

        response = dynamoTable.update_item(
            Key={"sessionId": sessionId},
            UpdateExpression="SET heroes.#heroType = :heroObj",
            ExpressionAttributeNames={"#heroType": heroType},  # e.g., "Barbarian"
            ExpressionAttributeValues={":heroObj": body},  # The entire hero object from the request body
            ReturnValues="ALL_NEW",
        )

        session = response.get("Attributes")
        if session is None:
            return {"statusCode": 404, "body": json.dumps({"message": "Session not found"})}

        # get gm connectionId
        connection = connections_table.query(
            IndexName="UserIdIndex",
            KeyConditionExpression=Key("userId").eq(session["userId"]),
        )
        print(connection)
        if "Items" not in connection:
            return {"statusCode": 404, "body": json.dumps({"message": "Connection not found"})}

        # send message to gm
        connectionId = connection["Items"][0]["connectionId"]

        url = f"https://7dbdyzg58a.execute-api.us-east-2.amazonaws.com/dev"
        socket_client = boto3.client("apigatewaymanagementapi", endpoint_url=url)
        socket_message = {"action": "updateHero", "sessionId": sessionId, "heroType": heroType, "hero": body}
        encoded_socket_message = json.dumps(socket_message).encode("utf-8")

        try:
            socket_client.post_to_connection(ConnectionId=connectionId, Data=encoded_socket_message)
        except socket_client.exceptions.GoneException:
            connections_table.delete_item(Key={"connectionId": connectionId})

        return {"statusCode": 200}

    # Display error message
    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}
