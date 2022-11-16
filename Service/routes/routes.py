from pathlib import Path
import json
import os


def _get_base_dir():
    
    _base_dir = Path(__file__).resolve().parent
    
    return _base_dir


def _open_route_file():
    
    try:
    
        with open(os.path.join(_get_base_dir(), 'routes.json')) as secrets_file:
            routes = json.load(secrets_file)
        
        return routes
    
    except Exception as e:
        
        return None
    

def get_a_specific_route(**kwargs):

    try:
        
        routes = _open_route_file()
        name_route = kwargs.get('route_name')
        route = routes[name_route]
        
        return '/{}'.format(route)
    
    except KeyError:
        
        #log .txt
        
        pass 
    