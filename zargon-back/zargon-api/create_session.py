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
        #params = event.get("queryStringParameters", {})

        #storing the body of the request
        body = json.loads(event.get("body", "{}"))

        #Check if name is present in body
        if "name" not in body:
            return{"statusCode": 400, "body": json.dumps({"message": "Name is required"})}

        #Creating random sessionId
        sessionId = str(uuid4())

        #Storing name from body
        name = body["name"]

        #Storing userId from Incognito
        userId = event["requestContext"]["authorizer"]["iam"]["cognitoIdentity"]["identityId"]

        #Putting the entire Item into the dynamoDB table
        dynamoTable.put_item(Item={
            'sessionId' : sessionId,
            'userId' : userId,
            'heroes' : {
                'Barbarian' : {
                    "Name" : "",
                    "Atk" : "3",
                    "Def" : "2",
                    "Starting Body" : "8",
                    "Starting Mind" : "2",
                    "Body Points" : "8",
                    "Movement" : "2",
                    "Weapons" : "Broadsword",
                    "Armor" : "",
                    "Gold Coins" : "0",
                    "Potions" : "",
                    "Items" : ""
                },
                'Dwarf' : {
                    "Name" : "",
                    "Atk" : "2",
                    "Def" : "2",
                    "Starting Body" : "7",
                    "Starting Mind" : "3",
                    "Body Points" : "7",
                    "Movement" : "2",
                    "Weapons" : "Shortsword",
                    "Armor" : "",
                    "Gold Coins" : "0",
                    "Potions" : "",
                    "Items" : ""
                },
                'Elf' : {
                    "Name" : "",
                    "Atk" : "2",
                    "Def" : "2",
                    "Starting Body" : "6",
                    "Starting Mind" : "4",
                    "Body Points" : "6",
                    "Movement" : "2",
                    "Weapons" : "Shortsword",
                    "Armor" : "",
                    "Gold Coins" : "0",
                    "Potions" : "",
                    "Items" : "",
                    "Spells" : ["Heal Body", "Pass Through Rock", "Rock Skin"]
                },
                'Wizard' : {
                    "Name" : "",
                    "Atk" : "1",
                    "Def" : "2",
                    "Starting Body" : "4",
                    "Starting Mind" : "6",
                    "Body Points" : "4",
                    "Movement" : "2",
                    "Weapons" : "Dagger",
                    "Armor" : "",
                    "Gold Coins" : "0",
                    "Potions" : "",
                    "Items" : "",
                    "Spells" : ["Ball of Flame", "Courage", "Fire of Wrath", "Water of Healing", "Sleep", "Veil of Mist", "Swift Wind", "Genie", "Tempest"]
                },
            },
            'unavailableHeroes' : [],
            'name' : name,
            'gmSocketUrl' : "",
            'playersSocketUrl' : [],
            'joinCode' : ""
        })


        #if "sessionId" not in body or "sessionId" not in params:
            #return {"statusCode": 400, "body": "sessionId is required"}

        #Diplay success message
        return {"statusCode": 200, "body": "Session created", "sessionId": sessionId}

    #Display error message
    except Exception as e:
        print(f"Error: {e}")
        return {"statusCode": 500, "body": json.dumps({"message": "Internal server error"})}
