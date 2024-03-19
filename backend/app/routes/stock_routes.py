from app.controllers import StockControllers
from flask import request, jsonify, Blueprint

stock_bp = Blueprint("stock_bp", __name__)
stock_controllers = StockControllers()

@stock_bp.route('/<string:user_id>/<string:company_id>/createstock', methods=['POST'])
def create_stock(user_id, company_id):
    data = request.get_json()

    if not data:
        return "", 204
    else:
        message, code, response_item = stock_controllers.create_stock(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code

@stock_bp.route('/<string:company_id>/getallstocks', methods=['GET'])
def get_all_stocks(company_id):
    message, code, response_item = stock_controllers.get_all_stocks(company_id)
    return jsonify({"message": message, "response": response_item}), code

@stock_bp.route("/<string:company_id>/<string:stock_id>/updatestock", methods=["PUT"])
def update_stock(company_id, stock_id):
    data = request.get_json()

    if not data:
        return "", 204
    else:
        message, code, resp_item = stock_controllers.update_stock(company_id, stock_id, data)
        return jsonify({"message": message, "response": resp_item}), code

@stock_bp.route("/<string:company_id>/<string:stock_id>/getstock", methods=["GET"])
def get_stock(company_id, stock_id):
    message, code, resp_item = stock_controllers.get_stock(company_id, stock_id)
    return jsonify({"message": message, "response": resp_item}), code

@stock_bp.route("/<string:company_id>/<string:stock_id>/deletestock", methods=["DELETE"])
def delete_stock(company_id, stock_id):
    message, code, resp_item = stock_controllers.delete_stock(company_id, stock_id)
    return jsonify({"message": message, "response": resp_item}), code
