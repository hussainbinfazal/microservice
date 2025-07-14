# Microservices E-Commerce Platform

A scalable microservices-based e-commerce platform built with Node.js, TypeScript, Express, MongoDB, and Docker.

## Architecture

This project follows a microservices architecture with the following services:

- **API Gateway** (Port 3000) - Routes requests to appropriate services
- **Auth Service** (Port 3001) - Handles user authentication and authorization
- **Product Service** (Port 3002) - Manages product operations
- **Frontend** - Next.js application
- **MongoDB** - Database for all services

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd micro2
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

3. **Start with Docker**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - API Gateway: http://localhost:3000
   - Auth Service: http://localhost:3001
   - Product Service: http://localhost:3002
   - MongoDB: localhost:27017

## API Documentation

### Authentication Service (Port 3001)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get User by ID
```http
GET /auth/:id
```

### Product Service (Port 3002)

**Note:** All product endpoints require authentication. Include the JWT token in the Authorization header.

#### Register Product
```http
POST /product/register-product
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "electronics"
}
```

#### Update Product
```http
PUT /product/update-product
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "id": "product_id",
  "name": "Updated Product Name",
  "price": 149.99
}
```

#### Get Product by ID
```http
GET /product/get-product/:id
Authorization: Bearer <your-jwt-token>
```

### API Gateway (Port 3000)

The gateway routes requests to appropriate services:
- `/auth/*` → Auth Service (Port 3001)
- `/product/*` → Product Service (Port 3002)

#### Example Usage via Gateway
```http
POST http://localhost:3000/auth/login
POST http://localhost:3000/product/register-product
```

## Development

### Local Development Setup

1. **Install dependencies for each service**
   ```bash
   cd backend/auth-service && npm install
   cd ../product-service && npm install
   cd ../gateway && npm install
   cd ../../frontend && npm install
   ```

2. **Start MongoDB**
   ```bash
   docker run -d -p 27017:27017 --name mongo mongo:6
   ```

3. **Start services individually**
   ```bash
   # Terminal 1 - Auth Service
   cd backend/auth-service && npm run dev

   # Terminal 2 - Product Service
   cd backend/product-service && npm run dev

   # Terminal 3 - Gateway
   cd backend/gateway && npm run dev

   # Terminal 4 - Frontend
   cd frontend && npm run dev
   ```

### Docker Development

For development with live reloading:
```bash
docker-compose -f docker-compose.yml up --build
```

## Project Structure

```
micro2/
├── backend/
│   ├── auth-service/          # User authentication service
│   │   ├── controller/        # Route controllers
│   │   ├── model/            # Database models
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Custom middlewares
│   │   └── utils/            # Utility functions
│   ├── product-service/      # Product management service
│   │   ├── controller/       # Route controllers
│   │   ├── model/           # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Custom middlewares
│   │   └── utils/           # Utility functions
│   ├── gateway/             # API Gateway
│   └── shared/              # Shared utilities
├── frontend/                # Next.js frontend application
├── docker-compose.yml       # Docker services configuration
└── .env                    # Environment variables
```

## Environment Variables


```

## Authentication Flow

1. Register/Login via `/auth/register` or `/auth/login`
2. Receive JWT token in response
3. Include token in Authorization header for protected routes
4. Token format: `Bearer <your-jwt-token>`

## Testing the APIs

### Using cURL

1. **Register a user**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Create a product** (replace TOKEN with actual JWT)
   ```bash
   curl -X POST http://localhost:3000/product/register-product \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"name":"Test Product","description":"A test product","price":29.99}'
   ```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   docker-compose down
   docker system prune -f
   ```

2. **MongoDB connection issues**
   - Ensure MongoDB container is running
   - Check MONGODB_URI in .env file

3. **Service not found errors**
   - Verify all services are running
   - Check docker-compose logs: `docker-compose logs <service-name>`

### Logs

View logs for specific services:
```bash
docker-compose logs auth-service
docker-compose logs product-service
docker-compose logs gateway
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.