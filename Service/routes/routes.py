
from routes.utils.route_utils import open_route_file
    

def get_a_specific_route(**kwargs):

    try:
        
        routes = open_route_file()
        name_route = kwargs.get('route_name')
        route = routes[name_route]
        
        return '/{}'.format(route)
    
    except KeyError:
        
        #log .txt
        
        pass 
    