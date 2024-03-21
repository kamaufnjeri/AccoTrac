from app import app
from app.utils.companyutils import create_new_company, get_company, get_company_by_user_id, update_companyinfo, delete_company
from app.utils.userutils import register_user, get_user, update_userinfo
from flask import request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from typing import Tuple, Union


@app.route('/', methods=['GET', 'POST'], strict_slashes=False)
def home():
    return('<h1> AccoTrac Coming soon</h1>')

@app.route('/user', methods=['GET', 'POST'], strict_slashes=False)
def create_user() -> Union[jsonify, Tuple[dict, int]]:
    """POST: Returns a json with a new user created or error message
    GET: Returns register page
    """
    if request.method == 'POST' and not current_user.is_authenticated:
        # register a user
        data = request.get_json()
        if not data:
            message = {
                'Message': 'Missing Required fields',
                "required_Fields" : "firstname, lastname, email, password"
                }
            return jsonify(message), 404
        firstname = data.get('firstname')
        if not firstname:
            message = {'Message': 'firstname is Required'}
            return jsonify(message), 404
        lastname = data.get('lastname')
        if not lastname:
            message = {'Message': 'lastname is Required'}
            return jsonify(message), 404
        email = data.get('email')
        if not email:
            message = {'Message': 'email is Required'}
            return jsonify(message), 404
        password = data.get('password')
        if not password:
            message = {'Message': 'password is Required'}
            return jsonify(message), 404
        result, code = register_user(firstname, lastname, email, password)
        return jsonify({'result': result}), code

    elif request.method == 'GET':
        if current_user.is_authenticated:
            # user is logged in retrieve user info
            user, code = get_user(current_user.email)
            return jsonify(user.to_dict()), code
        # user not logged in should register
        message = {'Message': 'Signup page coming soon'}
        return jsonify(message), 200

@app.route('/user/<id>', methods=['GET', 'PUT'], strict_slashes=False)
@login_required
def update_user(id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates user information
    PUT: Returns username and updated information
    GET: Returns update page
    """
    if request.method == 'PUT':
        if current_user.id == id:
            user, code = get_user(user_email=current_user.email)
            data = request.get_json()
            if not data:
                message = {'Message': 'provide information to update'}
                return jsonify(message), 400
            user, code = update_userinfo(user, data)
            return jsonify(user.to_dict()), code
        else:
            message = {'Message': 'You are not allowed to update this user information'}
            return jsonify(message), 401
    elif request.method == 'GET':
        message = {"Message": "Update Page coming soon"}
        return jsonify(message), 200

@app.route('/login', methods=['GET', 'POST'], strict_slashes=False)
def login()-> Union[jsonify, Tuple[dict, int]]:
    """Creates a session for a user if they exist and their
    credentials match
    POST: Returns dict with current user authentication status
    GET: Returns Login page
    """
    if request.method == 'POST':
        if current_user.is_authenticated:
            message = {"Message": f"{current_user.firstname} You are already Logged in"}
            return jsonify(message), 200
        data = request.get_json()
        if not data:
            message = {
                'Message': 'Missing Some Fields',
                "required_Fields" : "email, password"
            }
            return jsonify(message), 404
        email = data.get('email')
        if not email:
            message = {'Message': 'email is Required'}
            return jsonify(message), 404
        password = data.get('password')
        if not password:
            message = {'Message': 'password is Required'}
            return jsonify(message), 404
        user, code = get_user(user_email=email, password=password)
        if isinstance(user, str):
            # means there was an error
            error = user
            message = {'Message': 'Something went wrong',
                       'Error': error}
            return jsonify(message), code
        login_user(user)
        message = {'Message': 'Logged in Successfully',
                   'is_authenticated': f'{user.is_authenticated}',
                    'user': user.to_dict()}
        return jsonify(message), code
    elif request.method == 'GET':
        message = {"Message": "Login Page coming soon"}
        return (jsonify(message), 200)

@app.route('/logout', methods=['POST'], strict_slashes=False)
def logout() -> Union[jsonify, Tuple[dict, int]]:
    """Destroys the Session of current logged in user
    Returns status of current login user
    """
    if not current_user.is_authenticated:
        message = {"Message": "Not logged in"}
        return jsonify(message), 400
    userFirstName = current_user.firstname
    logout_user()
    message = {'Message': 'Logged out Successfully',
               'is_authenticated': f'{current_user.is_authenticated}',
               'userFirstName': f'{userFirstName}'}
    return jsonify(message), 200


@app.route('/company', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def create_company():
    if request.method == 'POST':
        data = request.get_json()
        user_id = current_user.id
        company_name = data.get('company_name')
        if not company_name:
            message = {'Message': 'company_name is required'}
            return jsonify(message), 400
        company_email = data.get('company_email')
        if not company_email:
            message = {'Message': 'company_email is required'}
            return jsonify(message), 400
        company_country = data.get('company_country')
        if not company_country:
            message = {'Message': 'company_country is required'}
            return jsonify(message), 400
        company_currency = data.get('company_currency')
        if not company_currency:
            message = {'Message': 'company_currency is required'}
            return jsonify(message), 400
        message, code = create_new_company(company_name=company_name,
                                           company_email=company_email,
                                           company_country=company_country,
                                           company_currency=company_currency,
                                           user_id=user_id)
        return jsonify({ "Message": message}), code
    elif request.method == 'GET':
        # get companies associated with current user
        companies = get_company_by_user_id(current_user.id)
        message = {"Message": "Here is a list of your companies",
                   "companies": companies}
        return jsonify(message), 200


@app.route('/company/<company_id>', methods=['DELETE', 'PUT'], strict_slashes=False)
@login_required
def update_company(company_id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates company information
    PUT: Returns company and updated information
    GET: Returns update page
    """
    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            message = {"Message": "Provide fields to be updated"}
            return jsonify(message), 400
        company = get_company(company_id)
        if not company:
            message = {"Message": "Company does not exist"}
            return jsonify(message), 400
        company, code = update_companyinfo(company=company, user=current_user, data=data)
        if isinstance(company, str):
            # means its an error
            error = company
            message = {"Message": "Something went wrong",
                       "Error": error}
            return jsonify(message), code
        return jsonify(company.to_dict()), code
    if request.method == 'DELETE':
        result, code = delete_company(company_id)
        message = {"Message": result}
        return jsonify(message), code