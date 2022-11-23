from flask import Flask, jsonify, request
from routes import routes as Routes
from utils import file_writer as FileWriter
from utils import file_reader as FileReader
from database.controllers import orders_controller as OrdersController
from security.routes import auth
from utils import logger as Logger

_service = Flask(__name__)
_service.register_blueprint(auth.routes_auth)
Logger.config_logger()

# APPS
@_service.route(Routes.get_a_specific_route(route_name = "WRITE_LINE"),methods=['POST'])
def write_line():
    
    try:
        
        Logger.log_info('Petición a función WRITE_LINE en archivo {}'.format(__file__))
        
        _text_request = request.json.get('text')
        _add_date = request.json.get('add_date')
        
        _response_from_module, _message = FileWriter.write_in_txt_file(_text_request,_add_date)
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        Logger.log_info('Código de respuesta {} en función WRITE_LINE en archivo {}'.format(_code_response, __file__))
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        

@_service.route(Routes.get_a_specific_route(route_name = "READ_LINE"))
def read_line():
    
    try:
        
        Logger.log_info('Petición a función READ_LINE en archivo {}'.format(__file__))
        
        _response_from_module, _message = FileReader.read_in_txt_file()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        Logger.log_info('Código de respuesta {} en función READ_LINE en archivo {}'.format(_code_response, __file__))
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
    
@_service.route(Routes.get_a_specific_route(route_name = "GET_ORDERS_BY_STATUS"))
def get_orders_by_status():
    
    try:
        
        Logger.log_info('Petición a función GET_ORDERS_BY_STATUS en archivo {}'.format(__file__))
        
        _response_from_module, _message = OrdersController.get_orders_by_status()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        Logger.log_info('Código de respuesta {} en función GET_ORDERS_BY_STATUS en archivo {}'.format(_code_response, __file__))
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        

@_service.route(Routes.get_a_specific_route(route_name = "GET_ORDERS_IN_ROUTES"))
def get_orders_in_routes():
    
    try:
        
        Logger.log_info('Petición a función GET_ORDERS_IN_ROUTES en archivo {}'.format(__file__))
        
        _response_from_module, _message = OrdersController.get_orders_in_routes()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
        Logger.log_info('Código de respuesta {} en función GET_ORDERS_IN_ROUTES en archivo {}'.format(_code_response, __file__))
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        

@_service.route(Routes.get_a_specific_route(route_name = "GET_ORDERS_WITH_DATA_IN_FIELD"))
def get_orders_with_data_in_field():
    
    try:
        
        Logger.log_info('Petición a función GET_ORDERS_WITH_DATA_IN_FIELD en archivo {}'.format(__file__))
        
        _response_from_module, _message = OrdersController.get_orders_with_data_in_field()
        
        if _response_from_module:
            
            _code_response = 200
            
        else:
            
            _code_response = 500
            
            
        Logger.log_info('Código de respuesta {} en función GET_ORDERS_WITH_DATA_IN_FIELD en archivo {}'.format(_code_response, __file__))
            
        _result = {
            'response': _message
        }
            
        return jsonify(_result), _code_response
        
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
    

if __name__.__eq__('__main__'):
    
    Logger.log_warning('Sirviendo aplicación en puerto 8000...')
    
    _service.run(debug=False,load_dotenv=False,port=8000)
