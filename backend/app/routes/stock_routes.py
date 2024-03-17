from app.controllers import StockControllers
from flask import request, jsonify, Blueprint


stock_bp = Blueprint("stock_bp", __name__)
stock_controllers = StockControllers()


@stock_bp.route('/<string:company_id>/addstock', methods=['POST'])
def add_stock(company_id):
    data = request.get_json()

    if not data:
        return "", 204
    else:
        message, code, response_item = stock_controllers.create_stock(company_id, data)
        return jsonify({"message": message, "response": response_item}), code


@stock_bp.route('/<string:company_id>/getallstocks', methods=['GET'])
def get_all_stocks(company_id):
    message, code, response_item = stock_controllers.get_all_stocks(company_id)
    return jsonify({"message": message, "response": response_item}), code