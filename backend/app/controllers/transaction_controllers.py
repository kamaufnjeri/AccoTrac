from app.models import Transaction, Account
from datetime import datetime
from app import db
from app.utils import TransactionUtils


transaction_utils = TransactionUtils()


"""this class handles all the entries entered by a user for a company"""
class GeneralTransactionControllers:
    def create_general_journal(self, company_id, user_id, data):
        """function to create a double entry transaction/jounal"""
        try: 
            """call utils function to help with processing entry of the journals"""
            transaction_utils.validate_data(data, is_general=True)   
            new_transaction = transaction_utils.create_transaction(data, company_id, user_id)
            db.session.commit()
            """return info of the transaction if entry is successfull"""
            return "Transaction successfully entered", 201, new_transaction.to_dict()

        except ValueError as e:
            db.session.rollback()
            return "Error entering transaction", 400, str(e)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error when entering transaction", 500, str(e)

    def get_all_journals(self, company_id, user_id):
        try:
            """getting all journal entries related to a specific country"""
            transactions = Transaction.query.filter_by(
                company_id=company_id,
                user_id=user_id
            ).all()
            sorted_transactions = sorted(reversed(transactions), key=lambda x: x.date, reverse=True)
            return [transaction.to_dict() for transaction in sorted_transactions], 200
        except Exception as e:
            return str(e), 500
        