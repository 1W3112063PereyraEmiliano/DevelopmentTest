from pathlib import Path
import json
import os
from utils.logger import *

config_logger()


def _get_base_dir():
    
    base_dir = Path(__file__).resolve().parent.parent
    
    return base_dir


def open_route_file():
    
    try:
    
        with open(os.path.join(_get_base_dir(), 'routes.json')) as secrets_file:
            routes = json.load(secrets_file)
        
        return routes
    
    except Exception as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        return None