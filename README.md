
### 📘 README: Library Management API

````markdown
# 📚 Library Management API

A RESTful API built with Node.js and Express for managing library books and borrowing operations. It supports full CRUD operations on books and basic borrowing functionalities.

## 🧭 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## 📖 Introduction

This project provides an API for managing a library system. It allows you to add, view, update, and delete books, as well as record and retrieve book borrowing data.

## ✨ Features

- 📚 Book management (CRUD)
- 🔄 Borrowing system
- 📁 RESTful routing using Express
- 📦 Modular controller structure

## 🔗 API Endpoints

### 📘 Book Routes

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/books`              | Create a new book       |
| GET    | `/books/:bookId`      | Get a single book       |
| GET    | `/books`              | List all books          |
| PATCH  | `/books/:bookId`      | Update book details     |
| DELETE | `/books/:bookId`      | Delete a book           |

### 📕 Borrow Routes

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/borrow`        | Borrow a book              |
| GET    | `/borrow`        | Get all borrow records     |

## 🛠️ Installation

### Requirements

- Node.js >= 14.x
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/jubayer718/library-management_API.git

# Navigate to the project folder
cd library-management-api

# Install dependencies
npm install
````

## ▶️ Usage

```bash
# Start the server
npm start
```

The server will run by default on `http://localhost:8000/` or the port defined in `.env`.

## 📦 Dependencies

* express
* dotenv
* body-parser
* mongoose (if using MongoDB)
* cors (optional)

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
Example

PORT=8000
DATABASE_URL=mongodb://localhost:27017/library
```

Update `app.js` or `server.js` to read environment variables from `.env`.

## 📊 Examples

### 📘 Create Book

```http
POST /books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884"
}
```

### 🔄 Borrow Book

```http
POST /borrow
Content-Type: application/json

{
  "bookId": "60f7b2a6e65f4a1f88e2c123",
  "borrowerName": "John Doe",
  "borrowDate": "2025-06-20"
}
```

## 🧪 Troubleshooting

| Problem               | Solution                       |
| --------------------- | ------------------------------ |
| App not starting      | Check `.env` and DB connection |
| 404 errors            | Ensure correct route used      |
| MongoDB not connected | Check `DATABASE_URL`           |

## 👨‍💻 Contributors

* [Jubayer Ahmed](https://github.com/jubayer718)
