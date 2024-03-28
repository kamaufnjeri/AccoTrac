from app.controllers import AccountControllers
from flask import jsonify, Blueprint, request
from flask_login import current_user, login_required

account_bp = Blueprint("account_bp", __name__)
account_controllers = AccountControllers()


@account_bp.route("/createaccount", methods=["POST"])
@login_required
def create_account():
    """route to create an account/ledger"""
    data = request.get_json()
    if not data:
        return "", 204
    
    else:
        resp_item, code = account_controllers.create_account(
            current_user.selected_company_id, 
            current_user.id,
            data
        )
        return jsonify({"response": resp_item}), code

@account_bp.route("/<string:account_id>/updateaccount", methods=["PUT"])
@login_required
def update_account(account_id):
    """updating account route"""
    data = request.get_json()

    if not data:
        return "", 204

    else:
        resp_item, code = account_controllers.update_account(
            company_id=current_user.selected_company_id,
            account_id=account_id,
            data=data
        )
        return jsonify({"response": resp_item}), code

@account_bp.route("/<string:account_id>/getaccount", methods=["GET"])
@login_required
def get_account(account_id):
    """route to get a specific account"""
    resp_item, code = account_controllers.get_account(
        company_id=current_user.selected_company_id,
        account_id=account_id
    )
    return jsonify({"response": resp_item}), code


@account_bp.route("/<string:account_id>/deleteaccount", methods=["DELETE"])
@login_required
def delete_account(account_id):
    """route to delete an account"""
    resp_item, code = account_controllers.delete_account(
        company_id=current_user.selected_company_id, 
        account_id=account_id
    )
    return jsonify({"response": resp_item}), code

@account_bp.route("/getallaccounts", methods=["GET"])
@login_required
def get_all_accounts():
    """route to get all accounts for a specific user and company"""
    resp_item, code = account_controllers.get_all_accounts(
        company_id=current_user.selected_company_id)
    return jsonify({"response": resp_item}), code
