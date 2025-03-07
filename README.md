# AL.bank - Online Banking Application

A full-stack online banking application built with React.js and Node.js, featuring secure authentication, account management, funds transfer, and transaction tracking.

![AL.bank Screenshot](https://via.placeholder.com/800x400)

## About AL.bank

AL.bank is a modern web-based banking platform that provides users with a secure and intuitive interface to manage their finances. Built with a React frontend and Node.js backend, the application leverages JWT authentication, PostgreSQL database, and RESTful APIs to deliver a seamless banking experience.

## Features

- 🔐 Secure user authentication with JWT
- 💳 Account creation and management
- 💸 Money transfers between accounts
- 📊 Transaction history and account analytics
- 📱 Responsive design for all device sizes
- 🔒 User profile and security settings

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Context API for state management
- CSS for styling
- React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL with Sequelize ORM
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
al-bank/
├── .idea/                 # IDE configuration
├── .vscode/               # VS Code settings
├── client/                # React frontend
│   ├── node_modules/      # Frontend dependencies
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── helpers/       # Utility functions and services
│   │   ├── pages/         # Page components
│   │   ├── App.css        # Application styles
│   │   ├── App.js         # Main application component
│   │   ├── index.css      # Global styles
│   │   ├── index.js       # Entry point
│   │   └── reportWebVitals.js # Performance measuring
│   ├── .gitignore         # Git ignore file
│   ├── package-lock.json  # Dependencies lock file
│   ├── package.json       # Frontend package configuration
│   └── README.md          # Frontend documentation
│
├── server/                # Node.js backend
│   ├── config/            # Configuration settings
│   ├── middlewares/       # Custom middleware
│   ├── models/            # Sequelize models
│   ├── node_modules/      # Backend dependencies
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   ├── package-lock.json  # Dependencies lock file
│   ├── package.json       # Backend package configuration
│   └── LICENSE            # License information
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/KfcEnjoyer/online-banking
   cd online-banking
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   
   # Create a .env file with the following variables
   # DATABASE_URL=postgres://username:password@localhost:5432/albank
   # JWT_SECRET=your_jwt_secret_key
   # PORT=3001
   
   # Initialize the database
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   
   # Start the server
   npm start
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   
   # Start the React application
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. When a user logs in, the server validates credentials and issues a JWT
2. The token is stored in localStorage and included in the Authorization header for subsequent requests
3. Protected routes on the server validate the token before processing requests
4. Token expiration is handled with automatic logout

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `GET /auth/verify` - Verify JWT token

### User Management
- `GET /profile` - Get user profile
- `PUT /profile/update` - Update user profile
- `PUT /profile/password` - Change password

### Accounts
- `POST /openaccount` - Create a new account
- `GET /openaccount/get` - Get all user accounts
- `GET /account/:accountNumber` - Get specific account details

### Transactions
- `POST /transfer` - Transfer funds between accounts
- `POST /deposit` - Deposit funds
- `GET /transactions/:accountNumber` - Get account transactions
- `GET /transactions/history` - Get transaction history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Considerations

- All passwords are hashed using bcrypt
- Sensitive routes are protected with JWT authentication
- Input validation is performed on both client and server
- CSRF protection is implemented
- Rate limiting is applied to prevent brute force attacks
- Database queries are parameterized to prevent SQL injection
- Secure HTTP headers are implemented

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Key Features

- **Secure Authentication**: JWT-based authentication system with password hashing
- **Account Management**: Create and manage multiple account types (checking, savings, investment)
- **Fund Transfers**: Transfer money between personal accounts or to other users
- **Transaction History**: View detailed transaction records with filtering options
- **Profile Management**: Update personal information and security settings
- **Responsive Design**: Optimized user interface for desktop and mobile devices

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
