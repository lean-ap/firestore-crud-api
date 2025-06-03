A modular Node.js + TypeScript API using Firebase Firestore via the Firebase Admin SDK.  
This API supports CRUD operations on a `Product` collection.

---

## Project Structure
```
api/
├── src/
│   ├── db.ts # Firestore DB initialization
│   ├── index.ts # Express server entry point
│   ├── models/
│   │   └── Products.ts # Product data model
│   └── routes/
│       └── products/
│           ├── index.ts  #Products route declarations
│           └── productsController.ts # CRUD route handlers
├── serviceAccountKey.json # Firebase service account key(NO COMMIT)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
---

## Features

- Built with **Express** and **TypeScript**
- Uses **Cloud Firestore** for data storage
- Fully modular and scalable structure
- Implements full CRUD operations for products

---

## Setup Instructions

### 1. Clone the repo and enter project folder

git clone https://github.com/yourusername/firestore-ts-api.git
cd firestore-ts-api/api

### 2. Install dependencies
npm install

### 3. Setup Firebase service account

Go to Firebase Console

Select or create a Firebase project

Navigate to Project Settings → Service Accounts

Generate a new private key and download the JSON file

Save it as serviceAccountKey.json inside the api/ folder

### 4. Run the development server

npx ts-node-dev src/index.ts

By default, the server runs on: http://localhost:3000


### API Endpoints
Method	Endpoint	    Description
POST	/products	    Create a new product
GET	    /products	    List all products
GET	    /products/:id	Get a product by ID
PUT	    /products/:id	Update a product
DELETE	/products/:id	Delete a product


### Sample json Payload
{
  "name": "Mechanical Keyboard",
  "price": 99.99,
  "inStock": true
}