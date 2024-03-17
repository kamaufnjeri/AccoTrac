from app.models import  Stock, StockEntries, Account
from datetime import datetime
from app import db
from .general_transaction_controllers import GeneralTransactionControllers


transaction = GeneralTransactionControllers()

class PurchaseTransactionControllers:
    def create_purchase_journal(self, company_id, data):
        """
        Args:
            data (dict): Dictionary containing purchase transaction details including date,
                        description, transaction amounts (entries), and product information.
                        Example:
                        {
                            "date": "2024-03-14",
                            "description": "Purchase from Supplier Y",
                            "category": "purchase"'
                            "entries": [
                                {"account_id": 1, "debit": 1000.0, "credit": 0.0},  # Inventory
                                {"account_id": 2, "debit": 0.0, "credit": 1000.0},  # Accounts Payable
                            ],
                            "stocks": [
                                {"stock_id": 1, "units": 4, "price": 200},
                                {"stock_id": 3, "units": 1, "price": 300},
                            ]
                        }
        Raises:
            ValueError: If debit and credit totals do not match, 
                        or if there's insufficient stock (informative message),
                        or if product or account is not found.
            Exception: For unexpected errors during database operations.
        """
        try:
            total_purchase_price = 0
                
            stocks = data.get('stocks', [])

            if stocks:
                if data.get("category") != "purchase":
                        raise ValueError("The entry is not a purchase")
                
                for stock_data in stocks:
                    stock = Stock.query.get(stock_data.get("stock_id"))
                    if not stock:
                        raise ValueError(f"Stock with ID {stock.get('stock_id')} not found.")
                    
                    inventory_account_id = data.get("entries")[0].get("account_id")
                    inventory_account = Account.query.filter_by(
                        id=inventory_account_id,
                        company_id=company_id
                    ).first()

                    if inventory_account.category != "asset" and\
                        inventory_account.sub_category != "inventory":
                        raise ValueError("The account is not an inventory account")
                    total_purchase_price += stock_data.get('units') * stock_data.get('price')
                    stock.total_quantity += stock_data.get("units")

                    stock_entry = StockEntries(
                        stock_id=stock.id,
                        account_id=inventory_account.id,
                        quantity=stock_data.get("units"),
                        remaining_quantity=stock_data.get("units"),
                        price=stock_data.get("price", 0),
                        category=data.get("category"),
                        date=datetime.strptime(data.get("date"), '%Y-%m-%d')
                    )
                    db.session.add(stock_entry)

            debit_totals = sum(entry.get("debit", 0) for entry in data.get("entries", []))
            if debit_totals != total_purchase_price:
                raise ValueError("Debit totals do not match calculated purchase price.")

            message, code, response = transaction.create_general_journal(company_id, data)
            if code == 201:
                return "Purchase transaction successfully entered", code, response
            else:
                return message, code, response

        except ValueError as e:
            db.session.rollback()
            return "Error entering the purchase transaction", 400, str(e)
        except Exception as e:
            db.session.rollback()
            return "Unxepected error when entering purchase transaction", 500, str(e)