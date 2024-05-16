from app.models import Account, Stock, db, StockEntry
from datetime import datetime
from .purchase_transaction import PurchaseUtils
from .transaction import TransactionUtils

purchase_utils = PurchaseUtils()
transaction_utils = TransactionUtils()

class SalesUtils:
    def calculate_cogs(self, stock, quantity_sold):
    
        cogs = 0
        remaining_quantity = quantity_sold
        stock_purchase_entries = stock.get_sorted_purchase_entries()
        if stock.total_quantity < quantity_sold:
            raise ValueError(
                f"Insufficient inventory of {stock.total_quantity} to sell the specified quantity {quantity_sold}."
            )
            
        for entry in stock_purchase_entries:
            cost_per_unit = entry.price
            quantity_available = entry.quantity

            #choose between the two the minimum
            quantity_to_use = min(remaining_quantity, quantity_available)

            cost_from_entry = quantity_to_use * cost_per_unit

            if entry.remaining_quantity <= 0:
                continue

            entry.remaining_quantity -= quantity_to_use
            remaining_quantity -= quantity_to_use
            cogs += cost_from_entry

            if remaining_quantity == 0:
                break

        if remaining_quantity > 0:
            raise ValueError("Insufficient inventory to sell the specified quantity.")
        
        stock.total_quantity -= quantity_sold
        return cogs

    def validate_sales(self, data):
        transaction_utils.validate_data(data, is_general=False)
        stocks = data.get('stocks', [])
        if not stocks:
            raise ValueError("No stocks provided in the data")
        
        if data.get("category") != "sales":
            raise ValueError("The entry is not a purchase")


    def process_stock_entries(self, company_id, user_id, data):
        stocks = data.get('stocks', [])
        receipt_account = purchase_utils.get_stock_entries_account(company_id, data.get('entries'), data.get('category'))
        self.validate_sales(data)
        new_transaction = transaction_utils.create_transaction(data, company_id, user_id)
        total_sales_price = 0
        total_cost_goods_sold = 0
        for stock_data in stocks:
            stock = self.get_stock(stock_data.get("stock_id"))
            total_sales_price += stock_data.get("units") * stock_data.get("price")
            if stock.total_quantity < stock_data.get("units"):
                raise ValueError(
                    f"Insufficient stock for stock {stock.id} (available: {stock.total_quantity},"
                    f"requested: {stock_data.get('units')})"
                )
            if stock_data.get('units') == 0:
                raise ValueError('The amount of stock to purchase cannot be zero')
            cogs = self.calculate_cogs(stock, stock_data.get("units"))
            if not cogs:
                raise ValueError("Insufficient inventory to sell the specified quantity")
            total_cost_goods_sold += cogs
            stock = self.get_stock(stock_data.get("stock_id"))
            stock_entry = self.create_stock_entry(stock, receipt_account, stock_data, new_transaction, user_id, data, cogs)
            db.session.add(stock_entry)

        credit_totals = sum(entry.get("credit", 0.0) for entry in data.get("entries", []))
        if credit_totals != total_sales_price:
            raise ValueError("Credit totals do not match calculated sales price.")
        if credit_totals < total_cost_goods_sold:
            raise ValueError(
                f"The sales price is {credit_totals} while the "
                f"cost of goods being sold is {total_cost_goods_sold}."
                "The sales is a loss"
            )
        adjust_transaction = self.adjust_cogs(company_id, user_id, data, total_cost_goods_sold)

        if adjust_transaction:
            return new_transaction.to_dict()

    def create_stock_entry(self, stock, receipt_account, stock_data, transaction, user_id, data, cogs):
        stock_entry = StockEntry(
            transaction_id=transaction.id,
            user_id=user_id,
            stock_id=stock.id,
            account_id=receipt_account.id,
            quantity=stock_data.get("units"),
            remaining_quantity=0,
            price=stock_data.get("price", 0),
            category=data.get("category"),
            date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
            cogs=cogs,
        )
        return stock_entry

    def adjust_cogs(self, company_id, user_id, data, total_cost_goods_sold):
        cog_account = self.get_cog_account(company_id)
        inventory_account = self.get_inventory_account(company_id)
        adjust_transaction = transaction_utils.create_transaction({
            "date": data.get('date'),
            "description": data.get('description'),
            "entries": [
                {"account_id": cog_account.id, "debit": total_cost_goods_sold, "credit": 0},
                {"account_id": inventory_account.id, "debit": 0, "credit": total_cost_goods_sold}
            ]
        }, company_id, user_id)
        return adjust_transaction

    def get_stock(self, stock_id):
        stock = Stock.query.get(stock_id)
        if not stock:
            raise ValueError(f"Stock with ID {stock_id} not found.")
        return stock

    def get_cog_account(self, company_id):
        cog_account = Account.query.filter_by(
            company_id=company_id,
            category="expense",
            sub_category="cost_of_goods_sold"
        ).first()
        if not cog_account:
            raise ValueError("Cost of goods sold account not found.")
        return cog_account

    def get_inventory_account(self, company_id):
        inventory_account = Account.query.filter_by(
            company_id=company_id,
            category="asset",
            sub_category="inventory"
        ).first()
        if not inventory_account:
            raise ValueError("Inventory account not found.")
        return inventory_account