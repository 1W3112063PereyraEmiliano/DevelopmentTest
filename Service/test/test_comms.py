import json
from urllib.request import urlopen
from urllib.error import URLError, HTTPError


def test():
    
    try:
        
        default_endpoint = '/writeline'
        
        url = 'http://localhost:8000{}'.format(default_endpoint)
        response = urlopen(url)
        data = json.loads(response.read())
        
        print(data)
        
    except URLError as e:
        
        #lg
        pass
    except HTTPError as e:
        
        #lg
        pass
    except Exception as e:
        
        #lg
        pass

if __name__.__eq__('__main__'):
    
    test()