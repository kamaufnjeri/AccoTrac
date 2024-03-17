import unittest
from app.utils import TransactionUtils

transaction = TransactionUtils()
class TestTransactionUtils(unittest.TestCase):
    def test_balance_check_asset(self):
        # Create a mock asset account
        account = MockAccount(category="asset", debit_total=100, credit_total=50)
        # Transaction entry with a debit of 50
        entry = {"debit": 50, "credit": 0}
        # Assert that balance check returns True (balance is enough)
        is_balance_enough, balance = transaction.is_account_balance_enough(account, entry)
        self.assertTrue(is_balance_enough)
        self.assertEqual(balance, 50)

    def test_balance_check_liability(self):
        # Create a mock liability account
        account = MockAccount(category="liability", debit_total=50, credit_total=100)
        # Transaction entry with a credit of 60
        entry = {"debit": 40, "credit": 0}
        # Assert that balance check returns True (balance is enough)
        is_balance_enough, balance = transaction.is_account_balance_enough(account, entry)
        self.assertTrue(is_balance_enough)
        self.assertEqual(balance, 50)

    def test_balance_check_insufficient_balance(self):
        # Create a mock asset account with insufficient balance
        account = MockAccount(category="asset", debit_total=50, credit_total=40)
        # Transaction entry with a debit of 60
        entry = {"debit": 0, "credit": 30}
        # Assert that balance check returns False (balance is insufficient)

        is_balance_enough, balance = transaction.is_account_balance_enough(account, entry)
        self.assertEqual(is_balance_enough, False)
        self.assertEqual(balance, 10)

    def test_balance_check_invalid_transaction(self):
        # Create a mock liability account
        account = MockAccount(category="liability", debit_total=50, credit_total=100)
        # Transaction entry with both debit and credit amounts nonzero
        entry = {"debit": 60, "credit": 50}
        # Assert that balance check returns False (invalid transaction)
        is_balance_enough, balance = transaction.is_account_balance_enough(account, entry)
        self.assertEqual(is_balance_enough, False)
        self.assertEqual(balance, 50)


class MockAccount:
    def __init__(self, category, debit_total, credit_total):
        self.category = category
        self.debit_total = debit_total
        self.credit_total = credit_total

# Run the tests
if __name__ == '__main__':
    unittest.main()
