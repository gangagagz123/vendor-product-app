---- DEVELOPMENT WORKING FLOW-------

--Step 1 — Backend Setup

Created a Django project and configured the environment.

Commands used:

python -m venv venv
venv\Scripts\activate

Installed dependencies:

pip install django
pip install djangorestframework

Created Django project:

django-admin startproject backend

Created API app:

python manage.py startapp api

Added apps to settings.py:

rest_framework

rest_framework.authtoken

api

Applied migrations:

python manage.py migrate

Started the server:

python manage.py runserver



-- Step 2 — Vendor Registration

Created a registration system using Django's User model.

Serializer created:

RegisterSerializer

Fields:

username

password

API Endpoint:

POST /api/register/

Additional validation added:

Username must be unique

Password must contain letters and numbers

Password must be at least 6 characters long

Example request:

{
"username": "vendor1",
"password": "shop123"
}



--Step 3 — Vendor Login

Created a login API.

API Endpoint:

POST /api/login/

After successful login, the API generates a token.

Example response:

{
"token": "abc123xyz"
}

This token is used to authenticate API requests.

The token is stored in LocalStorage in the frontend.



-- Step 4 — Token Authentication

All product APIs are protected.

Only authenticated users can access product APIs.

Authorization header example:

Authorization: Token abc123xyz

If the token is missing or invalid, the API returns:

401 Unauthorized




-- Step 5 — Product Model

Created a Product model.

Fields:

Product Name

Description

Price

Quantity

Created Date

Vendor (ForeignKey to User)

Example:

class Product(models.Model):
vendor = models.ForeignKey(User, on_delete=models.CASCADE)
name = models.CharField(max_length=200)
description = models.TextField()
price = models.FloatField()
quantity = models.IntegerField()
created_date = models.DateTimeField(auto_now_add=True)



--Step 6 — Product CRUD APIs

Implemented CRUD APIs using Django REST Framework.

API endpoints:

Create Product
POST /api/products/

View Products
GET /api/products/

Update Product
PUT /api/products/{id}/

Delete Product
DELETE /api/products/{id}/



-- Step 7 — Duplicate Product Validation

Validation was added to prevent duplicate products.

If a vendor tries to create a product that already exists, the API returns:

"This product already exists. You can edit or update it."

This validation was implemented in the serializer.



-- Step 8 — Frontend Development

The frontend was developed using Next.js.

Pages created:

Register Page
Login Page
Dashboard Page
Add Product Page
Edit Product Page


                      Register Page

URL:

/register

Allows vendors to create an account.

Fields:

Username

Password

Validation errors are displayed if:

Username already exists

Password does not meet security rules

Login Page

URL:

/login

Allows vendors to login.

After successful login:

Token is generated

Token is stored in LocalStorage

User is redirected to dashboard



                Dashboard Page

URL:

/dashboard

The dashboard displays:

Vendor products

Add product button

Edit product option

Delete product option

Logout button

                Add Product Page

URL:

/add-product

Allows vendors to create products.

Duplicate product validation is handled by the backend.


               Edit Product Page

URL:

/edit-product/[id]

Allows vendors to update existing product information.

Delete Product

Products can be deleted from the dashboard.

This sends:

DELETE /api/products/{id}/



---- Step 9 — Logout

Logout functionality removes the token from LocalStorage.

User is redirected to the login page.




4. Application Workflow

Vendor Registration
↓
Vendor Login
↓
Token Generated
↓
Dashboard Access
↓
Add Product
↓
Edit Product
↓
Delete Product
↓
Logout

---------------------------------------------------------------------------------
---- API TESTING

Base URL:

http://127.0.0.1:8000

Authentication method:

Token Authentication

Authorization header format:

Authorization: Token

-- 1. List Products for Vendor

Command:

curl -v http://127.0.0.1:8000/api/products/ -H "Authorization: Token 83d655dd8342fc317f1ea58bb4948ee4ac3851ab"

Response:

HTTP/1.1 200 OK

Returned product list:

[
{
"id":4,
"name":"amazon",
"description":"selling site",
"price":10000,
"quantity":10
}
]

This confirms that the GET /api/products/ endpoint works and returns products belonging to the authenticated vendor.

-- 2. Vendor Product Isolation Test

Using a different vendor token:

curl -v http://127.0.0.1:8000/api/products/ -H "Authorization: Token c19fa3b89dcd1470220c8446e103d5eed3b59c73"

Response:

HTTP/1.1 200 OK

[
{
"id":5,
"name":"pen",
"description":"ball pen",
"price":20,
"quantity":50
}
]

This confirms that each vendor can only see their own products.

-- 3. Create a Product

Command:

curl -v -X POST http://127.0.0.1:8000/api/products/
-H "Authorization: Token c19fa3b89dcd1470220c8446e103d5eed3b59c73"
-H "Content-Type: application/json"
-d "{"name":"pencil","description":"HB pencil","price":10,"quantity":20}"

Response:

HTTP/1.1 201 Created

{
"id":7,
"name":"pencil",
"description":"HB pencil",
"price":10,
"quantity":20
}

This confirms the POST /api/products/ endpoint successfully creates products.

-- 4. View Products After Creation

Command:

curl -v http://127.0.0.1:8000/api/products/ -H "Authorization: Token c19fa3b89dcd1470220c8446e103d5eed3b59c73"

Response:

HTTP/1.1 200 OK

Products returned:

[
{id:5, name:"pen"},
{id:7, name:"pencil"},
{id:8, name:"pencil"},
{id:9, name:"pencil"}
]

This confirms the new products were successfully added.

-- 5. Update a Product

Command:

curl -v -X PATCH http://127.0.0.1:8000/api/products/5/
-H "Authorization: Token c19fa3b89dcd1470220c8446e103d5eed3b59c73"
-H "Content-Type: application/json"
-d "{"quantity":100}"

Response:

HTTP/1.1 200 OK

{
"id":5,
"name":"pen",
"quantity":100
}

This confirms the PATCH /api/products/{id}/ endpoint updates product data.

-- 6. Delete a Product

Command:

curl -v -X DELETE http://127.0.0.1:8000/api/products/5/
-H "Authorization: Token c19fa3b89dcd1470220c8446e103d5eed3b59c73"

Response:

HTTP/1.1 204 No Content

This confirms the product was successfully deleted.

-- 7. Deleting a Non-Existing Product

Command:

curl -v -X DELETE http://127.0.0.1:8000/api/products/5/
-H "Authorization: Token c19fa3b89dcd1470220c8446e103d5eed3b59c73"

Response:

HTTP/1.1 404 Not Found

{
"detail": "No Product matches the given query."
}

This confirms the API correctly handles invalid product IDs.


-- Testing Conclusion

All CRUD APIs were tested successfully using curl commands.


Verified functionality:


Vendor authentication using tokens

Create product

View vendor-specific products

Update product

Delete product

Error handling for invalid requests

The API behaves correctly according to the project requirements.
