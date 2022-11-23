import logging
from pathlib import Path
import os


def get_base_dir():
    
    base_dir = Path(__file__).resolve().parent.parent
    
    return base_dir
    

def config_logger():
    
    base_dir = os.path.join(get_base_dir(),'test/log/DevlopmentTest.log')
    
    logging.basicConfig(
            level=logging.DEBUG,
            format='{asctime} {levelname:<8} {message}',
            style='{',
            filename= base_dir,
            filemode='a+'
            )
    
    
def log_warning(message : str):
    
    logging.warning(message)
    

def log_error(message : str):
    
    logging.error(message)
    
    
def log_critical(message : str):
    
    logging.critical(message)
    

def log_info(message : str):
    
    logging.info(message)
    

def log_exception(message : str):
    
    logging.exception(message)

