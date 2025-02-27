# Book Library Tool Backend

This is the backend system for the Royal Library of Belgium's book management tool, built from scratch using NodeJS (TypeScript), ExpressJS, and MongoDB. The system manages a library with 100 million book references and supports 50,000 users, enabling stock management, online browsing, and book reservations.

## Features Checklist

- **Reference Management**
  - [ ] GET a book reference by ID
  - [x] ADD a new book reference
  - [ ] DELETE a book reference
- **Catalog Search**
  - [ ] Search books by publication year
  - [ ] Search books by title
  - [ ] Search books by author
- **Reservation & Borrowing System**
  - [ ] Users can reserve/borrow books online (4 copies per reference)
  - [ ] Limit: Max 3 books per user, no duplicate references
  - [ ] Track book availability
  - [ ] Retrieve reservation history
  - [ ] Charge 3€ per reservation
- **Reminders**
  - [ ] Email notification 2 days before due date
  - [ ] Email reminder 7 days after due date for late returns
- **Wallet System**
  - [ ] User wallet with balance for borrowing
  - [ ] Late fee: 0.2€ per day for overdue books
  - [ ] Auto-purchase: If late fees reach book retail price, user buys it
- **Data Seeding**
  - [ ] Seed book references from `books_sample.csv`
  - [ ] Mock user data with defined schemas
- **Documentation**
  - [ ] Document API endpoints 

## Tech Stack

- NodeJS with TypeScript: Backend runtime and type safety
- ExpressJS: API framework
- MongoDB: Database for storing books, users, and reservations

## Setup

1. **Prerequisites**
   - Node.js (v16 or higher)
   - MongoDB (local or cloud instance)
   - npm or yarn

2. **Installation**
   ```
   git clone <repository-url>
   cd book-library-tool
   npm install
    ```
3. **Environment Variables**
Create a `.env` file in the root directory with:
```
MONGO_URI=mongodb://localhost:27017/book_library
PORT=3000
```

4. **Seed Data**
Run the seeding script to populate books from `books_sample.csv`:
````
npm run seed
````
5. **Start the Server**

Run the server using:
````
npm run dev
````

## Testing

Run the test suite using:
````
npm run test
````
