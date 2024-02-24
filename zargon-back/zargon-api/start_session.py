import boto3
import random
import string
import json

# Define our region and dynamo table
region_name = "us-east-2"
session_table = boto3.resource('dynamodb', region_name = region_name).Table('dev-sessions')

def handler(event, context):
    try:
        # Get sessionId from our path parameters
        path_params = event.get("pathParameters", {})

        # return sessionId
        sessionId = path_params.get("sessionId", "")

        # Get our session from our dynamodb table
        session = session_table.get_item(Key = { "sessionId": sessionId }).get("Item")

        # Checks if session exists or not
        if session is None:
            response(404, "Session not found") # If it doesn't exist, we return a 404

        # If it does exist, we generate a join code
        join_code = generate_random_code()
        # return join_code

        # Add our code to the session
        session['joinCode'] = join_code

        # Update the session in dynamo
        session_table.put_item(Item = session)

        # Return a 200 with our code
        return response(200, { "message": "Join code generated", "joinCode": join_code })
    
    except Exception as e:
        # If something goes wrong, we return a 500
        print(e)
        return response(500, { "message": "Internal Server Error" })

def generate_random_code():
    # Define characters pool
    characters = string.ascii_letters + string.digits
    
    # Generate random code
    random_code = ''.join(random.choices(characters, k=5))
    
    return random_code

def response(code, body):
    return {
        "statusCode": code,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(body)
    }