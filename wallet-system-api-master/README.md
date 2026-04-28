# Wallet System API

A robust and scalable wallet system API built with NestJS, MongoDB, and Docker. This system allows users to manage their digital wallets, perform transactions, and track their balance.

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Modules Overview](#modules-overview)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Development](#development)

## Features

- User account management
- Wallet operations (create, view balance)
- Transaction processing (top-up, charge)
- MongoDB transaction support
- Swagger API documentation
- Docker containerization
- GitHub Actions CI/CD pipeline

## System Architecture

The application follows a modular architecture with the following main components:

### Core Modules

1. **User Accounts Module**

   - Account creation and management
   - Balance tracking and updates
   - Secure balance modification

2. **Account Transactions Module**

   - Transaction processing
   - Support for top-up and charge operations
   - Transaction history tracking
   - Atomic operations using MongoDB transactions

3. **Users Module**
   - User management
   - User profile operations

### Common Components

- **Base Repository**: Generic CRUD operations
- **Configuration Management**: Environment-based configuration
- **Swagger Documentation**: API documentation and testing

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- MongoDB (handled via Docker)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wallet-system-api
   ```

2. **Start the application using docker compose**

   ```bash
   docker-compose up -d
   ```

   This will start:

   - MongoDB with replica set configuration
   - API application

3. **Access the API**
   - API: http://localhost:3000/api/v1
   - Swagger Documentation: http://localhost:3000/docs

## API Documentation

### User Accounts

- **POST** `/api/v1/user-accounts`

  - Create a new user account
  - Request body: `{ "userId": string }`

- **GET** `/api/v1/user-accounts/my-account/:userId`
  - Get account details
  - URL params: `userId`

### Account Transactions

- **POST** `/api/v1/account-transactions`
  - Handle transactions (top-up/charge)
  - Request body:
    ```json
    {
      "userId": string,
      "amount": number,
      "transactionId": string,
      "type": "top-up" | "charge"
    }
    ```

## Modules Overview

### User Accounts Module

- Handles wallet account creation and management
- Manages account balance updates
- Implements secure balance modification with MongoDB transactions

### Account Transactions Module

- Processes financial transactions
- Ensures atomic operations using MongoDB transactions
- Prevents duplicate transactions
- Validates sufficient balance for charges

### Users Module

- Manages user profiles and authentication
- Handles user-related operations

## Database Schema

### UserAccount Collection

```typescript
{
  _id: ObjectId,
  userId: string,
  balance: number,
  createdAt: Date,
  updatedAt: Date
}
```

### AccountTransaction Collection

```typescript
{
  _id: ObjectId,
  userId: string,
  type: string,
  amount: number,
  transactionId: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate transaction
- **500 Internal Server Error**: Server-side errors

## Development

### Local Development Using Docker

1. Run the following command:

   ```bash
   docker compose up -d
   ```

2. Access the API at: http://localhost:3000/api/v1

### Production API Swagger Doc

1. Access the Swagger doc at: https://8tdbsqaccy.eu-central-1.awsapprunner.com/docs#/

### Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### CI/CD

The project includes GitHub Actions workflows for:

- Automated testing
- Building Docker images
- Deploying to staging environment

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
