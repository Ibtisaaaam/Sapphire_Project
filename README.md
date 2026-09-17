# Sapphire E-Commerce Platform - Capstone Project Proposal

## 1. Project Overview
The Sapphire E-Commerce Platform is a full-stack web application designed to provide a seamless online shopping experience for customers and a robust management system for administrators. The platform supports user authentication, product catalog browsing, cart management, order placement, and an admin dashboard for managing inventory and orders.

## 2. User Roles & Features
### **Customer / User:**
* **Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
* **Product Catalog:** Browse available products with detailed views (title, description, price, stock).
* **Order Management:** Place orders and view personal order history.

### **Admin:**
* **Admin Dashboard:** Access control to manage store operations.
* **Product Management:** Add, update, and delete products from the inventory.
* **Order Oversight:** View all customer orders and update their statuses (Pending, Processing, Delivered).

## 3. Tech Stack
* **Frontend:** React.js, React Router, Axios, Tailwind CSS / CSS
* **Backend:** Node.js, Express.js, JWT, Bcrypt.js
* **Database:** PostgreSQL with Sequelize ORM

## 4. Database Schema (ER Diagram Design)
* **Users Table:** `id`, `name`, `email`, `password`, `role` (customer/admin), `timestamps`
* **Products Table:** `id`, `title`, `description`, `price`, `stock`, `imageUrl`, `timestamps`
* **Orders Table:** `id`, `userId` (Foreign Key), `totalAmount`, `status`, `timestamps`
* **OrderItems Table:** `id`, `orderId` (Foreign Key), `productId` (Foreign Key), `quantity`, `price`, `timestamps`

## 5. API Endpoints List
### **Auth Routes (`/api/auth`)**
* `POST /register` – Register a new user
* `POST /login` – Authenticate user and return JWT

### **Product Routes (`/api/products`)**
* `GET /` – Retrieve all products
* `GET /:id` – Retrieve a single product by ID
* `POST /` – Add a new product (Admin only)
* `PUT /:id` – Update an existing product (Admin only)
* `DELETE /:id` – Delete a product (Admin only)

### **Order Routes (`/api/orders`)**
* `POST /` – Place a new order (Customer)
* `GET /my-orders` – Get logged-in user's orders (Customer)
* `GET /admin/all` – Get all store orders (Admin only)
* `PUT /admin/:id/status` – Update order status (Admin only)