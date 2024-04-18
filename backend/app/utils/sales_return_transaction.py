from app.models import db, Account, StockEntry, Stock
from .transaction import TransactionUtils
from datetime import datetime

transaction_utils = TransactionUtils()


class SalesReturnUtils:
    def validate_sales_return(self, data, stock_entry):
        transaction_utils.validate_data(data, is_general=False)
        
        if data.get("category") != "sales return":
            raise ValueError("The transaction is not a sales return")
        
        if not data.get("units"):
            raise ValueError("Units to be returned are not given")
        
        if not data.get("stock_entry_id"):
            raise ValueError("Stock entry id not given")

        if not stock_entry:
            raise ValueError("The stock entry was not found")

        if stock_entry.category != "sales":
            raise ValueError("Stock entry is not a sales")
        
    def adjust_stock_and_create_entry(
            self, user_id, stock, stock_entry,
            return_units, cogs, data, transaction
        ):
        stock.total_quantity += return_units
        stock_entry.remaining_quantity += return_units

        new_stock_entry = StockEntry(
            stock_id=stock.id,
            user_id=user_id,
            transaction_id=transaction.id,
            account_id=stock_entry.account_id,
            quantity=return_units,
            remaining_quantity=0,
            price=stock_entry.price,
            category="sales return",
            date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
            cogs=cogs
        )
        db.session.add(new_stock_entry)
        return new_stock_entry

    def create_adjustment_entries(self, company_id, stock_entry, data, total_sales, cogs):
        sales_account = Account.query.filter_by(
            company_id=company_id,
            category="revenue",
            sub_category="sales_revenue"
        ).first()
        receipt_account = Account.query.filter_by(
            company_id=company_id,
            id=stock_entry.account_id
        ).first()
        inventory_account = Account.query.filter_by(
            company_id=company_id,
            category="asset",
            sub_category="inventory"
        ).first()
        cogs_account = Account.query.filter_by(
            company_id=company_id,
            category="expense",
            sub_category="cost_of_goods_sold"
        ).first()

        if not all([sales_account, receipt_account, inventory_account, cogs_account]):
            raise ValueError("Accounts needed to adjust the sales return not found")

        sales_data = {
            "date": data.get('date'),
            "description": data.get('description'),
            "entries": [
                {"account_id": sales_account.id, "debit": total_sales, "credit": 0},
                {"account_id": receipt_account.id, "debit": 0, "credit": total_sales}
            ]
        }

        cogs_data = {
            "date": data.get('date'),
            "description": data.get('description'),
            "entries": [
                {"account_id": inventory_account.id, "debit": cogs, "credit": 0},
                {"account_id": cogs_account.id, "debit": 0, "credit": cogs}
            ]
        }

        return sales_data, cogs_data
    
    
    def process_sales_return(self, company_id, user_id, data):  
        stock_entry_id = data.get('stock_entry_id')
        stock_entry = StockEntry.query.filter_by(id=stock_entry_id).first()    
        self.validate_sales_return(data, stock_entry)
        return_units = data.get('units')
        stock = Stock.query.filter_by(id=stock_entry.stock_id, company_id=company_id).first()
        if not stock:
            raise ValueError("Stock not found")

        if (stock_entry.quantity < return_units) or ((stock_entry.remaining_quantity + return_units) > stock_entry.quantity):
            raise ValueError("Returned items exceed items sold")

        total_sales = return_units * stock_entry.price
        cogs = stock_entry.cogs / stock_entry.quantity * return_units
        sales_data, cogs_data = self.create_adjustment_entries(company_id, stock_entry, data, total_sales, cogs)

        new_transaction = transaction_utils.create_transaction(sales_data, company_id, user_id)
        if new_transaction:
            adjust_transaction = transaction_utils.create_transaction(cogs_data, company_id, user_id)

            if adjust_transaction:
                new_stock_entry = self.adjust_stock_and_create_entry(
                    user_id, stock, stock_entry,
                    return_units, cogs, data, new_transaction
                )

                if new_stock_entry:
                    return new_transaction