from app.controllers import AccountControllers
from flask import jsonify, Blueprint, request


account_bp = Blueprint("account_bp", __name__)
account_controllers = AccountControllers()


@account_bp.route("/<str:user_id/<str:company_id>/createaccount", methods=["POST"])
def create_account(user_id, company_id):
    data = request.get_json()

    if not data:
        return "", 204
    
    else:
        message, code, resp_item = account_controllers.create_account(company_id, user_id, data)
        return jsonify({"message": message, "response": resp_item}), code

@account_bp.route("<str:company_id/<str:account_id>/updateaccount", methods=["PUT"])
def update_account(company_id, account_id):
    data = request.get_json()

    if not data:
        return "", 204

    else:
        message, code resp_item = account_controllers.update_account(company_id, account_id, data)
        return jsonify({"message": message, "response": resp_item}), code

@account_bp.route("/<str:company_id>/<str:account_id>/getaccount", methods=["GET"])
def get_account(company_id, account_id):
    message, code, resp_item = account_controllers.get_account(company_id, account_id)

    return jsonify({"message": message, "response": resp_item}), code

@account_bp.route("/<str:company_id/<str:account_id>/deleteaccout", methods=["delete"])
def delete_account(company_id, account_id):
    message, code, resp_item = account_controllers.delete_account(company_id, account_id)

    return jsonify({"message": message, "response": response}), code

@account_bp.route("/<str:company_id>/getallaccounts", methods=["GET"])
def get_all_accounts(company_id):
    message, code, resp_item = account_controllers.get_all_accounts(company_id)
    return jsonify({"message": message, "response": respons}), code