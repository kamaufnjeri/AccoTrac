from app import app
from app.utils import create_user_company, get_all_accounts
from flask import request, jsonify

@app.route('/createcompany', methods=['POST'])
def create_company():
    data = request.get_json()
    message, code = create_user_company(data['company_name'], data['user_email'], data['user_name'])
    
    return jsonify({ "message": message}), code

@app.route('/getallaccounts', methods=['GET'])
def get_accounts():
    account_list = get_all_accounts()
    if account_list:
        return jsonify({"Accounts": account_list}), 200
    else:
        return jsonify({"message": "Error getting accounts"}), 400
