Library Management System
A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack to manage library operations. This system provides distinct functionalities for two user roles: Admin and User, allowing for efficient management of books, memberships, and transactions.

Features
The application is designed based on a detailed set of requirements, providing a complete workflow for a modern library.

🔑 Authentication & User Roles
Dual Login Pages: Separate, toggleable login forms for Users and Admins.

Public Signup: Users can sign up for a 'User' or 'Admin' account.

Role-Based Access Control:

Admins have full access to all modules, including Maintenance, Reports, and Transactions.

Users (library members) can access Reports and Transactions but cannot perform administrative maintenance tasks.

Secure Routing: Frontend routes are protected to prevent unauthorized access.

Transactions Module
Check Book Availability: Users can search the library's catalog to see if a book is available.

Issue Book: Logged-in users can issue available books. The system pre-fills dates and validates the transaction.

Return Book: Users can view a list of books they have personally borrowed and initiate a return.

Pay Fine: If a book is returned after its due date, the system automatically calculates the fine. The user is then guided to a page to confirm fine payment and complete the return process.

📋 Reports Module
Master Lists: View comprehensive lists of all items in the library's database.

Master List of Books

Master List of Movies

Master List of Memberships

Transaction Reports: Track the status of library items.

Active Issues: See all books and movies that are currently checked out.

Overdue Returns: Get a list of all items that have passed their due date.

⚙️ Admin Maintenance Module
Add Books/Movies: Admins can add new items to the library's catalog. The form allows adding multiple copies at once, automatically generating a unique serial number for each copy.

Add Memberships: Admins can register new library members. This process automatically creates a new 'User' account for the member with a default password and links it to their membership details.

Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

State Management: React Context API

API Communication: Axios

Project Structure
The project is organized into two main directories:

/
├── backend/      # Node.js & Express server, API routes, controllers, models
└── frontend/     # React application, components, pages, context

Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Node.js (which includes npm)

MongoDB (make sure the MongoDB server is running)

Setup and Installation
Follow these steps to get the application running locally:

1. Clone the Repository
git clone <your-repository-url>
cd library-management-system

2. Backend Setup
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# and add the following variables:
MONGO_URI=mongodb://127.0.0.1:27017/libraryDB
JWT_SECRET=your_jwt_secret_key_12345
PORT=5000

# Start the backend server
npm run dev

The server will be running on http://localhost:5000.

3. Frontend Setup
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start

The application will open in your browser at http://localhost:3000.

How to Use
Sign Up: Navigate to the login page and click "Sign up here". Create an Admin account first.

Log In as Admin: Log in with your new admin credentials.

Add Members and Books: Use the Maintenance module to add a few library members and some books to the catalog.

Log Out and Log In as User: Log out and then log in using the credentials of a member you just created (the default password is password123).

Perform Transactions: As a user, you can now navigate to the Transactions module to issue and return the books you added.