from app.models import Transaction, Account, JournalEntry, Company
from datetime import datetime
from app import db
from app.utils import TransactionUtils


transaction_utils = TransactionUtils()
"""this class handles all the entries entered by a user for a company"""
class GeneralTransactionControllers:
    def create_general_journal(self, company_id, data):
        """
        Create a general journal transaction based on the provided data.

        Parameters:
            company_id (int): The ID of the company associated with the transaction.
            data (dict): A dictionary containing transaction details including date, description, and entries.

        Returns:
            tuple: A tuple containing a message, status code, and transaction object.

        Description:
            This method creates a new transaction with the specified date and description. It then iterates over the provided entries,
            ensuring that each entry follows the double-entry accounting principle. It checks if the accounts specified in the entries
            exist for the given company and if their balances are sufficient for the transaction. If all conditions are met, it creates
            journal entries for the transaction, updates account balances, and commits the changes to the database.

        Example:
            {
                "date": "2023-10-27",
                "description": "Salary Payment",
                "entries": [
                    {"account_id": 1, "debit": 0.0, "credit": 1000.0},
                    {"account_id": 2, "debit": 1000.0, "credit": 0.0},
                ]
            }

        Raises:
            ValueError: If the debit and credit amounts in an entry are not equal, if an account does not exist for the given company,
                        or if an account balance is insufficient for the transaction.
        """
        company = Company.query.filter_by(id=company_id).first()

        if not company:
            raise Exception(f"The company ID {company_id} doesn't exist")
    
        try:
            for entry in data.get("entries", []):
                if not all(key in entry for key in ("account_id", "debit", "credit")):
                    raise ValueError("Invalid entry structure in purchase data")
                
            new_transaction = Transaction(
                date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
                description=data.get("description"),
                company_id=company_id
            )

            db.session.add(new_transaction)

            debit_totals = sum(entry.get("debit", 0) for entry in data.get("entries", []))
            credit_totals = sum(entry.get("credit", 0) for entry in data.get("entries", []))

            if debit_totals != credit_totals or debit_totals == 0 or credit_totals == 0:
                raise ValueError("The debit and credit amounts must be equal.")

            entries = data.get("entries", [])
            
            for entry in entries:
                account = Account.query.filter_by(
                    id=entry.get("account_id"),
                    company_id=company_id
                ).first()
                if not account:
                    raise ValueError(f"Account with ID {entry.get('account_id')} does not exist.")
                
                is_balance_enough, balance = transaction_utils.is_account_balance_enough(
                    account, entry
                )
                if entry.get('debit') != 0 and entry.get('credit') != 0:
                    raise ValueError("Can't give a debit and credit value for one account")
                
                if not is_balance_enough:
                    raise ValueError(f"Account {account.name} has insufficient balance of {balance}")

                debit = entry.get('debit')
                credit = entry.get('credit')
                new_entry = JournalEntry(
                    transaction=new_transaction,
                    account_id=account.id,
                    debit=debit,
                    credit=credit,
                )
                account.debit_total += debit
                account.credit_total += credit
                db.session.add(new_entry)

            db.session.commit()
            return "Transaction successfully entered", 201, new_transaction.to_dict()

        except ValueError as e:
            db.session.rollback()
            return "Error entering transaction", 400, str(e)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error when entering transaction", 500, str(e)
