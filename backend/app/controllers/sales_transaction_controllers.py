from app import db
from app.models import Stock, Account, StockEntry
from .transaction_controllers import GeneralTransactionControllers
from app.utils import SalesUtils, SalesReturnUtils
from datetime import datetime


transaction = GeneralTransactionControllers()
sales_utils = SalesUtils()
sales_return_utils = SalesReturnUtils()


class SalesTransactionControllers:
    def create_sales_journal(self, company_id, user_id, data):
        try:
            new_transaction = sales_utils.process_stock_entries(company_id, user_id, data)
            db.session.commit()
            return "Sales transaction was a success", 201, new_transaction
        except ValueError as e:
            db.session.rollback()
            return "Error entering sales transaction", 400, str(e)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error entering transaction", 500, str(e)

    def sales_return_journal(self, company_id, user_id, data):
        try:
            new_transaction = sales_return_utils.process_sales_return(company_id, user_id, data)
            db.session.commit()
            return "Sales return entry was successful", 201, new_transaction.to_dict()
    
        except ValueError as ve:
            db.session.rollback()
            return "Error when entering sales return", 400, str(ve)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error entering sales return", 500, str(e)