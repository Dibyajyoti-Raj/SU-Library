📚 Library Management System (MERN)
A full-stack Library Management System built with the MERN stack (MongoDB, Express.js, React, Node.js).
The system allows users to sign up/login, search books by genre, borrow books, and manage their own dashboard.
Admins can add, update, and delete books.

🚀 Features
👤 User
Login / Signup (JWT authentication)
Search & filter books by title, author, genre
Borrow books
View borrowed books on dashboard

📚 Books
Add new books (Admin only)
Update book details (Admin only)
Delete books (Admin only)
View all books

🛠️ Tech Stack
Frontend (React + Tailwind CSS)
React Router DOM (routing)
Axios (API calls)
Tailwind CSS (styling)
Backend (Node.js + Express.js)
Express.js (API framework)
MongoDB Atlas (cloud database)
Mongoose (ODM for MongoDB)

Express middleware for validation & error handling

Database

MongoDB Atlas (Cloud)

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/SU-Library.git
cd SU-Library

2. Backend Setup
cd server
npm install

Create a .env file in the backend directory:
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

Run the backend:
npm start

3. Frontend Setup
cd client
npm install
npm start

🌐 API Endpoints
🏠 Home
GET / → Home route (test API working)

📚 Books
POST /books → Add a new book (Admin only)
GET /books → Get all books or filter by query (e.g. ?genre=Fiction)
GET /books/:id → Get book details by ID
PUT /books/:id → Update book details (Admin only)
DELETE /books/:id → Delete a book (Admin only)

👩‍🎓 Students
POST /students → Register a new student (Signup)
GET /students → Get all students (Admin only)
POST /login → Student login
