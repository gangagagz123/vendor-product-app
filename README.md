
# Vendor Product Management Web Application

---

# 1. Project Overview

This project is a **full-stack Vendor Product Management Web Application** built as part of a technical evaluation.

The system allows vendors to:

* Register an account
* Login securely
* Manage products
* Perform CRUD operations on products

Each vendor can **only access and manage their own products**.

The system uses **Token Authentication** to protect APIs.

---

# 2. Technology Stack

## Backend

* Python
* Django
* Django REST Framework

## Frontend

* Next.js
* React

## Database

* SQLite

---

# 3. Development Workflow

The project was developed following these steps.

---

## Step 1 — Backend Setup

Created the Django project and API application.

Commands used:

```bash
python -m venv venv
venv\Scripts\activate
pip install django
pip install djangorestframework
django-admin startproject backend
cd backend
python manage.py startapp api
python manage.py migrate
python manage.py runserver
```

---

## Step 2 — Vendor Registration

Implemented vendor registration using Django's **User model**.

Serializer:

```
RegisterSerializer
```

API Endpoint:

```
POST /api/register/
```

Fields:

* Username
* Password

Validation added:

* Username must be unique
* Password must contain letters and numbers
* Password must be at least 6 characters long

---

## Step 3 — Vendor Login

Implemented login API.

API Endpoint:

```
POST /api/login/
```

After successful login, the system generates an authentication token.

Example response:

```json
{
  "token": "abc123xyz"
}
```

This token is used for authenticated API requests.

---

## Step 4 — Token Authentication

All product APIs are protected.

Each request must include the token:

```
Authorization: Token <token>
```

If token is missing:

```
401 Unauthorized
```

---

## Step 5 — Product Model

Created a Product model.

Fields:

* Product Name
* Description
* Price
* Quantity
* Created Date
* Vendor (ForeignKey)

Example model:

```python
class Product(models.Model):
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.FloatField()
    quantity = models.IntegerField()
    created_date = models.DateTimeField(auto_now_add=True)
```

---

## Step 6 — Product CRUD APIs

Implemented product CRUD APIs using Django REST Framework.

### Create Product

```
POST /api/products/
```

### View Products

```
GET /api/products/
```

### Update Product

```
PUT /api/products/{id}/
```

or

```
PATCH /api/products/{id}/
```

### Delete Product

```
DELETE /api/products/{id}/
```

---

## Important Rule

A vendor must only see their own products.

Implemented using:

```python
Product.objects.filter(vendor=request.user)
```

---

## Step 7 — Duplicate Product Validation

Added validation to prevent duplicate products.

If a vendor tries to create the same product again, the API returns:

```
This product already exists. You can edit or update it.
```

---

## Step 8 — Frontend Development

The frontend was built using **Next.js**.

Pages created:

* Register Page
* Login Page
* Dashboard Page
* Add Product Page
* Edit Product Page

---

## Register Page

URL:

```
/register
```

Allows vendors to create an account.

---

## Login Page

URL:

```
/login
```

After login:

* Token is generated
* Token is stored in LocalStorage
* User is redirected to dashboard

---

## Dashboard Page

URL:

```
/dashboard
```

Features:

* View product list
* Add product
* Edit product
* Delete product
* Logout

---

## Add Product Page

URL:

```
/add-product
```

Allows vendors to create products.

---

## Edit Product Page

URL:

```
/edit-product/[id]
```

Allows updating product details.

---

# 4. Application Workflow

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

---

# 5. API Testing (Using curl)

The APIs were tested using **curl commands**.

### List Products

```bash
curl -v http://127.0.0.1:8000/api/products/ \
-H "Authorization: Token <token>"
```

---

### Create Product

```bash
curl -v -X POST http://127.0.0.1:8000/api/products/ \
-H "Authorization: Token <token>" \
-H "Content-Type: application/json" \
-d "{\"name\":\"pencil\",\"description\":\"HB pencil\",\"price\":10,\"quantity\":20}"
```

---

### Update Product

```bash
curl -v -X PATCH http://127.0.0.1:8000/api/products/5/ \
-H "Authorization: Token <token>" \
-H "Content-Type: application/json" \
-d "{\"quantity\":100}"
```

---

### Delete Product

```bash
curl -v -X DELETE http://127.0.0.1:8000/api/products/5/ \
-H "Authorization: Token <token>"
```

---

# 6. Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install django
pip install djangorestframework
```

Run migrations:

```bash
python manage.py migrate
```

Start server:

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000
```

---

# 7. Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:3000
```

---

# 8. Folder Structure

```
vendor-product-app

backend/
│
├── api
├── backend
├── manage.py
└── db.sqlite3

frontend/
│
├── app
├── package.json
└── next.config.ts

README.md
```

---

# 9. Conclusion

This project demonstrates a complete **full-stack web application** using:

* Django
* Django REST Framework
* Next.js

The system supports secure authentication and vendor-specific product management with full CRUD functionality.
