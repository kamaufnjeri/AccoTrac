from app import app
from app.utils.accountsutils import create_user_company
from app.utils.userutils import register_user, get_user
from flask import request, jsonify
from flask_login import current_user, login_user


@app.route('/createuser', methods=['GET', 'POST'], strict_slashes=False)
def create_user():
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

@app.route('/createcompany', methods=['POST'])
def create_company():
    data = request.get_json()
    message, code = create_user_company(data['company_name'], data['user_email'], data['user_name'])

    return jsonify({ "message": message}), code

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if current_user.is_authenticated:
            message = {"message": "Already logged in"}
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
        result, code = get_user(email, password)
        return jsonify(result), code
    elif request.method == 'GET':
        message = {"Message": "Login HTML coming soon"}
        return jsonify(message), 200