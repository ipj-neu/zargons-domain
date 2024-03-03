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

        heroType = event.get("pathParameters", {}).get("heroType")

        if heroType not in ["Barbarian", "Dwarf", "Elf", "Wizard"]:
            return {"statusCode": 400, "body": json.dumps({"message": "Select correct hero type"})}

        # storing the body of the request
        body = json.loads(event.get("body", "{}"))

        dynamoTable.update_item(
            Key={"sessionId": sessionId},
            UpdateExpression="SET heroes.#heroType = :heroObj",
            ExpressionAttributeNames={"#heroType": heroType},  # e.g., "Barbarian"
            ExpressionAttributeValues={":heroObj": body},  # The entire hero object from the request body
        )

        return {"statusCode": 200}

    # Display error message
    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}
