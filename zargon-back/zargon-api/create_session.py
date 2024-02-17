import json


def handler(event, context):
    user_id = event["requestContext"]["authorizer"]["iam"]["cognitoIdentity"]["identityId"]
    params = event.get("queryStringParameters", {})
    body = json.loads(event.get("body", "{}"))
    if "sessionId" not in body or "sessionId" not in params:
        return {"statusCode": 400, "body": "sessionId is required"}

    return {"statusCode": 200, "body": "Session created"}
