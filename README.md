# Vendor Product Management Web Application

Full Stack Vendor Product Management Web Application built using **Django REST Framework** and **Next.js**.


---

# 1. Project Overview

This project implements a **Vendor Product Management System** where vendors can:

* Register an account
* Login securely
* Manage their products
* Perform CRUD operations on products

Each vendor can **only access and manage their own products**.

Authentication is implemented using **Token Authentication**.

---


# 2. Technology Stack

## Backend

* Python
* Django
* Django REST Framework

## Frontend

* Next.js
* React
* Tailwind CSS

## Database

* SQLite

---

# 3. Development Workflow

The application was developed step-by-step following a full-stack workflow.

---

## Step 1 — Backend Setup

Created Django backend.

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

Created vendor registration using Django's built-in **User model**.

Serializer created:

```
RegisterSerializer
```

API endpoint:

```
POST /api/register/
```

Fields:

* username
* password

Validation added:

* Username must be unique
* Password must contain letters and numbers
* Password must be at least 6 characters long

---

## Step 3 — Vendor Login

Created login API.

```
POST /api/login/
```

After login:

* Authentication token is generated
* Token is returned in API response

Example response:

```
{
 "token": "abc123xyz"
}
```

This token is required to access protected APIs.

---

## Step 4 — Token Authentication

All product APIs require authentication.

Example header:

```
Authorization: Token <token>
```

If token is missing:

```
401 Unauthorized
```

---

## Step 5 — Product Model

Product model created with the following fields:

* Product Name
* Description
* Price
* Quantity
* Created Date
* Vendor (ForeignKey)

Example model:

```
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

Implemented using Django REST Framework ViewSets.

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

A vendor can only see their own products.

Implemented using:

```
Product.objects.filter(vendor=request.user)
```

---

## Step 7 — Duplicate Product Validation

Validation added to prevent duplicate products.

If a vendor tries to add the same product again:

```
This product already exists. You can edit or update it.
```

---

# 4. Frontend Development (Next.js)

The frontend was developed using Next.js.

Pages implemented:

### Register Page

URL:

```
/register
```

Allows vendors to create an account.

---

### Login Page

URL:

```
/login
```

After successful login:

* Token is saved in LocalStorage
* User is redirected to dashboard

---

### Dashboard Page

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

### Add Product Page

URL:

```
/add-product
```

Allows vendors to create products.

---

### Edit Product Page

URL:

```
/edit-product/[id]
```

Allows vendors to update product details.

---

# 5. Application Workflow

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

# 6. API Testing

APIs were tested using **curl commands in Command Prompt**.

### List Products

```
curl -v http://127.0.0.1:8000/api/products/ \
-H "Authorization: Token <token>"
```

---

### Create Product

```
curl -v -X POST http://127.0.0.1:8000/api/products/ \
-H "Authorization: Token <token>" \
-H "Content-Type: application/json" \
-d "{\"name\":\"pencil\",\"description\":\"HB pencil\",\"price\":10,\"quantity\":20}"
```

---

### Update Product

```
curl -v -X PATCH http://127.0.0.1:8000/api/products/5/ \
-H "Authorization: Token <token>" \
-H "Content-Type: application/json" \
-d "{\"quantity\":100}"
```

---

### Delete Product

```
curl -v -X DELETE http://127.0.0.1:8000/api/products/5/ \
-H "Authorization: Token <token>"
```

---

# 7. Backend Setup Instructions

Navigate to backend:

```
cd backend
```

Install dependencies:

```
pip install django
pip install djangorestframework
```

Apply migrations:

```
python manage.py migrate
```

Run server:

```
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000
```

---

# 8. Frontend Setup Instructions

Navigate to frontend:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Frontend URL:

```
http://localhost:3000
```

---

# 9. Project Folder Structure

```
vendor-product-app
│
├── backend
│   │
│   ├── api
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── backend
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend
│   │
│   ├── app
│   │   ├── register
│   │   ├── login
│   │   ├── dashboard
│   │   ├── add-product
│   │   └── edit-product
│   │
│   ├── package.json
│   └── next.config.ts
│
└── README.md
```

---

# 10. Conclusion

This project demonstrates a full-stack web application built using:

* Django
* Django REST Framework
* Next.js

The system implements secure authentication, vendor-specific product management, and full CRUD functionality.

All required features from the technical assignment have been successfully implemented.
