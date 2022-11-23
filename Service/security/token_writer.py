from jwt import encode
from datetime import datetime, timedelta
from utils import logger as Logger

Logger.config_logger()


def expire_date(secs: int):
    
    now = datetime.now().utcnow()
    new_date = now + timedelta(seconds=secs)

    return new_date


def write_token(data: dict):
    
    try:
    
        token = encode(payload={**data, "exp": expire_date(60)},key='DevelopmentTest', algorithm="HS256")
        
        return token.encode('UTF-8')
    
    except Exception as e:
        
        Logger.log_error('Excepción en archivo {} error {}'.format(__file__, e.__str__()))






