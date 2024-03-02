import boto3
import json


def handler(event, context):
    path_params = event.get("pathParameters", {})

    if "sessionId" not in path_params:
        return {"statusCode": 400, "body": "sessionId is required"}

    session_id = path_params["sessionId"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("dev-sessions")

    response = table.get_item(Key={"sessionId": session_id})

    if "Item" not in response:
        return {"statusCode": 404, "body": "Session not found"}

    session = response["Item"]

    return {"statusCode": 200, "body": json.dumps(session)}
