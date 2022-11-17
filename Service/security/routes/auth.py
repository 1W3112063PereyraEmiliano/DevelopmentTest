from flask import Blueprint, request, jsonify
from security.token_writer import write_token
from security.token_checker import validate_token
from routes.routes import get_a_specific_route

routes_auth = Blueprint("routes_auth",__name__)


@routes_auth.route(get_a_specific_route(route_name = "CREATE_TOKEN"), methods=["POST"])
def create_token():
    
    _hash_token = write_token(data={})
    
    if _hash_token:
    
        response = jsonify({"response": "The token was created successfully!", "token": _hash_token.decode()})
        
        response.status_code = 200
            
        return response


@routes_auth.route(get_a_specific_route(route_name = "VERIFY_TOKEN"))
def verify_token():
    
    try:
    
        token = request.headers["Authorization"].split(" ")[1]
        
        token = token.encode()
        
        return validate_token(token, output=True)
    
    except:
        
        pass

