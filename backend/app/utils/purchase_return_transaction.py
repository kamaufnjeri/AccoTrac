from app.models import StockEntry, Stock, db, Account
from datetime import datetime
from .transaction import TransactionUtils


transaction_utils = TransactionUtils()

class PurchaseReturnUtils:
    def process_purchase_return(self, company_id, user_id, data):
        stock_entry_id = data.get('stock_entry_id')
        stock_entry = self.get_stock_entry(stock_entry_id)
        return_units = self.get_return_units(data)
        self.validate_purchase_return(data, stock_entry, return_units)
        self.update_stock_after_return(stock_entry, return_units)
        cog = self.calculate_cogs(return_units, stock_entry.price)
        inventory_account = self.get_inventory_account(company_id)
        payment_account = self.get_payment_account(company_id, stock_entry)
        entry_data = {
            "date": data.get("date"),
            "description": data.get("description"),
            "entries": [
                {"account_id": payment_account.id, "debit": cog, "credit": 0},
                {"account_id": inventory_account.id, "debit": 0, "credit": cog}
            ]
        }
        new_transaction = transaction_utils.create_transaction(entry_data, company_id, user_id)
        new_stock_entry = self.create_new_stock_entry(
            stock_entry, return_units,
            new_transaction, user_id, cog, data
        )
        if new_transaction and new_stock_entry:
            print(new_stock_entry.id)
            return new_stock_entry.to_dict()
        else:
            raise ValueError("Error processing sales return")
        
    def get_stock_entry(self, stock_entry_id):
        stock_entry = StockEntry.query.filter_by(id=stock_entry_id).first()
        if not stock_entry:
            raise ValueError(f"Stock entry of ID {stock_entry_id} was not found")
        return stock_entry
     
    def get_return_units(self, data):
        return_units = int(data.get('units', 0))
        if return_units == 0:
            raise ValueError("Amount of stock to return not given")
        return return_units
    
    def validate_purchase_return(self, data, stock_entry, return_units):
        transaction_utils.validate_data(data, is_general=False)
        if data.get('category') != "purchase return":
            raise ValueError("The entry is not a purchase return")
        
        if not data.get("units"):
            raise ValueError("Units to be returned are not given")
        
        if not data.get("stock_entry_id"):
            raise ValueError("Stock entry id not given")

        if stock_entry.category != "purchase":
            raise ValueError(f"Stock entry ID {stock_entry.id} is not a purchase")
        print(stock_entry.stock.total_quantity)
        if (stock_entry.remaining_quantity < return_units) or (stock_entry.stock.total_quantity < return_units):
            raise ValueError(
                f"Stock entry available {stock_entry.remaining_quantity} is less than"
                f" stock being returned {return_units}"
            )
        
    def get_stock(self, stock_id):
        stock = Stock.query.filter_by(id=stock_id).first()
        if not stock:
            raise ValueError(f"Stock of ID {stock_id} was not found")
        return stock

    def update_stock_after_return(self, stock_entry, return_units):
        stock = self.get_stock(stock_entry.stock_id)
        stock.total_quantity -= return_units
        stock_entry.remaining_quantity -= return_units

    def calculate_cogs(self, return_units, price):
        return return_units * price
    
    def create_new_stock_entry(self, stock_entry, return_units, transaction, user_id, cog, data):
        new_stock_entry = StockEntry(
            stock_id=stock_entry.stock_id,
            transaction_id=transaction.id,
            user_id=user_id,
            account_id=stock_entry.account_id,
            quantity=return_units,
            remaining_quantity=0,
            price=stock_entry.price,
            category=data.get("category"),
            date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
            cogs=cog
        )
        db.session.add(new_stock_entry)
        return new_stock_entry
    
    def get_inventory_account(self, company_id):
        inventory_account = Account.query.filter_by(
            company_id=company_id,
            category="asset",
            sub_category="inventory"
        ).first()
        if not inventory_account:
            raise ValueError("Inventory account not found")
        return inventory_account

    def get_payment_account(self, company_id, stock_entry):
        payment_account = Account.query.filter_by(
            company_id=company_id,
            id=stock_entry.account_id
        ).first()
        if not payment_account:
            raise ValueError("Payment account not found")
        return payment_account