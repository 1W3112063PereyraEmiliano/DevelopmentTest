from pathlib import Path
import os
from utils import logger as Logger

Logger.config_logger()


def _get_base_dir():
    
    base_dir = Path(__file__).resolve().parent.parent
    
    return base_dir


def read_in_txt_file(txt = ''):
    
    try:
        
        _base_dir = os.path.join(_get_base_dir(),'test/test.txt')
        
        with open(_base_dir, 'r') as f:
            
            _text_in_file = f.read().rstrip()
        
        return True, _text_in_file
        
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))
        
        return False, 'A problem has occurred in the file reader module...'