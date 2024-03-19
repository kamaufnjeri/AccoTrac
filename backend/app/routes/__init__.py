from app import app
from app.utils.accountsutils import create_user_company
from app.utils.userutils import register_user, get_user
from flask import request, jsonify
from flask_login import current_user, logout_user
from typing import Tuple, Union


@app.route('/createuser', methods=['GET', 'POST'], strict_slashes=False)
def create_user() -> Union[jsonify, Tuple[dict, int]]:
    """POST: Returns a json with a new user created or error message
    GET: Returns register page
    """
    if request.method == 'POST':
        data = request.get_json()
        message = {
                'Error': 'Missing Some Fields',
                "required_Fields" : "firstname, lastname, email, password"
                }
        if not data:
            return jsonify(message), 404
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        if not firstname or not lastname or not email or not password :
            return jsonify(message), 404
        result, code = register_user(firstname, lastname, email, password)
        return jsonify({'result': result}), code

    if request.method == 'GET':
        message = {'message': 'HTML signup page coming soon'}
        return jsonify(message), 200

@app.route('/createcompany', methods=['POST'], strict_slashes=False)
def create_company():
    data = request.get_json()
    message, code = create_user_company(data['company_name'], data['user_email'], data['user_name'])

    return jsonify({ "message": message}), code

@app.route('/login', methods=['GET', 'POST'], strict_slashes=False)
def login()-> Union[jsonify, Tuple[dict, int]]:
    """Creates a session for a user if they exist and their
    credentials match
    POST: Returns dict with current user authentication status
    GET: Returns Login page
    """
    if request.method == 'POST':
        if current_user.is_authenticated:
            message = {"message": f"{current_user.firstname} Already logged in"}
            return jsonify(message), 200
        data = request.get_json()
        message = {
                'Error': 'Missing Some Fields',
                "required_Fields" : "email, password"
            }
        if not data:
            return jsonify(message), 404
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify(message), 404
        user, code = get_user(email, password)
        message = {'Logged in': f'{user.is_authenticated}',
                       'user': f'{user.firstname}'}
        return jsonify(message), code
    elif request.method == 'GET':
        message = {"Message": "Login HTML coming soon"}
        return jsonify(message), 200

@app.route('/logout', methods=['POST'], strict_slashes=False)
def logout() -> Union[jsonify, Tuple[dict, int]]:
    """Destroys the Session of current logged in user
    Returns status of current login user
    """
    logout_user()
    message = {'Logged in': f'{current_user.is_authenticated}'}
    return jsonify(message), 200