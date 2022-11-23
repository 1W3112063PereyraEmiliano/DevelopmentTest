from database.utils import sqlite_client as SqlLiteClient
from utils.logger import *

config_logger()


def get_orders_by_status():
    
    try:
        
        _query = 'SELECT COUNT(*), ESTADO FROM ORDENES GROUP BY ESTADO'
        
        _res = SqlLiteClient.execute_query(_query)
        
        _lst_result = []
        
        for r in _res:
            
            _lst_result.append({
                'count': r[0],
                'status': r[1]
            })
            
        return True,_lst_result
        
    except Exception as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        return False, 'A problem has occurred in the database module...'
    

def get_orders_in_routes():
    
    try:
        
        _query = 'SELECT NUM_OS, RUTAITIN, RUTA, DIRECCION, ESTADO '\
                    'FROM ORDENES '\
                        'WHERE RUTA IN (12,13,15)'
        
        _res = SqlLiteClient.execute_query(_query)
        
        _lst_result = []
        
        for r in _res:
            
            _lst_result.append({
                'so_number': r[0],
                'route_itinerary': r[1],
                'route': r[2],
                'address': r[3],
                'status': r[4],
            })
            
        return True,_lst_result
        
    except Exception as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        return False, 'A problem has occurred in the database module...'
    

def get_orders_with_data_in_field():
    
    try:
        
        _query = 'SELECT NUM_OS, ACCESO_SUMINISTRO '\
                    'FROM ORDENES '\
                        'WHERE ACCESO_SUMINISTRO != "" AND ACCESO_SUMINISTRO IS NOT NULL'
        
        _res = SqlLiteClient.execute_query(_query)
        
        _lst_result = []
        
        for r in _res:
            
            _lst_result.append({
                'so_number': r[0],
                'supply_access': r[1],
            })
            
        return True,_lst_result
        
    except Exception as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        return False, 'A problem has occurred in the database module...'