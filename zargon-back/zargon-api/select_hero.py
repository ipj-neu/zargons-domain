import boto3
from boto3.dynamodb.conditions import Key
from os import getenv
from uuid import uuid4
import json

# hardcoding region name
region_name = "us-east-2"

# getting the correct table from dynamoDB
dynamoTable = boto3.resource("dynamodb", region_name=region_name).Table("dev-sessions")


def handler(event, context):

    try:

        sessionId = event.get("pathParameters", {}).get("sessionId")

        # storing the body of the request
        body = json.loads(event.get("body", "{}"))

        hero_name = body.get("hero")
        if not hero_name:
            return {"statusCode": 400, "body": json.dumps({"message": "Hero name is required"})}

        # Query DynamoDB for the session item using sessionId
        response = dynamoTable.get_item(Key={"sessionId": sessionId})

        # Check if the session item was found
        if "Item" not in response:
            return {"statusCode": 404, "body": json.dumps({"message": "Session not found"})}

        # Get the heroes map from the session item
        heroes = response["Item"].get("heroes", {})

        # Check if the hero exists in the heroes map
        if hero_name not in heroes:
            return {"statusCode": 404, "body": json.dumps({"message": "Hero not found"})}

        # Now you have the hero details, which you can use as needed
        hero = heroes[hero_name]

        # Retrieve "unavailableHeroes" array from the session item
        unavailable_heroes = response["Item"].get("unavailableHeroes", [])

        # Check if hero_name is in the "unavailableHeroes" array
        if hero_name in unavailable_heroes:
            return {"statusCode": 409, "body": json.dumps({"message": "Hero already selected"})}
        else:
            # Hero name is not in unavailableHeroes, handle accordingly
            # Append hero_name to unavailable_heroes
            unavailable_heroes.append(hero_name)

            # Update the item in DynamoDB
            dynamoTable.update_item(
                Key={"sessionId": sessionId},
                UpdateExpression="SET unavailableHeroes = :heroes",
                ExpressionAttributeValues={":heroes": unavailable_heroes},
            )

        # Update the GM
        connection_table_name = "zargons-domain-dev-user-connections"
        connection_table = boto3.resource("dynamodb", region_name=region_name).Table(connection_table_name)

        url = f"https://7dbdyzg58a.execute-api.us-east-2.amazonaws.com/dev"
        socket_client = boto3.client("apigatewaymanagementapi", endpoint_url=url)
        socket_message = {"action": "sessionJoined", "hero": hero_name}
        encoded_socket_message = json.dumps(socket_message).encode("utf-8")

        # get gm socket
        gm = response["Item"]["userId"]
        connection_response = connection_table.query(
            IndexName="UserIdIndex",
            KeyConditionExpression=Key("userId").eq(gm),
        )
        if len(connection_response.get("Items", [])) == 0:
            print("No connections found for user:", gm)
        connectionId = connection_response["Items"][0]["connectionId"]
        try:
            print("Sending message to connectionId:", connectionId)
            socket_client.post_to_connection(ConnectionId=connectionId, Data=encoded_socket_message)
        except socket_client.exceptions.GoneException:
            print("ConnectionId:", connectionId, "is gone")
            connection_table.delete_item(Key={"connectionId": connectionId})

        return {"statusCode": 200}

    # Display error message
    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}
