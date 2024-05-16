# AccoTrac: Simplified Accounting for Small Businesses

AccoTrac is a web-based accounting application designed to streamline business finances for small and medium-sized enterprises (SMEs). It offers an affordable and user-friendly solution for managing accounts, recording transactions, and generating financial reports.

## Benefits:

- **Simplified Accounting:** AccoTrac empowers businesses to streamline their accounting processes, saving valuable time and resources.
  
- **Financial Insights:** Gain a clear picture of your financial health with comprehensive reports, enabling informed decision-making to drive growth and success.
  
- **User-Friendly Interface:** The intuitive interface makes it easy for users of all technical abilities to manage their finances effectively.

## Features:

- **Profit & Loss Statement:** Generate detailed reports summarizing revenues, expenses, and net income for specific periods. Analyze profitability and identify areas for improvement.
  
- **Balance Sheet and Trial Balance Tracking:** Monitor your business's health with automatic features. Track trial balances for real-time financial insights and generate balance sheets to assess financial stability.
  
- **Double-Entry Accounting:** AccoTrac utilizes the double-entry accounting method for accurate and reliable financial records. Every transaction is recorded twice, ensuring balanced books and a clear view of your financial health.

## Website Sections:

- **User Area:** The user area is dedicated to registered users. Users can access their personalized dashboard, enter account details, track account status, and interact with the platform.
  
- **Public Area:** The public area of the website is accessible to everyone. It includes landing pages and the contact page. Users can explore the testimonials, about us, and get in touch with the admin through the contact page.

## Work in Progress:

AccoTrac is an ongoing project, and there are several features and enhancements planned for the future. Some of the upcoming features include:

- **Significant improvement on the dashboard to add "stock items":** This will allow users to manage their inventory more effectively within AccoTrac. (Note: This functionality includes additional features like adding, editing, and deleting stock items).
  
- **Expanded User Registration and Application:** Enhancements to the user registration and application process to provide more comprehensive information and streamline the application workflow.
  
- **Collaboration and Open Source:** AccoTrac welcomes collaboration and is an open-source project. Developers can contribute to the project, suggest improvements, and help shape the future of the platform.

## Technologies Used:

- **Python Flask:** A Python web framework used for developing the back-end of the platform.
  
- **MySQL:** A relational database management system used for storing application and user data.
  
- **HTML, CSS, JavaScript:** Front-end technologies used for designing and creating the user interface.
  
- **Bootstrap:** A popular CSS framework that provides responsive design and pre-built components to enhance the visual appearance of the platform.
  
- **FontAwesome:** A comprehensive icon set used to add visually appealing icons to the platform.
  
- **SCSS:** A CSS preprocessor that improves code maintainability and provides additional features such as variables and mixins.

## Authors and Credits:

- Florence Kamau (Backend Developer)
- Joel Muhoho (Backend Developer)
- Olatunbosun (Frontend Developer)
- Innocent Akpoyibo (Frontend Developer)

## API Documentation (Backend Routes)

- This section outlines the documentation for backend routes that are yet to have frontend integration.
- Login in required to access this routes.

### 1. Add Sales:

- **Endpoint**: `/api/addsales`
- **Method**: POST
- **Description**: Adds a sales transaction to the database.
- **Request Body**:
  - `date`: Date of the sales transaction (YYYY-MM-DD format).
  - `description`: Description of the sales transaction.
  - `category`: Category of the transaction (e.g., "sales").
  - `entries`: List of accounting entries for the sales transaction (each entry containing `account_id`, `debit`, and `credit`).
  - `stocks`: List of stock items sold (each item containing `stock_id`, `units`, and `price`).
