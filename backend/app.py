from app import app, db
from app.utils.accountsutils import create_user_company

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
