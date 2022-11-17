from pathlib import Path
import os
from datetime import datetime


def _get_base_dir():
    
    base_dir = Path(__file__).resolve().parent.parent
    
    return base_dir


def write_in_txt_file(txt = '',add_date = False):
    
    try:
        
        _txt_to_write = ''
        
        if add_date:
            
            now = datetime.now()

            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            
            _txt_to_write = date_time + '\n'
        
        _txt_to_write += txt
        
        _base_dir = os.path.join(_get_base_dir(),'test/test.txt')
        
        with open(_base_dir, 'w') as f:
            
            f.write(_txt_to_write)
        
        return True, '¡The text was written successfully!'
        
    except Exception as e:
        
        #lg
        
        return False, 'A problem has occurred in the text writer module...'