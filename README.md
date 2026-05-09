# Sunnah Stream - E-Commerce Platform

Sunnah Stream is a modern Islamic e-commerce platform built with React, Node.js, and MongoDB. It features a complete user flow from browsing products to checkout and order management, as well as an admin dashboard for product and order management.

## Features

### Customer Features
- **Product Discovery**: Browse a catalog of products with detailed pages.
- **Shopping Cart**: Add, remove, and update quantities of items in the cart.
- **User Authentication**: Secure login and registration.
- **Order Management**: View order history and track current orders.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Admin Features
- **Dashboard Overview**: View key metrics like total products, orders, and users.
- **Product Management**: Add new products and edit existing ones.
- **Order Management**: View all orders and update their status.
- **User Management**: Manage registered users on the platform.

## Tech Stack

### Frontend
- **React**: UI library for building the user interface.
- **Redux Toolkit**: State management.
- **React Router**: Navigation.
- **Framer Motion**: Animations and transitions.
- **Tailwind CSS**: Styling.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: ODM for MongoDB.
- **Bcrypt.js**: Password hashing.
- **JSON Web Tokens (JWT)**: Authentication.

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd sunnah_stream
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
    Start the server:
    ```bash
    npm start
    ```

3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    ```
    Start the development server:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

```
sunnah_stream/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   ├── config.js    # API configuration
│   │   └── App.jsx      # Main application component
│   └── package.json
├── backend/           # Node.js/Express application
│   ├── routes/        # API routes
│   ├── models/        # Mongoose models
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Middleware (e.g., auth)
│   ├── .env           # Environment variables
│   └── package.json
└── README.md
```

## Usage

### Default Credentials

**Admin User**:
- **Email**: [EMAIL_ADDRESS]`
- **Password**: `admin123`

**Regular User**:
- **Email**: [EMAIL_ADDRESS]`
- **Password**: `user123`

### Running Tests

You can run tests for both frontend and backend.

**Backend Tests**:
```bash
cd backend
npm test
```

**Frontend Tests**:
```bash
cd frontend
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
