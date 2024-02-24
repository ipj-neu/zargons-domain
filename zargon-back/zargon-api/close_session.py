import boto3
import json

# Define our region and dynamo table
region_name = "us-east-2"
session_table = boto3.resource('dynamodb', region_name = region_name).Table('dev-sessions')

def handler(event, context):
    try:
        # Get sessionId from our path parameters
        path_params = event.get("pathParameters", {})
        sessionId = path_params.get("sessionId", "")

        # Get the current session from our dynamodb table
        session_data = session_table.get_item(Key = { "sessionId": sessionId }).get("Item")

        # Checks if session exists or not
        if session_data is None:
            response(404, "Session not found") # If it doesn't exist, we return a 404

        # If it does exist, we save and close our current sessions
        session_data.update({
            "gmSocketUrl": "",
            "joinCode": "",
            "playersSocketUrl": [],
            "unavailableHeroes": []
        })

        # Update the session in dynamo
        session_table.put_item(Item = session_data)

        # Return a 200 with our code
        return response(200, { "message": "Session closed successfully", "session": session_data})
    
    except Exception as e:
        # If something goes wrong, we return a 500
        print(e)
        return response(500, { "message": "Internal Server Error" })

def response(code, body):
    return {
        "statusCode": code,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(body)
    }