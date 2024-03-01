import boto3


def handler(event, context):
    session_table_name = "dev-sessions"
    session_table = boto3.resource("dynamodb").Table(session_table_name)

    user_id = event["requestContext"]["authorizer"]["iam"]["cognitoIdentity"]["identityId"]

    if "sessionId" not in event["pathParameters"]:
        return {"statusCode": 400, "body": "Missing sessionId"}

    session_id = event["pathParameters"]["sessionId"]

    try:
        session_table.delete_item(
            Key={"sessionId": session_id},
            ConditionExpression="userId = :userId",
            ExpressionAttributeValues={":userId": user_id},
        )
    except session_table.meta.client.exceptions.ConditionalCheckFailedException:
        return {"statusCode": 403, "body": "Session does not belong to user"}

    return {"statusCode": 204}
