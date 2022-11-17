from jwt import encode
from datetime import datetime, timedelta


def expire_date(secs: int):
    
    now = datetime.now().utcnow()
    new_date = now + timedelta(seconds=secs)

    return new_date


def write_token(data: dict):
    
    try:
    
        token = encode(payload={**data, "exp": expire_date(60)},key='DevelopmentTest', algorithm="HS256")
        
        return token.encode('UTF-8')
    
    except:
        
        pass





