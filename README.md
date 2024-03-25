# AccoTrac API Authentication Documentation

## Overview

AccoTrac provides a RESTful API for managing users, companies, authentication, and related functionalities. This documentation outlines the endpoints, request methods, payloads, and sample requests/responses for each endpoint.

## Requirements

.env file

```
MAIL_SERVER='your_mail_server'
MAIL_PORT=587
MAIL_USE_TLS=1
MAIL_USERNAME='your_email@example.com'
MAIL_PASSWORD='your_email_password'
ADMINS='your_email@example.com'
```

Installs

```python
pip install -r requirements.txt
```

## Base URL

The base URL for all API endpoints is `/`.

## Authentication

The AccoTrac API uses session-based authentication managed by Flask-Login. When accessing protected endpoints, the frontend must maintain the user's session.

#### Table of Contents

1. [Home](#Home)
2. [User Endpoints](#Create-User)
   - [Create User](#Create-User)
   - [Verify Email](#verify-email)
   - [Update User](#update-user)
   - [Delete User](#delete-user)
   - [Login](#login)
   - [Logout](#logout)
3. [Company Endpoints](#company-endpoints)
   - [Create Company](#create-company)
   - [Update Company](#update-company)
   - [Delete Company](#delete-company)
4. [Password Management Endpoints](#password-management-endpoints)
   - [Reset Password](#reset-password)
   - [Update Password](#update-password)

---

### Endpoints

1. **Home**

   - Method: `GET`, `POST`
   - Path: `/`
   - Description: Returns a simple message indicating that AccoTrac is coming soon.
   - Response:
     - `GET`: `<h1> AccoTrac Coming soon</h1>`
     - `POST`: Not applicable

   #### Sample Request:

   ```
   GET /
   ```

   #### Sample Response:

   ```html
   <h1>AccoTrac Coming soon</h1>
   ```

2. **Create User**

   - Method: `GET`, `POST`
   - Path: `/user`
   - Description:
     - `POST`: Creates a new user. Expects JSON data including fields such as firstname, lastname, email, password, and company_name.
     - `GET`: Returns a register page.
   - Response:
     - `POST`: Returns a JSON with a new user created or an error message.
     - `GET`: Returns a message indicating the signup page is coming soon.

   #### Sample Request:

   ```json
   POST /user
   Content-Type: application/json

   {
       "firstname": "John",
       "lastname": "Doe",
       "email": "john.doe@example.com",
       "password": "password123",
       "company_name": "Example Company"
   }
   ```

   #### Sample Response:

   ```json
   {
     "message": "Check your email for a link to verify your email",
     "result": "User created successfully"
   }
   ```

3. **Verify Email**

   - Method: `GET`
   - Path: `/user/verify_email/<token>`
   - Description: Verifies user email based on the token provided.
   - Response: Returns a message indicating whether the email was successfully verified or not.

   #### Sample Request:

   ```
   GET /user/verify_email/<token>
   ```

   #### Sample Response:

   ```json
   {
     "message": "Email verified successfully"
   }
   ```

4. **Update User**

   - Method: `GET`, `PUT`
   - Path: `/user/<id>`
   - Description:
     - `PUT`: Updates user information. Expects JSON data with fields to be updated.
     - `GET`: Returns an update page.
   - Response:
     - `PUT`: Returns username and updated information.
     - `GET`: Returns a message indicating the update page is coming soon.

   #### Sample Request:

   ```json
   PUT /user/<id>
   Content-Type: application/json

   {
       "firstname": "John",
       "lastname": "Smith"
   }
   ```

   #### Sample Response:

   ```json
   {
     "firstname": "John",
     "lastname": "Smith",
     "email": "john.doe@example.com",
     "company_name": "Example Company"
   }
   ```

5. **Delete User**

   - Method: `DELETE`
   - Path: `/user/<admin_id>`
   - Description: Allows admin to delete users they invited.
   - Response: Returns a message indicating whether the user was successfully deleted or not.

   #### Sample Request:

   ```
   DELETE /user/<admin_id>
   ```

   #### Sample Response:

   ```json
   {
     "message": "User deleted successfully"
   }
   ```

6. **Login**

   - Method: `GET`, `POST`
   - Path: `/login`
   - Description:
     - `POST`: Creates a session for a user if credentials match.
     - `GET`: Returns a login page.
   - Response:
     - `POST`: Returns dict with current user authentication status.
     - `GET`: Returns a message indicating the login page is coming soon.

   #### Sample Request:

   ```json
   POST /login
   Content-Type: application/json

   {
       "email": "john.doe@example.com",
       "password": "password123"
   }
   ```

   #### Sample Response:

   ```json
   {
     "message": "Logged in Successfully",
     "is_authenticated": "True",
     "user": {
       "firstname": "John",
       "lastname": "Doe",
       "email": "john.doe@example.com",
       "company_name": "Example Company"
     }
   }
   ```

7. **Logout**

   - Method: `POST`
   - Path: `/logout`
   - Description: Destroys the session of the current logged-in user.
   - Response: Returns the status of the current logged-in user.

   #### Sample Request:

   ```
   POST /logout
   ```

   #### Sample Response:

   ```json
   {
     "message": "Logged out Successfully",
     "is_authenticated": "False",
     "userFirstName": "John"
   }
   ```

8. **Create Company**

   - Method: `GET`, `POST`
   - Path: `/company`
   - Description:
     - `GET`: Retrieves companies associated with the current user.
     - `POST`: Only admins can create a company (not currently implemented).
   - Response:
     - `GET`: Returns a list of companies associated with the current user.
     - `POST`: Not implemented.

   #### Sample Request:

   ```
   GET /company
   ```

   #### Sample Response:

   ```json
   {
     "Message": "Here is a list of your companies",
     "companies": [
       {
         "company_name": "Example Company",
         "company_email": "example@example.com",
         "company_country": "Example Country",
         "company_currency": "USD"
       }
     ]
   }
   ```

9. **Reset Password**

   - Method: `POST`
   - Path: `/reset_password`
   - Description: Sends a reset password link to the user's email.
   - Response: Returns a message indicating whether the email was sent successfully or not.

   #### Sample Request:

   ```json
   POST /reset_password
   Content-Type: application/json

   {
       "user_email": "john.doe@example.com"
   }
   ```

   #### Sample Response:

   ```json
   {
     "message": "Check your email for the reset link",
     "Email": "Check your email for the reset link"
   }
   ```

10. **Update Password**

    - Method: `PUT`, `GET`
    - Path: `/update_password/<token>`
    - Description:
      - `PUT`: Updates user password based on the token provided. Expects JSON data with new password fields.
      - `GET`: Returns a change password page.
    - Response:
      - `PUT`: Returns a message indicating whether the password was updated successfully or not.
      - `GET`: Returns a message indicating the change password page is coming soon.

    #### Sample Request:

    ```json
    PUT /update_password/<token>
    Content-Type: application/json

    {
        "password": "new_password123",
        "confirm_password": "new_password123"
    }
    ```

    #### Sample Response:

    ```json
    {
      "message": "Password updated successfully"
    }
    ```

11. **Update Company**

    - Method: `PUT`
    - Path: `/company/<company_id>`
    - Description: Updates company information based on the provided company ID.
    - Response: Returns the updated company information.

    #### Sample Request:

    ```json
    PUT /company/<company_id>
    Content-Type: application/json

    {
        "company_name": "Updated Company Name"
    }
    ```

    #### Sample Response:

    ```json
    {
      "company_name": "Updated Company Name",
      "company_email": "example@example.com",
      "company_country": "Example Country",
      "company_currency": "USD"
    }
    ```

12. **Delete Company**

    - Method: `DELETE`
    - Path: `/company/<company_id>`
    - Description: Deletes the company identified by the provided company ID.
    - Response: Returns a message indicating whether the company was successfully deleted or not.

    #### Sample Request:

    ```
    DELETE /company/<company_id>
    ```

    #### Sample Response:

    ```json
    {
      "message": "Company deleted successfully"
    }
    ```
