from app import app, db
from app.utils.companyutils import create_new_company, get_company_by_user_id, update_companyinfo, get_company
from app.utils.userutils import register_user, get_user, update_userinfo
from flask import request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from typing import Tuple, Union
from app.models import User


@app.route('/', methods=['GET', 'POST'], strict_slashes=False)
def home():
    return('<h1> AccoTrac Coming soon</h1>')

@app.route('/createuser', methods=['GET', 'POST'], strict_slashes=False)
def create_user() -> Union[jsonify, Tuple[dict, int]]:
    """POST: Returns a json with a new user created or error message
    GET: Returns register page
    """
    if request.method == 'POST':
        data = request.get_json()
        message = {
                'error': 'Missing Some Fields',
                "required_Fields" : "firstname, lastname, email, password"
                }
        if not data:
            return jsonify(message), 404
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        company_name = data.get('company_name')

        if not firstname or not lastname or not email or not password or not company_name:
            return jsonify(message), 404
        
        result, code = register_user(firstname, lastname, email, password, company_name)
        if code == 201:

            return jsonify({'result': result}), code
        return jsonify({'error': result}), code

    if request.method == 'GET':
        message = {'message': 'Signup page coming soon'}
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
            message = {"message": f"{current_user.email} already logged in"}
            return jsonify(message), 200
        data = request.get_json()
        message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "email, password"
            }
        if not data:
            return jsonify(message), 404
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify(message), 404
        user, code = get_user(user_email=email, password=password)
        print(user)
        if code != 200:
            # means there was an error
            error = user
            message = {'message': error}
            return jsonify(message), code
        user = current_user.to_dict(current_user.is_authenticated)
        message = {"result": user}
        return jsonify(message), code
    
    elif request.method == 'GET':
        message = {"Message": "Login Page coming soon"}
        return (jsonify(message), 200)

@app.route('/logout', methods=['POST'], strict_slashes=False)
def logout() -> Union[jsonify, Tuple[dict, int]]:
    """Destroys the Session of current logged in user
    Returns status of current login user
    """
    logout_user()
    message = {'Logged in': f'{current_user.is_authenticated}'}
    return jsonify(message), 200

@app.route('/updateuser/<id>', methods=['GET', 'PUT'], strict_slashes=False)
@login_required
def update_user(id: str) -> Union[jsonify, Tuple[dict, int]]:
    """updates user information
    PUT: Returns username and updated information
    GET: Returns update page
    """
    data = request.get_json()
    if current_user is None:
        message = {'message': 'User not authenticated'}
        return jsonify(message), 401

    if request.method == 'PUT':
        if current_user.id == id and current_user.is_authenticated:
            if not data:
                message = {'message': 'provide information to update'}
                return jsonify(message), 400
            user, code = update_userinfo(id, data)
            print(code)
            print(user)

            if code == 200:
                return jsonify({"response": current_user.to_dict(current_user.is_authenticated)}), code
            error = user
            return jsonify({"message": error}), code
        else:
            message = {'message': 'You are not allowed to update this user information'}
            return jsonify(message), 401
    elif request.method == 'GET':
        message = {"Message": "Update Page coming soon"}
        return jsonify(message), 200


@app.route('/createcompany', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def create_company():
    if request.method == 'POST':
        data = request.get_json()
        company_name = data.get('company_name')
        user_id = current_user.id
        if not company_name:
            message = {'message': 'company_name is required'}
            return jsonify(message), 400
        message, code, company = create_new_company(company_name, user_id)

        if company:

            return jsonify({ "message": message, "response": company.to_dict()}), code
        return jsonify({ "message": message}), code
    elif request.method == 'GET':
        # get companies associated with current user
        companies = get_company_by_user_id(current_user.id)
        # message = {"Message": "Create company Page coming soon"}
        message = {"Message": companies}
        return jsonify(message), 200

@app.route('/company/<company_id>', methods=['PUT'], strict_slashes=False)
@login_required
def update_company(company_id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates company information
    PUT: Returns company and updated information
    """
    if request.method == 'PUT' and current_user.is_authenticated:
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
            message = {"message": error}
            return jsonify(message), code
        return jsonify({"response": company.to_dict()}), code

@app.route('/<string:user_id>/getcompanies', methods=['GET'])
def get_companies_by_user_id(user_id):
    message, code, company_names = get_company_by_user_id(user_id=user_id)
    return jsonify({"message": message, "response": company_names}), code



@app.route('/protected', methods=['GET'])
def protected():
    if current_user.is_authenticated:
        user = current_user.to_dict(current_user.is_authenticated)
        return jsonify({"message": "User is authenticated", "response": user}), 200
    
    return jsonify({"message": "User not authenticated", "response": current_user.is_authenticated}), 401

@app.route('/<string:company_id>/select_organization', methods=['PUT'])
@login_required
def add_selected_organization(company_id):
    try:
        user = User.query.filter_by(id=current_user.id).first()
        user.selected_company_id = company_id
        db.session.commit()
        return jsonify({"message": "Selected arganization added sussefully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
    
