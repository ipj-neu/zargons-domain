import boto3
from boto3.dynamodb.conditions import Key
from os import getenv
from uuid import uuid4
import json

#hardcoding region name
region_name = "us-east-2"

#getting the correct table from dynamoDB
dynamoTable = boto3.resource('dynamodb', region_name=region_name).Table('dev-sessions')

def handler(event, context):

    try:

        sessionId = event.get('pathParameters', {}).get('sessionId')

        #storing the body of the request
        body = json.loads(event.get("body", "{}"))

        hero_name = body.get("hero")
        if not hero_name:
            return {"statusCode": 400, "body": json.dumps({"message": "Hero name is required"})}
        
        # Query DynamoDB for the session item using sessionId
        response = dynamoTable.get_item(Key={'sessionId': sessionId})

        #Check if the session item was found
        if 'Item' not in response:
            return {"statusCode": 404, "body": json.dumps({"message": "Session not found"})}

        #Get the heroes map from the session item
        heroes = response['Item'].get('heroes', {})

        #Check if the hero exists in the heroes map
        if hero_name not in heroes:
            return {"statusCode": 404, "body": json.dumps({"message": "Hero not found"})}

        #Now you have the hero details, which you can use as needed
        hero = heroes[hero_name]

        # Retrieve "availableHeroes" array from the session item
        available_heroes = response['Item'].get('availableHeroes', [])

        # Check if hero_name is in the "availableHeroes" array
        if hero_name in available_heroes:
            return {"statusCode": 409, "body": json.dumps({"message": "Hero already selected"})}
        else:
            # Hero name is not in availableHeroes, handle accordingly
            # Append hero_name to available_heroes
            available_heroes.append(hero_name)

            # Update the item in DynamoDB
            response = dynamoTable.update_item(
                Key={'sessionId': sessionId},
                UpdateExpression="SET availableHeroes = :heroes",
                ExpressionAttributeValues={
                    ':heroes': available_heroes
                },
                ReturnValues="UPDATED_NEW"
            )
            
        return hero

    #Display error message
    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}