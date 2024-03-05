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

    if len(response.get("Items", [])) == 0:
        return {"statusCode": 404, "body": json.dumps({"message": "Session not found"})}

    session = response["Items"][0]

    if userId not in session["players"]:
        if len(session["players"]) >= 4:
            return {"statusCode": 400, "body": json.dumps({"message": "Session is full"})}

        session_table.update_item(
            Key={"sessionId": session["sessionId"]},
            UpdateExpression=f"SET players = list_append(if_not_exists(players, :empty_list), :new_value)",
            ExpressionAttributeValues={
                ":new_value": [userId],
                ":empty_list": [],
            },
        )

    return_body = {
        "sessionId": session["sessionId"],
        "name": session["name"],
        "unavailableHeroes": session["unavailableHeroes"],
    }

    return {"statusCode": 200, "body": json.dumps(return_body)}
