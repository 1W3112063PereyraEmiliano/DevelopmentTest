from flask import Flask, jsonify, request
from routes import routes as Routes
from utils import file_writer as FileWriter
from utils import file_reader as FileReader
from database.controllers import orders_controller as OrdersController
from security.routes import auth

_service = Flask(__name__)
_service.register_blueprint(auth.routes_auth)

# APPS
@_service.route(Routes.get_a_specific_route(route_name = "WRITE_LINE"),methods=['POST'])
def write_line():
    
    try:
        
        _text_request = request.json.get('text')
        _add_date = request.json.get('add_date')
        
        _response_from_module, _message = FileWriter.write_in_txt_file(_text_request,_add_date)
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        pass


@_service.route(Routes.get_a_specific_route(route_name = "READ_LINE"))
def read_line():
    
    try:
        
        _response_from_module, _message = FileReader.read_in_txt_file()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        pass
    
    
@_service.route(Routes.get_a_specific_route(route_name = "GET_ORDERS_BY_STATUS"))
def get_orders_by_status():
    
    try:
        
        _response_from_module, _message = OrdersController.get_orders_by_status()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        pass


@_service.route(Routes.get_a_specific_route(route_name = "GET_ORDERS_IN_ROUTES"))
def get_orders_in_routes():
    
    try:
        
        _response_from_module, _message = OrdersController.get_orders_in_routes()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        pass


@_service.route(Routes.get_a_specific_route(route_name = "GET_ORDERS_WITH_DATA_IN_FIELD"))
def get_orders_with_data_in_field():
    
    try:
        
        _response_from_module, _message = OrdersController.get_orders_with_data_in_field()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        pass
    

if __name__.__eq__('__main__'):
    
    _service.run(debug=False,load_dotenv=False,port=8000)
