
# Project ReadMe

## Overview
This project provides a simple API using domain driven development to manage **Products** and **Users**. The routes include functionality for crud operations on both entities.

---

## Prerequisites

- **Node.js** installed.
- **Express.js** framework.
- A **MongoDB** instance running locally or on the cloud.

---

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your MongoDB connection in the `.env` file.
4. Start the application:
   ```bash
   npm start
   ```

---

## API Documentation

### Base URL
`http://localhost:<PORT>` (default is `http://localhost:3000`)

---

### **User Routes**

#### 1. **Add User**
- **Endpoint**: `POST /users`
- **Body**:
  ```json
  {
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response**:
  - **Success**: `201 Created`
    ```json
    {
      "message": "User added successfully"
    }
    ```
  - **Failure**: `400 Bad Request` or `500 Internal Server Error`

---

#### 2. **Remove User**
- **Endpoint**: `DELETE /users/:userId`
- **Params**:
  - `userId` (MongoDB ObjectId or email)
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "User removed successfully"
    }
    ```
  - **Failure**: `404 Not Found` or `400 Bad Request`

---

#### 3. **Update User**
- **Endpoint**: `PUT /users/:userId`
- **Params**:
  - `userId` (MongoDB ObjectId or email)
- **Body**:
  ```json
  {
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@update.com"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "User updated successfully"
    }
    ```
  - **Failure**: `404 Not Found` or `400 Bad Request`

---

#### 4. **Get All Users**
- **Endpoint**: `GET /users`
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "users": [
        {
          "_id": "abc123",
          "fname": "John",
          "lname": "Doe",
          "email": "john.doe@example.com"
        }
      ]
    }
    ```

---

#### 5. **Get User by ID**
- **Endpoint**: `GET /users/:userId`
- **Params**:
  - `userId` (MongoDB ObjectId or email)
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "user": {
        "_id": "abc123",
        "fname": "John",
        "lname": "Doe",
        "email": "john.doe@example.com"
      }
    }
    ```
  - **Failure**: `404 Not Found` or `400 Bad Request`

---

### **Product Routes**

#### 1. **Add Product**
- **Endpoint**: `POST /products`
- **Body**:
  ```json
  {
    "name": "Product Name",
    "price": 99.99,
    "desc": "Product Description"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Product added successfully"
    }
    ```
  - **Failure**: `400 Bad Request` or `500 Internal Server Error`

---

#### 2. **Remove Product**
- **Endpoint**: `DELETE /products/:productId`
- **Params**:
  - `productId` (MongoDB ObjectId)
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Product removed successfully"
    }
    ```
  - **Failure**: `404 Not Found` or `400 Bad Request`

---

#### 3. **Update Product**
- **Endpoint**: `PUT /products/:productId`
- **Params**:
  - `productId` (MongoDB ObjectId)
- **Body**:
  ```json
  {
    "name": "Updated Product Name",
    "price": 79.99,
    "desc": "Updated Description"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Product updated successfully"
    }
    ```
  - **Failure**: `404 Not Found` or `400 Bad Request`

---

#### 4. **Get All Products**
- **Endpoint**: `GET /products`
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "products": [
        {
          "_id": "abc123",
          "name": "Product Name",
          "price": 99.99,
          "desc": "Product Description"
        }
      ]
    }
    ```

---

#### 5. **Get Product by ID**
- **Endpoint**: `GET /products/:productId`
- **Params**:
  - `productId` (MongoDB ObjectId)
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "product": {
        "_id": "abc123",
        "name": "Product Name",
        "price": 99.99,
        "desc": "Product Description"
      }
    }
    ```
  - **Failure**: `404 Not Found` or `400 Bad Request`

---

## Validation Rules

### User Validation
- **First Name & Last Name**: Must be valid strings with no special characters.
- **Email**: Must be a valid email format and not already exist in the system.

### Product Validation
- **Name**: Must be a valid string.
- **Price**: Must be a number.
- **Description**: Must be a valid string.

---

## Status Codes

- **200 OK**: Request processed successfully.
- **201 Created**: Resource successfully created.
- **400 Bad Request**: Invalid input or missing parameters.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

---
