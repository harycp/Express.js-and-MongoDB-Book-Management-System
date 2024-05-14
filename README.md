# Express.js and MongoDB Book Management System

This is a simple project for managing a book collection built using Express.js and MongoDB. This project allows users to create, read, update, and delete book data with ease. It's worth noting that this project doesn't have any styling applied.

## Features

- Add new books to the collection
- View details of each book
- Edit existing book information
- Delete books from the collection
- Filter books by genre

## Technologies Used

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A source-available cross-platform document-oriented database program, classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **EJS**: Embedded JavaScript templating. EJS lets you generate HTML markup with plain JavaScript.
- **Method-Override**: Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harycp/Express.js-and-MongoDB-Book-Management-System.git
   
2. Install dependencies: :
   ```bash
   npm install

3. Start MongoDB server:
   Ensure MongoDB is installed and running on your system. If not, download and install it from the official website.

4. Seed the database (optional):
   To populate the database with sample data, run:
   ```bash
   node seeds.js

5. Start the application:
   ```bash
   node index.js

6. Open your browser and navigate to http://localhost:8080 to see the application in action.

## Usage

**Add a New Book**

1. Navigate to `/books/create` in your browser.
2. Fill out the form with book details.
3. Click "Create" to add the book to the collection.

**View All Books**

1. Navigate to `/books` in your browser.
2. You will see a list of all books in the collection.

**View Book Details**

1. From the list of books, click on the "details" link next to a book to view its details.

**Edit a Book**

1. From the book details page, click the "Edit" button.
2. Update the book information in the form.
3. Click "Edit" to save the changes.

**Delete a Book**

1. From the book details page, click the "Delete" button.
2. The book will be removed from the collection.

## Directory Structure
```bash
.
├── index.js              # Main server file
├── seeds.js              # Script to seed the database with initial data
├── models
│   └── books.js          # Mongoose model for books
├── views
│   ├── create.ejs        # View for creating a new book
│   ├── edit.ejs          # View for editing an existing book
│   ├── index.ejs         # View for listing all books
│   └── show.ejs          # View for showing details of a single book
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation


