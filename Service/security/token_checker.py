from jwt import decode
from jwt import exceptions
from flask import jsonify


def validate_token(token, output=False):
    
    try:
        
        if output:
            
            return decode(token,key='DevelopmentTest',algorithms=["HS256"])
        
        decode(token,key='DevelopmentTest',algorithms=["HS256"])
        
    except exceptions.DecodeError:
        
        response = jsonify({"response": "Invalid Token"})
        response.status_code = 401
        
        return response

    except exceptions.ExpiredSignatureError:
        
        response = jsonify({"response": "Token Expired"})
        response.status_code = 401
        
        return response
    

