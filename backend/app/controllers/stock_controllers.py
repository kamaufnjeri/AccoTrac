from app.models import Company, Stock, User
from app import db


class StockControllers:
    def create_stock(self, company_id, user_id, data):
        """create a new stock item"""
        company = Company.query.filter_by(id=company_id).first()
        user = User.query.filter_by(id=user_id).first()
        if not user:
            raise Exception(f"User of ID {user_id} doesn't exist")
        if not company:
            raise Exception(f"The company ID {company_id} doesn't exist")
        
        try:
            quantity = 0
            name = data.get("name")

            if name:
                new_stock = Stock(
                    company_id=company_id,
                    user_id=user_id,
                    name=name,
                    total_quantity=quantity
                )
                db.session.add(new_stock)
                db.session.commit()

                return "Stock added successful", 201, new_stock.to_dict()
            else:
                raise Exception("Name field is required for creating a stock item")
        
        except Exception as e:
            db.session.rollback()
            return "Unexpected error adding stock", 500, str(e)

    def get_all_stocks(self, company_id):
        try:
            company = Company.query.filter_by(id=company_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")
        
            stocks = Stock.query.all()

            stocks_list = [stock.to_dict() for stock in stocks]

            return "Stock data successfully fetched", 200, stocks_list

        except Exception as e:
            return "Error fetching stocks! Try again later!", 500, str(e)
        
    def update_stock(self, company_id, stock_id, data):
        try:
            company = Company.query.filter_by(id=company_id).first()
            stock = Stock.query.filter_by(id=stock_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")

            if not stock:
                raise Exception(f"The stock ID {stock_id} doesn't exist")
            
            name = data.get("name")
            if name is not None:
                stock.name = name
            else:
                raise Exception("Name field is required for updating a stock item")
            
            db.session.commit()
            return "Successfully updated stock", 200, stock

        except Exception as e:
            db.session.rollback()
            return "Error updating stock", 500, str(e)


    def delete_stock(self, company_id, stock_id):
        try:
            company = Company.query.filter_by(id=company_id).first()
            stock = Stock.query.filter_by(id=stock_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")

            if not stock:
                raise Exception(f"The stock ID {stock_id} doesn't exist")

            if stock.entries or stock.total_quantity != 0:
                raise Exception(f"Cannot delete stock ID {stock_id} since stock entries have been made to stock")

            db.session.delete(stock)
            db.session.commit()
            return "Success deleting stock", 200, stock

        except Exception as e:
            db.session.rollback()
            return "Error deleting stock", 500, str(e)


    def get_stock(self, company_id, stock_id):
        try:
            company = Company.query.filter_by(id=company_id).first()
            stock = Stock.query.filter_by(id=stock_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")

            if not stock:
                raise Exception(f"The stock ID {stock_id} doesn't exist")

            return "Success fetching stock data", 200, stock.to_dict()

        except Exception as e:
            return "Error fetching data for the stock", 500, str(e)