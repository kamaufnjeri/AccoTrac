from app.models import Account, db, Transaction, JournalEntry, Company, User
from datetime import datetime


class TransactionUtils:
    """Check the account balances and that entry being made is within the balance"""
    def is_account_balance_enough(self, account, transaction_entry):
        balance = 0
        category = account.category
        debit = transaction_entry.get("debit")
        credit = transaction_entry.get("credit")
        if category == "asset" or category == "expense":
            balance = account.debit_total - account.credit_total
            if debit == 0 and credit != 0 and balance >= credit:
                return True, balance
            elif debit != 0 and credit == 0:
                return True, balance
            else:
                return False, balance
        elif category == "liability" or category == "revenue" or category == "capital":
            balance = account.credit_total - account.debit_total
            if credit == 0 and debit!= 0 and balance >= debit:
                return True, balance
            elif credit != 0 and debit == 0:
                return True, balance
            else:
                return False, balance
        else:
            return False, None
        
    def create_transaction(self, data, company_id, user_id):
        company = self.get_by_id(company_id, Company, "Company")
        user = self.get_by_id(user_id, User, "User")

        self.check_entries_structure(data.get("entries", []))
        debit_totals = sum(entry.get("debit", 0) for entry in data.get("entries", []))
        credit_totals = sum(entry.get("credit", 0) for entry in data.get("entries", []))

        """change code if an account they enter both"""
        if debit_totals != credit_totals or debit_totals == 0 or credit_totals == 0:
            raise ValueError("The debit and credit amounts must be equal.")

        entries = data.get("entries", [])
        new_transaction = Transaction(
            date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
            description=data.get("description"),
            company_id=company_id,
            user_id=user_id
        )
        db.session.add(new_transaction)
        self.process_entries(entries, new_transaction.id, company_id)
        return new_transaction
    
    def process_entries(self, entries, new_transaction_id, company_id):
        for entry in entries:
            self.process_entry(entry, new_transaction_id, company_id)
    
    def process_entry(self, entry, new_transaction_id, company_id):

        account = self.get_by_id(entry.get("account_id"), Account, "Account")
       
        is_balance_enough, balance = self.is_account_balance_enough(
            account, entry
        )
        if entry.get('debit') != 0 and entry.get('credit') != 0:
            raise ValueError("Can't give a debit and credit value for one account")
                
        if not is_balance_enough:
            raise ValueError(f"Account {account.name} has insufficient balance of {balance}")

        debit = entry.get('debit')
        credit = entry.get('credit')
        new_entry = JournalEntry(
            transaction_id=new_transaction_id,
            account_id=account.id,
            debit=debit,
            credit=credit,
        )
        account.debit_total += debit
        account.credit_total += credit
        db.session.add(new_entry)

    def validate_data(self, data, is_general=True):
        print(data)
        if "date" not in data or "description" not in data:
            raise ValueError("Date and description are required fields")
        
        if not is_general:
            if not "category" in data:
                raise ValueError("The category field is required")

    def get_by_id(self, id, class_obj, class_name):
        obj = class_obj.query.filter_by(id=id).first()

        if not obj:
            raise ValueError(f"{class_name} of ID {id} does not exist in the database")

        return obj

    def check_entries_structure(self, entries):
        if not entries:
            raise ValueError("Transaction entries are required")
        for entry in entries:
            if not all(key in entry for key in ("account_id", "debit", "credit")):
                raise ValueError("Invalid entry structure in purchase data")
            