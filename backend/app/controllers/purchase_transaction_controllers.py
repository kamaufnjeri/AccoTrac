from app.models import  Stock, StockEntries, Account
from datetime import datetime
from app import db
from .general_transaction_controllers import GeneralTransactionControllers
from .sales_transaction_controllers import SalesTransactionControllers
from app.utils import TransactionUtils

transaction = GeneralTransactionControllers()
purchase_returns = SalesTransactionControllers()
purchase_utils = TransactionUtils()


class PurchaseTransactionControllers:
    def create_purchase_journal(self, company_id, data):
        """
        Entering a purchase transaction.
        """
        try:
            """get total purchase by adding all items price"""
            total_purchase_price = 0
                
            stocks = data.get('stocks', [])

            """confirm that stocks are in data received"""
            if stocks:
                """ensure the transaction is a purchase"""
                if data.get("category") != "purchase":
                        raise ValueError("The entry is not a purchase")
                
                for stock_data in stocks:
                    """loop through list of stocks given and check the stock is in the databas"""
                    stock = Stock.query.filter_by(
                        id=stock_data.get("stock_id"),
                        company_id=company_id
                    ).first()
                    if not stock:
                        raise ValueError(f"Stock with ID {stock_data.get('stock_id')} not found.")
                    
                    """get id of payment or payable account and retrieve it from the database"""
                    payment_account = purchase_utils.get_stock_entries_account(
                        company_id, data.get('entries'), data.get('category')
                    )
                    if not payment_account:
                        raise ValueError("The accounts of Bank, Cash or Accounts Payable not found")
                    
                    """add the price of stock per unit times of units to find total purchase price"""
                    total_purchase_price += stock_data.get('units') * stock_data.get('price')
                    """add to stock quantity the units purchased"""
                    stock.total_quantity += stock_data.get("units")

                    """add the stock entry to database"""
                    stock_entry = StockEntries(
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

            """compare total purchase of items to the debit to ensure they are equal"""
            debit_totals = sum(entry.get("debit", 0) for entry in data.get("entries", []))
            if debit_totals != total_purchase_price:
                raise ValueError("Debit totals do not match calculated purchase price.")

            """adjust the accounts as needed. A double entry"""
            message, code, response = transaction.create_general_journal(company_id, data)
            if code == 201:
                """if the double entry is successfull"""
                return "Purchase transaction successfully entered", code, response
            else:
                return message, code, response

        except ValueError as e:
            db.session.rollback()
            return "Error entering the purchase transaction", 400, str(e)
        
    def purchase_return_journal(self, company_id, data):
        """
        Recording return of stocks to supplier or correcting a wrong
        purchase entry
        {
            "date": "2023-10-27",
            "description": "return of goods bought from mr kaseem on cash",
            "category": "purchase return",
            "stock_entry_id": 4,
            "units": 5
        }
        """
        try:
            stock_entry_id = data.get('stock_entry_id')
            stock_entry = StockEntries.query.filter_by(
                id=stock_entry_id
            ).first()

            return_units = int(data.get('units', 0))
            
            if return_units == 0:
                raise ValueError("Amount of stock to return not given")
    
            if data.get('category') != "purchase return":
                raise ValueError("The entry is not a purchase return")
            
            if not stock_entry:
                raise ValueError(f"Stock entry of ID {stock_entry_id} was not found")
            
            if stock_entry.category != "purchase":
                raise ValueError(f"Stock entry ID {stock_entry.id} is not a purchase")

            stock = Stock.query.filter_by(
                id=stock_entry.stock_id,
                company_id=company_id
            ).first()
            if not stock:
                raise ValueError("Stock of ID {stock_entry.stock_id} was not found")
            
            if (stock_entry.remaining_quantity < return_units) or (
                stock.total_quantity < return_units
            ):
                raise ValueError(
                    f"Stock entry available {stock_entry.remaining_quantity} is less than"
                    f" stock being returned {return_units}"
                )

            
            stock.total_quantity -= return_units
            stock_entry.remaining_quantity -= return_units
            cog = data.get('units') * stock_entry.price

            new_stock_entry = StockEntries(
                stock_id=stock.id,
                account_id=stock_entry.account_id,
                quantity=return_units,
                remaining_quantity=0,
                price=stock_entry.price,
                category=data.get("category"),
                date=datetime.strptime(data.get("date"), '%Y-%m-%d'),
                cogs=cog
            )
            db.session.add(new_stock_entry)
            inventory_account = Account.query.filter_by(
                company_id=company_id,
                category="asset",
                sub_category="inventory"
            ).first()
            payment_account = Account.query.filter_by(
                company_id=company_id,
                id=stock_entry.account_id
            ).first()
            if not inventory_account or not payment_account:
                raise ValueError("The inventory or payment accounts not available")

            data = {
                "date": data.get("date"),
                "description": data.get("description"),
                "entries": [
                    {"account_id": payment_account.id, "debit": cog, "credit": 0},
                    {"account_id": inventory_account.id, "debit": 0, "credit": cog}
                ]
            }
            message, code, resp_item = transaction.create_general_journal(company_id, data)

            if code == 201:
                db.session.commit()
                return "Purchase return entry successful", code, resp_item
            else:
                raise ValueError(resp_item)

        except ValueError as ve:
            db.session.rollback()
            return "Error when entering purchase return", 400, str(ve)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error entering purchase return", 500, str(e)
