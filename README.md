# 🍔 FoodHub Backend

A robust and scalable backend API for a food delivery platform built with Node.js, Express, TypeScript, and Prisma.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://backend-foodhub-mrashed21.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

FoodHub Backend is a comprehensive RESTful API that powers a food delivery platform. It handles user authentication, restaurant management, menu operations, order processing, and delivery tracking. Built with modern technologies and best practices, it ensures scalability, security, and performance.

## ✨ Features

- 🔐 **User Authentication & Authorization** - JWT-based authentication with role-based access control
- 👥 **User Management** - Customer, restaurant owner, and delivery personnel profiles
- 🏪 **Restaurant Management** - CRUD operations for restaurants and their details
- 📋 **Menu Management** - Manage food items, categories, pricing, and availability
- 🛒 **Order Processing** - Real-time order placement, tracking, and status updates
- 💳 **Payment Integration** - Secure payment processing (ready for integration)
- 🚚 **Delivery Tracking** - Real-time delivery status and location tracking
- ⭐ **Reviews & Ratings** - Customer feedback and restaurant ratings
- 🔍 **Advanced Search** - Search and filter restaurants and menu items
- 📊 **Analytics Dashboard** - Order statistics and business insights

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL / MySQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod / Joi
- **API Documentation:** Swagger / Postman
- **Deployment:** Vercel

## 📁 Project Structure

```
foodhub-backend/
├── api/                    # API routes entry point
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Prisma schema file
│   └── migrations/        # Database migrations
├── src/                   # Source code
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares (auth, validation, error handling)
│   ├── models/           # Data models and types
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── index.ts          # Application entry point
├── .gitignore            # Git ignore file
├── package.json          # NPM dependencies
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL / MySQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mrashed21/foodhub-backend.git
   cd foodhub-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5000
   NODE_ENV=development
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
Production: https://backend-foodhub-mrashed21.vercel.app/
Development: http://localhost:5000
```

### Main Endpoints

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

#### Restaurants

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create new restaurant (Owner only)
- `PUT /api/restaurants/:id` - Update restaurant (Owner only)
- `DELETE /api/restaurants/:id` - Delete restaurant (Owner only)

#### Menu

- `GET /api/menu/:restaurantId` - Get restaurant menu
- `POST /api/menu` - Add menu item (Owner only)
- `PUT /api/menu/:id` - Update menu item (Owner only)
- `DELETE /api/menu/:id` - Delete menu item (Owner only)

#### Orders

- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Cancel order

#### Reviews

- `GET /api/reviews/:restaurantId` - Get restaurant reviews
- `POST /api/reviews` - Add review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

For detailed API documentation, visit the [Postman Collection](link-to-postman-collection) or run the server and access `/api-docs` for Swagger documentation.

## 🗄️ Database Schema

The application uses Prisma ORM with the following main models:

- **User** - User accounts (customers, restaurant owners, delivery personnel)
- **Restaurant** - Restaurant information and details
- **MenuItem** - Food items available in restaurants
- **Order** - Customer orders
- **OrderItem** - Individual items in an order
- **Review** - Customer reviews and ratings
- **Delivery** - Delivery tracking information

For detailed schema, check `prisma/schema.prisma`

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/foodhub"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV=development

# Optional: Payment Gateway
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# Optional: Email Service
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-email-password"

# Optional: Cloud Storage (for images)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 🌐 Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` file is already configured for optimal deployment.

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Write comments for complex logic
- Keep functions small and focused
- Follow existing code structure

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**M Rashed**

- GitHub: [@mrashed21](https://github.com/mrashed21)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by modern food delivery platforms
- Built with amazing open-source technologies

## 📧 Contact

For any queries or support, please reach out:

- Create an issue in the repository
- Email: [your-email@example.com]

---

**Live API:** [https://backend-foodhub-mrashed21.vercel.app/](https://backend-foodhub-mrashed21.vercel.app/)
