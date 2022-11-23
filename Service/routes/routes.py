
from routes.utils.route_utils import open_route_file
from utils.logger import *

config_logger()


def get_a_specific_route(**kwargs):

    try:
        
        routes = open_route_file()
        name_route = kwargs.get('route_name')
        route = routes[name_route]
        
        return '/{}'.format(route)
    
    except Exception as e:
        
        log_critical('Excepción en archivo {} error {}'.format(__file__, e.__str__()))


    