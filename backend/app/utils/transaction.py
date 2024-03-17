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
            if credit == 0 and debit!= 0 and balance >= debit:  # Fix logical error here
                return True, balance
            elif credit != 0 and debit == 0:
                return True, balance
            else:
                return False, balance
        else:
            return False, None