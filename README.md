# Exercise 2: Simple Product API

# Products API

This is a basic API built using Express.js that demonstrates CRUD operations (Create, Read, Update, Delete) for managing products. The data is stored in memory, making it suitable for demonstration and testing purposes. The API endpoints allow clients to create, retrieve, update, and delete products.

## Table of Contents
- [Endpoints](#endpoints)
  - [GET /health](#health-check)
  - [GET /products](#get-products)
  - [GET /products/:id](#get-product-by-id)
  - [POST /products](#post-product)
  - [PUT /products/:id](#put-product)
  - [DELETE /products/:id](#delete-product)

---

## Endpoints

### GET /health
Check the health of the API.

```
Response:
Status: 200 OK
{
    "message": "Server is up and running"
}
```
### GET /products
Retrieve a list of all products.

```
Response:
Status: 200 OK
Body: Array of products
json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 100
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 200
  }
]
```

### GET /products/:id
Retrieve a single product by ID.
```
Parameters:

id (URL parameter): Product ID
Response:

Status: 200 OK if the product is found, 404 Not Found if the product does not exist
Body: Product object
json

{
  "id": 1,
  "name": "Product 1",
  "price": 100
}
```

### POST /products
Create a new product.

```
Request Body:
json

{
  "id": 3,
  "name": "Product 3",
  "price": 150
}
Response:
Status: 201 Created if the product is successfully created, 400 Bad Request if fields are missing
Body: Confirmation message
json

{
  "message": "Product created successfully"
}
```

### PUT /products/:id
Update an existing product.

```
Parameters:
id (URL parameter): Product ID
Request Body:
json

{
  "name": "Updated Product Name",
  "price": 250
}
Response:
Status: 200 OK if the product is successfully updated, 404 Not Found if the product does not exist
Body: Confirmation message with updated product details
json

{
  "message": "Product updated successfully",
  "product": {
    "id": 1,
    "name": "Updated Product Name",
    "price": 250
  }
}
```

### DELETE /products/
Delete a product by ID.

```
Parameters:
id (URL parameter): Product ID
Response:
Status: 204 No Content if the product is successfully deleted, 404 Not Found if the product does not exist
```

This API is a basic implementation designed to work with in-memory data. 

Status Codes
The API uses the following HTTP status codes:

- 200 OK: Request was successful
- 201 Created: Resource was successfully created
- 204 No Content: Resource was successfully deleted
- 400 Bad Request: Request had missing or invalid parameters
- 404 Not Found: Requested resource was not found

