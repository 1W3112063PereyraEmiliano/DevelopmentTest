from flask import Flask, jsonify
from routes import routes as Routes

_service = Flask(__name__)


@_service.route(Routes.get_a_specific_route(route_name = "WRITE_LINE"))
def write_line(text_to_write = ''):
    
    try:
        
        ret = {
            'response': 'El texto fue escrito con éxito!'
        }
        
        return jsonify(ret)
        
        
    except Exception as e:
        
        pass   

if __name__.__eq__('__main__'):
    
    _service.run(debug=False,load_dotenv=False,port=8000)