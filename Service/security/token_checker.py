from jwt import decode
from jwt import exceptions
from flask import jsonify
from utils import logger as Logger

Logger.config_logger()


def validate_token(token, output=False):
    
    try:
        
        if output:
            
            return decode(token,key='DevelopmentTest',algorithms=["HS256"])
        
        decode(token,key='DevelopmentTest',algorithms=["HS256"])
        
    except exceptions.DecodeError as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        response = jsonify({"response": "Invalid Token"})
        response.status_code = 401
        
        return response

    except exceptions.ExpiredSignatureError as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        response = jsonify({"response": "Token Expired"})
        response.status_code = 401
        
        return response
    

