from pathlib import Path
import os
import sqlite3
from utils.logger import *

config_logger()


def _get_base_dir():
    
    base_dir = Path(__file__).resolve().parent.parent
    
    return base_dir


def _connect_with_db():
    
    try:
    
        sqliteConnection = sqlite3.connect(os.path.join(_get_base_dir(), 'db.sqlite'))
        cursor = sqliteConnection.cursor()
        
        #No existe una función propia de sqlite3 que te informa si se conecta o no.
        
        return sqliteConnection, cursor
    
    except sqlite3.Error as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
    
    except Exception as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))


def execute_query(query : str):
    
    _connection, _cursor = _connect_with_db()
    
    try:
        
        _lst_result = []
        
        _qlite_select_query = query
        
        _cursor.execute(_qlite_select_query)
        
        _records = _cursor.fetchall()
        
        for row in _records:
            
            _lst_result.append(row)
            
        _cursor.close()
        
        return _lst_result
    
    except sqlite3.Error as e:

       log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
       
    except Exception as e:
        
        log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
    
    finally:
        
        if _connection:
        
            _connection.close()

