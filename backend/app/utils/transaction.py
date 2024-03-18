from app.models import Account
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
        
    def get_stock_entries_account(self, company_id, entries, category):
        for entry in entries:
            account = Account.query.filter_by(
                id=entry.get('account_id'),
                company_id=company_id
            ).first()

            if account:
                if account.category == "asset" and \
                        (account.sub_category == "cash" or account.sub_category == "bank"):
                    return account

                elif category in ["purchase", "purchase return"]:
                    if account.category == "liability" and account.sub_category == "account_payable":
                        return account

                elif category in ["sales", "sales return"]:
                    if account.category == "asset" and account.sub_category == "account_receivable":
                        return account
        
        return None
