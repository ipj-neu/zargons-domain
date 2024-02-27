import boto3
from boto3.dynamodb.conditions import Key
import json


def handler(event, context):
    user_id = event["requestContext"]["authorizer"]["iam"]["cognitoIdentity"]["identityId"]

    session_table_name = "dev-sessions"
    session_table = boto3.resource("dynamodb").Table(session_table_name)

    response = session_table.query(IndexName="UserIdIndex", KeyConditionExpression=Key("userId").eq(user_id))

    if "Items" not in response:
        return {"statusCode": 200, "body": json.dumps([])}

    return {"statusCode": 200, "body": json.dumps(response["Items"])}
