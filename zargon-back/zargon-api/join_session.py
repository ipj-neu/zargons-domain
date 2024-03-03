import json
import boto3
from boto3.dynamodb.conditions import Attr, Key


def handler(event, context):
    userId = event["requestContext"]["authorizer"]["iam"]["cognitoIdentity"]["identityId"]
    body = json.loads(event.get("body", "{}"))

    if "joinCode" not in body:
        return {"statusCode": 400, "body": json.dumps({"message": "joinCode is required"})}

    join_code = body["joinCode"]

    # scan the table for the session with the join code
    session_table_name = "dev-sessions"
    session_table = boto3.resource("dynamodb").Table(session_table_name)

    response = session_table.scan(FilterExpression=Attr("joinCode").eq(join_code))

    if response["Count"] == 0:
        return {"statusCode": 404, "body": json.dumps({"message": "Session not found"})}

    session = response["Items"][0]

    if len(session["playersSocketUrl"]) >= 4:
        return {"statusCode": 400, "body": json.dumps({"message": "Session is full"})}

    # get the playerSocketUrl from the connection table
    connection_table_name = "zargons-domain-dev-user-connections"
    connection_table = boto3.resource("dynamodb").Table(connection_table_name)
    # get the connection for the user from the UserIdIndex
    response = connection_table.query(IndexName="UserIdIndex", KeyConditionExpression=Key("userId").eq(userId))
    if response["Count"] == 0:
        return {"statusCode": 404, "body": json.dumps({"message": "Connection not found"})}

    player_socket_url = response["Items"][0]["connectionId"]

    response = session_table.update_item(
        Key={"sessionId": session["sessionId"]},
        UpdateExpression=f"SET playerSocketUrl = list_append(if_not_exists(playerSocketUrl, :empty_list), :new_value)",
        ExpressionAttributeValues={
            ":new_value": [player_socket_url],
            ":empty_list": [],
        },
        ReturnValues="UPDATED_NEW",
    )

    return_body = {
        "sessionId": session["sessionId"],
        "name": session["name"],
        "unavailableHeroes": session["unavailableHeroes"],
    }

    return {"statusCode": 200, "body": json.dumps(return_body)}
