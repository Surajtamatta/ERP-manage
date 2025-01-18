# Mini ERP System for Product Management

## Project Overview
The **Mini ERP System for Product Management** is a full-stack application built with **Next.js** and **PostgreSQL**. This system enables users to manage products, handle sales orders, and generate sales reports. It covers the following core functionalities:

- **Product Management**: CRUD operations for managing products.
- **Sales Order Management**: Create, update, and view sales orders with order items.
- **Sales Summary Report**: Generate a report summarizing sales data, including total orders, total revenue, top products, and sales by order status.

This project was developed as a practical test for a Next.js developer intern.

## Technologies Used
- **Next.js**: React framework for building the web application.
- **React**: Library for building UI components with hooks for state management.
- **PostgreSQL**: Relational database to store product, order, and report data.
- **Prisma**: ORM for interacting with PostgreSQL database.
- **Tailwind CSS**: Utility-first CSS framework for styling the app.
- **ShadCN**: Used for UI components and modal handling.
- **React Hook Form**: For managing form state and validation.
- **Yup**: For schema validation on form inputs.
- **React Icons**: For adding icons to the UI components.

## Setup and Installation

### Prerequisites
Make sure the following are installed:
- Node.js (version 14 or above)
- PostgreSQL database (or an accessible PostgreSQL instance)

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mini-erp-project.git
   cd mini-erp-project ```

2. **Install dependencies**:
  ```bash  
  npm install
  ```
3. ** Set up the environment variables**:
    - Create a `.env` file at the root of the project.
    - Populate it with the required values (database connection, etc.) from the `.env.example` file.

4. **Run database migrations**:

Run the following command to apply the migrations to your database:

```bash
npx prisma migrate dev
```
5. **Start the development server**:
```bash
npm run dev
```
6. **Access the application**:
Open your web browser and navigate to `http://localhost:3000` to access the application


## API Documentation

### Product API
- **GET /api/products**: List all products.
- **GET /api/products/[id]**: Get a specific product by ID.
- **POST /api/products**: Create a new product.
- **PUT /api/products/[id]**: Update an existing product by ID.
- **DELETE /api/products/[id]**: Delete a product by ID.

### Sales Order API
- **POST /api/sales-orders**: Create a new sales order.
- **GET /api/sales-orders**: List all sales orders.
- **GET /api/sales-orders/[id]**: View a specific sales order by ID.
- **PUT /api/sales-orders/[id]**: Update the status of a sales order.

### Report API
- **GET /api/reports/sales-summary**: Generate a sales summary report, including:
  - Total number of orders
  - Total sales amount
  - Top 5 selling products by quantity and revenue
  - Sales by status (pending, completed, cancelled)

## Postman API Link
You can access the full API documentation and test the endpoints via Postman:
[Postman API Documentation](https://team11-9575.postman.co/workspace/ERP~ec394b7c-2933-4e02-8d0d-6a5bdb156bac/request/28730063-5480bf40-1c1c-41d2-9551-832f620952f2?action=share&creator=28730063&ctx=documentation)

---

Feel free to explore the API through Postman and use it to interact with the backend.