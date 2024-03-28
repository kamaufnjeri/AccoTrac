from itsdangerous import URLSafeSerializer
from config import Config
from typing import Tuple, Union

secret_key = Config.SECRET_KEY
salt = Config.random_key
safe_serializer = URLSafeSerializer(secret_key, salt)


def create_token(**kwargs: dict) -> Tuple[Union[str, None], str, int]:
    """Returns a serialized string with data(kwargs) inside
    """
    try:
        data = {}
        if kwargs:
            for key, value in kwargs.items():
                data[key] = value
            token = safe_serializer.dumps(data)
            return token, 'Check your email for the link', 201
        else:
            return None, 'Data is missing', 400
    except Exception as error:
        return None, str(error), 400

def get_data_from_token(token: str) -> Tuple[Union[dict, None], str, int]:
    """returns dict with information from token
    or None
    """
    try:
        data = safe_serializer.loads(token)
        print(data)
        if data:
            return data, 'Here is the data', 200
        else:
            return None, 'No data found', 400
    except Exception as error:
        return None, str(error), 400