- **Example Request**:
  ```json
  {
    "date": "2024-03-31",
    "description": "Sales of products",
    "category": "sales",
    "entries": [
      {"account_id": "123", "debit": 0, "credit": 800.00},
      {"account_id": "456", "debit": 800.00, "credit": 0}
    ],
    "stocks": [
      {"stock_id": "789", "units": 10, "price": 120.00},
      {"stock_id": "101", "units": 5, "price": 150.00}
    ]
  }
- **Response**:
  - Status: 201 Created
  - Body: Confirmation message or error details.

### 2. Add Purchase:

- **Endpoint**: `/api/addpurchase`
- **Method**: POST
- **Description**: Adds a sales transaction to the database.
- **Request Body**:
  - `date`: Date of the sales transaction (YYYY-MM-DD format).
  - `description`: Description of the purchase transaction.
  - `category`: Category of the transaction (e.g., "purchase").
  - `entries`: List of accounting entries for the sales transaction (each entry containing `account_id`, `debit`, and `credit`).
  - `stocks`: List of stock items sold (each item containing `stock_id`, `units`, and `price`).
- **Example Request**:
  ```json
  {
    "date": "2024-03-31",
    "description": "Purchase of products",
    "category": "sales",
    "entries": [
      {"account_id": "123", "debit": 0, "credit": 800.00},
      {"account_id": "456", "debit": 800.00, "credit": 0}
    ],
    "stocks": [
      {"stock_id": "789", "units": 10, "price": 120.00},
      {"stock_id": "101", "units": 5, "price": 150.00}
    ]
  }
- **Response**:
  - Status: 201 Created
  - Body: Confirmation message or error details.

### 3. Sales Return:

- **Endpoint**: `/api/salesreturn`
- **Method**: POST
- **Description**: Records a sales return transaction.
- **Request Body**:
  - `date`: Date of the return transaction (YYYY-MM-DD format).
  - `description`: Description of the return.
  - `category`: Category of the return transaction (e.g., "sales return").
  - `units`: Number of units returned.
  - `stock_entry_id`: ID of the stock entry for the returned product.
- **Example Request**:
  ```json
  {
    "date": "2024-03-31",
    "description": "Return of defective items",
    "category": "sales return",
    "units": 2,
    "stock_entry_id": "123"
  }
- **Response**:
  - Status: 201 Created
  - Body: Confirmation message or error details.

### 4. Purchase Return:

- **Endpoint**: `/api/purchasereturn`
- **Method**: POST
- **Description**: Records a purchase return transaction.
- **Request Body**:
  - `date`: Date of the return transaction (YYYY-MM-DD format).
  - `description`: Description of the return.
  - `category`: Category of the return transaction (e.g., "purchase return").
  - `units`: Number of units returned.
  - `stock_entry_id`: ID of the stock entry for the returned product.
- **Example Request**:
  ```json
  {
    "date": "2024-03-31",
    "description": "Return of unused items",
    "category": "purchase return",
    "units": 5,
    "stock_entry_id": "789"
  }
- **Response**:
  - Status: 201 Created
  - Body: Confirmation message or error details.

### 5. Add Stock:

- **Endpoint**: `/api/addstock`
- **Method**: POST
- **Description**: Adds a new stock item to the database.
- **Request Body**:
  - `name`: Name of the stock item.
- **Example Request**:
  ```json
  {
    "name": "Product X"
  }
- **Response**:
  - Status: 201 Created
  - Body: Confirmation message or error details.

### 6. Update Stock:

- **Endpoint**: `/api/stock/:stock_id`
- **Method**: PUT
- **Description**: Updates an existing stock item in the database.
- **Request Parameters**:
  - `stock_id`: ID of the stock item to update.
- **Request Body**:
  - `name`: Updated name of the stock item.
- **Example Request**:
  ```json
  {
    "name": "Updated Product X"
  }
- **Response**:
  - Status: 200 OK
  - Body: Confirmation message or error details.

### 7. Delete Stock:

- **Endpoint**: `/api/stock/:stock_id`
- **Method**: DELETE
- **Description**: Deletes an existing stock item in the database.
- **Request Parameters**:
  - `stock_id`: ID of the stock item to update.
- **Response**:
  - Status: 200 OK
  - Body: Confirmation message or error details.

### 8. Get Stock:

- **Endpoint**: `/api/stock/:stock_id`
- **Method**: GET
- **Description**: Get info of an existing stock item in the database.
- **Request Parameters**:
  - `stock_id`: ID of the stock item to update.
- **Response**:
  - Status: 200 OK
  - Body: Details of the stock item.

### 9. Get Stock Entries by Category (With JSON Request Body):

- **Endpoint**: `/api/stockentries`
- **Method**: GET
- **Description**: Retrieves details of all stock items belonging to a specific category from the database.
- **Request Body**:
  - `category`: Category of stock items.
- **Example Request**:
  ```json
  {
    "category": "sales"
  }
- **Response**:
  - Status: 200 OK
  - Body: Details of stock items matching the specified category.

