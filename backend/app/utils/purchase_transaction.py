from .transaction import TransactionUtils
from app.models import Stock, StockEntry, db, Account
from datetime import datetime

transaction_utils = TransactionUtils()


class PurchaseUtils:
    def calculate_total_purchase_price(self, stocks):
        total_purchase_price = 0
        for stock_data in stocks:
            total_purchase_price += stock_data.get('units') * stock_data.get('price')
        return total_purchase_price

    def validate_purchase(self, data):
        transaction_utils.validate_data(data, is_general=False)
        stocks = data.get('stocks', [])
        if not stocks:
            raise ValueError("No stocks provided in the data")
        if data.get("category") != "purchase":
            raise ValueError("The entry is not a purchase")
        total_purchase_price = self.calculate_total_purchase_price(stocks)
        debit_totals = sum(entry.get("debit", 0) for entry in data.get("entries", []))
        if debit_totals != total_purchase_price:
            raise ValueError("Debit totals do not match calculated purchase price.")
        
    def update_stock_and_create_entries(self, company_id, user_id, data):
        payment_account = self.get_payment_account(company_id, data.get('entries'), data.get('category'))
        new_transaction = transaction_utils.create_transaction(data, company_id, user_id)
        stocks = data.get('stocks', [])
        for stock_data in stocks:
            stock = self.get_stock(company_id, stock_data.get("stock_id"))
            print(stock.to_dict())
            self.update_stock_quantity(stock, stock_data)
            self.create_stock_entry(stock, payment_account, stock_data, data, new_transaction, user_id)

        return new_transaction

    def get_stock(self, company_id, stock_id):
        stock = Stock.query.filter_by(id=stock_id, company_id=company_id).first()
        if not stock:
            raise ValueError(f"Stock with ID {stock_id} not found.")
        return stock

    def get_payment_account(self, company_id, entries, category):
        payment_account = self.get_stock_entries_account(company_id, entries, category)
        if not payment_account:
            raise ValueError("The accounts of Bank, Cash or Accounts Payable not found")
        return payment_account

    def update_stock_quantity(self, stock, stock_data):
        stock.total_quantity += stock_data.get("units")

    def create_stock_entry(self, stock, payment_account, stock_data, data, transaction, user_id):
        stock_entry = StockEntry(
            transaction_id=transaction.id,
            user_id=user_id,
            stock_id=stock.id,
            account_id=payment_account.id,
            quantity=stock_data.get("units"),
            remaining_quantity=stock_data.get("units"),
            price=stock_data.get("price", 0),
            category=data.get("category"),
            date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
            cogs=stock_data.get('units') * stock_data.get('price')
        )
        db.session.add(stock_entry)

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