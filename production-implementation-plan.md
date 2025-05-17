# WhatsForDinner.com - Production Implementation Plan

## Overview
This document outlines the comprehensive implementation plan for transforming the food voting and restaurant ordering app into a production-ready application with the domain name whatsfordinner.com. The plan follows the prioritization specified by the client:

1. Backend Architecture & Database Design
2. User Authentication & Security
3. Enhanced Visual Design
4. Real-time Communication System
5. Deployment Strategy

## 1. Backend Architecture & Database Design

### 1.1 System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client         │     │  API Server     │     │  Databases      │
│  (Next.js)      │◄────┤  (Node.js/      │◄────┤  - MongoDB      │
│                 │     │   Express)      │     │  - PostgreSQL   │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│  WebSocket      │     │  Authentication │
│  Server         │     │  Service        │
│  (Socket.io)    │     │  (JWT/OAuth)    │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

### 1.2 Database Design

#### 1.2.1 MongoDB Schema (Primary Database)

**Users Collection:**
```json
{
  "_id": "ObjectId",
  "email": "String (unique)",
  "password": "String (hashed)",
  "name": "String",
  "role": "String (enum: 'admin', 'user')",
  "socialLogins": [
    {
      "provider": "String",
      "providerId": "String"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Parties Collection:**
```json
{
  "_id": "ObjectId",
  "code": "String (6-digit)",
  "name": "String",
  "type": "String (enum: 'recipe', 'restaurant')",
  "hostId": "ObjectId (ref: Users)",
  "foodChoices": ["String"],
  "restaurant": "String",
  "active": "Boolean",
  "createdAt": "Date",
  "expiresAt": "Date"
}
```

**Votes Collection:**
```json
{
  "_id": "ObjectId",
  "partyId": "ObjectId (ref: Parties)",
  "userId": "ObjectId (ref: Users)",
  "choice": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Orders Collection:**
```json
{
  "_id": "ObjectId",
  "partyId": "ObjectId (ref: Parties)",
  "userId": "ObjectId (ref: Users)",
  "items": [
    {
      "name": "String",
      "price": "Number",
      "quantity": "Number",
      "specialInstructions": "String"
    }
  ],
  "totalAmount": "Number",
  "paymentStatus": "String (enum: 'pending', 'paid')",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Recipes Collection:**
```json
{
  "_id": "ObjectId",
  "name": "String",
  "ingredients": ["String"],
  "instructions": "String",
  "prepTime": "Number (minutes)",
  "cookTime": "Number (minutes)",
  "imageUrl": "String",
  "createdBy": "ObjectId (ref: Users)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### 1.2.2 PostgreSQL Schema (Alternative Database)

**Users Table:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_logins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  provider VARCHAR(50) NOT NULL,
  provider_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Parties Table:**
```sql
CREATE TABLE parties (
  id SERIAL PRIMARY KEY,
  code VARCHAR(6) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  host_id INTEGER REFERENCES users(id),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE TABLE food_choices (
  id SERIAL PRIMARY KEY,
  party_id INTEGER REFERENCES parties(id),
  choice VARCHAR(255) NOT NULL
);
```

**Votes Table:**
```sql
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  party_id INTEGER REFERENCES parties(id),
  user_id INTEGER REFERENCES users(id),
  choice VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Orders Table:**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  party_id INTEGER REFERENCES parties(id),
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  special_instructions TEXT
);
```

**Recipes Table:**
```sql
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  instructions TEXT,
  prep_time INTEGER,
  cook_time INTEGER,
  image_url VARCHAR(255),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  ingredient VARCHAR(255) NOT NULL
);
```

### 1.3 API Endpoints

#### 1.3.1 Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/social` - Login with social provider
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/me` - Update user info
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

#### 1.3.2 Party Endpoints

- `POST /api/parties` - Create a new party
- `GET /api/parties` - Get all parties for current user
- `GET /api/parties/:code` - Get party by code
- `PUT /api/parties/:code` - Update party
- `DELETE /api/parties/:code` - Delete/end party
- `POST /api/parties/:code/join` - Join a party

#### 1.3.3 Voting Endpoints

- `POST /api/parties/:code/votes` - Submit a vote
- `GET /api/parties/:code/votes` - Get all votes for a party
- `PUT /api/parties/:code/votes` - Update a vote
- `GET /api/parties/:code/results` - Get voting results

#### 1.3.4 Order Endpoints

- `POST /api/parties/:code/orders` - Submit an order
- `GET /api/parties/:code/orders` - Get all orders for a party
- `GET /api/parties/:code/orders/:id` - Get specific order
- `PUT /api/parties/:code/orders/:id` - Update an order
- `PUT /api/parties/:code/orders/:id/payment` - Update payment status

#### 1.3.5 Recipe Endpoints

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe

### 1.4 Data Access Layer

We'll implement a repository pattern to abstract database operations:

```javascript
// Example repository for MongoDB
class PartyRepository {
  async create(partyData) {
    const party = new PartyModel(partyData);
    return await party.save();
  }
  
  async findByCode(code) {
    return await PartyModel.findOne({ code });
  }
  
  async update(code, updates) {
    return await PartyModel.findOneAndUpdate(
      { code }, 
      updates, 
      { new: true }
    );
  }
  
  // Additional methods...
}
```

## 2. User Authentication & Security

### 2.1 Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  User       │────►│  Auth       │────►│  JWT Token  │
│  Credentials│     │  Service    │     │  Generation │
│             │     │             │     │             │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                   │
                           ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐
                    │             │     │             │
                    │  Password   │     │  Token      │
                    │  Hashing    │     │  Storage    │
                    │  (bcrypt)   │     │             │
                    │             │     │             │
                    └─────────────┘     └─────────────┘
```

### 2.2 Authentication Implementation

#### 2.2.1 Email/Password Authentication

- Use bcrypt for password hashing
- Implement JWT for stateless authentication
- Set secure, HTTP-only cookies for token storage
- Implement refresh token rotation

```javascript
// Example authentication service
class AuthService {
  async register(email, password, name) {
    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new UserModel({
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    // Generate tokens
    return this.generateTokens(user);
  }
  
  async login(email, password) {
    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Generate tokens
    return this.generateTokens(user);
  }
  
  generateTokens(user) {
    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
  }
}
```

#### 2.2.2 Social Authentication

- Implement OAuth 2.0 for social login providers
- Support Google, Facebook, and Apple login
- Link social accounts to existing email accounts

```javascript
// Example social authentication
async function socialLogin(provider, token) {
  let userData;
  
  // Verify token with provider
  switch (provider) {
    case 'google':
      userData = await verifyGoogleToken(token);
      break;
    case 'facebook':
      userData = await verifyFacebookToken(token);
      break;
    // Other providers...
  }
  
  if (!userData) {
    throw new Error('Invalid social token');
  }
  
  // Find or create user
  let user = await UserModel.findOne({
    $or: [
      { email: userData.email },
      { 'socialLogins.provider': provider, 'socialLogins.providerId': userData.id }
    ]
  });
  
  if (!user) {
    // Create new user
    user = new UserModel({
      email: userData.email,
      name: userData.name,
      password: crypto.randomBytes(16).toString('hex'), // Random password
      socialLogins: [{ provider, providerId: userData.id }]
    });
    await user.save();
  } else if (!user.socialLogins.some(sl => sl.provider === provider)) {
    // Link social account to existing user
    user.socialLogins.push({ provider, providerId: userData.id });
    await user.save();
  }
  
  // Generate tokens
  return generateTokens(user);
}
```

### 2.3 Security Measures

#### 2.3.1 API Security

- Implement rate limiting to prevent brute force attacks
- Add request validation using Joi or similar
- Set up CORS properly for production
- Implement API key authentication for external services

```javascript
// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

app.use('/api/auth/login', authLimiter);
```

#### 2.3.2 Data Security

- Encrypt sensitive data at rest
- Implement proper error handling to prevent information leakage
- Set up database access controls
- Regular security audits and dependency updates

#### 2.3.3 Infrastructure Security

- Set up WAF (Web Application Firewall)
- Implement DDoS protection
- Configure proper SSL/TLS settings
- Regular security scanning and penetration testing

## 3. Enhanced Visual Design

### 3.1 Design System

#### 3.1.1 Color Palette

Primary colors focused on food and warmth:
- Primary: #FF6B35 (Warm Orange)
- Secondary: #4CB944 (Fresh Green)
- Accent: #FFD166 (Sunny Yellow)
- Background: #FFF9F0 (Cream)
- Text: #333333 (Dark Gray)

#### 3.1.2 Typography

- Headings: "Playfair Display" (serif)
- Body: "Open Sans" (sans-serif)
- Accents: "Caveat" (handwritten style)

#### 3.1.3 Imagery

- Background wallpaper featuring families and friends sharing meals
- Food photography for recipe displays
- Illustrated food icons for navigation and buttons
- Warm, inviting scenes of dinner tables and gatherings

### 3.2 UI Components

#### 3.2.1 Landing Page Redesign

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  [Background: Family dinner scene with warm        │
│   lighting and diverse food spread]                │
│                                                    │
│  ┌────────────────────────────────────────────┐   │
│  │                                            │   │
│  │  What's For Dinner?                        │   │
│  │  Decide together. Eat together.            │   │
│  │                                            │   │
│  │  [Host a Dinner] [Join a Dinner]           │   │
│  │                                            │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
└────────────────────────────────────────────────────┘
```

#### 3.2.2 Party Creation Screen

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  [Subtle food pattern background]                  │
│                                                    │
│  Create Your Dinner Party                          │
│                                                    │
│  Party Name: [                    ]                │
│                                                    │
│  What are you deciding?                            │
│  ┌─────────┐           ┌─────────┐                │
│  │ Recipe  │           │Restaurant│                │
│  └─────────┘           └─────────┘                │
│                                                    │
│  [+ Add Food Options]                              │
│                                                    │
│  [Create Party]                                    │
│                                                    │
└────────────────────────────────────────────────────┘
```

#### 3.2.3 Voting Screen

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  [Food-themed background]                          │
│                                                    │
│  Vote for Tonight's Dinner                         │
│                                                    │
│  ┌────────────────────────────────────┐           │
│  │ ○ Pasta Primavera                  │           │
│  └────────────────────────────────────┘           │
│                                                    │
│  ┌────────────────────────────────────┐           │
│  │ ○ Grilled Salmon                   │           │
│  └────────────────────────────────────┘           │
│                                                    │
│  ┌────────────────────────────────────┐           │
│  │ ○ Vegetable Curry                  │           │
│  └────────────────────────────────────┘           │
│                                                    │
│  [Submit Vote]                                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

#### 3.2.4 Host Dashboard

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  [Subtle table setting background]                 │
│                                                    │
│  Party Dashboard: Friday Night Dinner              │
│                                                    │
│  Share Code: 123456                                │
│                                                    │
│  ┌──────────┬───────────┬──────────┐              │
│  │Participants│ Results  │ Recipe   │              │
│  └──────────┴───────────┴──────────┘              │
│                                                    │
│  [Content changes based on selected tab]           │
│                                                    │
│  [End Party]                                       │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 3.3 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: 0-640px
  - Tablet: 641-1024px
  - Desktop: 1025px+
- Optimized images for different screen sizes
- Touch-friendly UI elements

### 3.4 Animation and Interaction

- Subtle animations for state changes
- Loading indicators with food themes (e.g., spinning plate)
- Confetti animation for winning food announcement
- Micro-interactions for buttons and form elements

## 4. Real-time Communication System

### 4.1 WebSocket Architecture

```
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│  Client         │◄────┤  WebSocket      │
│  (Browser)      │     │  Server         │
│                 │     │  (Socket.io)    │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │  Redis          │
                        │  Pub/Sub        │
                        │                 │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │  Event          │
                        │  Handlers       │
                        │                 │
                        └─────────────────┘
```

### 4.2 Socket.io Implementation

```javascript
// Server-side Socket.io setup
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);
  
  // Join party room
  socket.on('join-party', (partyCode) => {
    socket.join(`party:${partyCode}`);
    io.to(`party:${partyCode}`).emit('user-joined', {
      userId: socket.userId,
      timestamp: new Date()
    });
  });
  
  // Leave party room
  socket.on('leave-party', (partyCode) => {
    socket.leave(`party:${partyCode}`);
    io.to(`party:${partyCode}`).emit('user-left', {
      userId: socket.userId,
      timestamp: new Date()
    });
  });
  
  // New vote
  socket.on('new-vote', async ({ partyCode, choice }) => {
    try {
      // Save vote to database
      await voteService.addVote(partyCode, socket.userId, choice);
      
      // Broadcast to party room
      io.to(`party:${partyCode}`).emit('vote-update', {
        userId: socket.userId,
        choice,
        timestamp: new Date()
      });
      
      // Check if all participants have voted
      const allVoted = await voteService.checkAllVoted(partyCode);
      if (allVoted) {
        const results = await voteService.getResults(partyCode);
        io.to(`party:${partyCode}`).emit('voting-complete', results);
      }
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });
  
  // New order
  socket.on('new-order', async ({ partyCode, order }) => {
    try {
      // Save order to database
      const savedOrder = await orderService.addOrder(partyCode, socket.userId, order);
      
      // Broadcast to party room
      io.to(`party:${partyCode}`).emit('order-update', {
        userId: socket.userId,
        order: savedOrder,
        timestamp: new Date()
      });
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });
  
  // Disconnect handler
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});
```

### 4.3 Client-side Implementation

```javascript
// Client-side Socket.io setup
import { io } from 'socket.io-client';

export function useSocket(token) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    if (!token) return;
    
    // Initialize socket
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token }
    });
    
    // Connection events
    socketInstance.on('connect', () => {
      setConnected(true);
      console.log('Connected to socket server');
    });
    
    socketInstance.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from socket server');
    });
    
    socketInstance.on('error', (error) => {
      console.error('Socket error:', error);
    });
    
    setSocket(socketInstance);
    
    // Cleanup
    return () => {
      socketInstance.disconnect();
    };
  }, [token]);
  
  return { socket, connected };
}
```

### 4.4 Real-time Features

#### 4.4.1 Party Updates

- Real-time participant list updates
- Live vote counting
- Instant notification when all votes are in
- Live order status updates

#### 4.4.2 Notifications

- Toast notifications for new participants
- Sound alerts for important events
- Browser notifications (with permission)
- In-app notification center

## 5. Deployment Strategy

### 5.1 Infrastructure Options

#### 5.1.1 AWS Deployment

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Route 53       │────►│  CloudFront     │────►│  S3 Bucket      │
│  (DNS)          │     │  (CDN)          │     │  (Static Files) │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  API Gateway    │────►│  ECS/Fargate    │────►│  RDS/DocumentDB │
│  (API Routing)  │     │  (Containers)   │     │  (Database)     │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │  ElastiCache    │
                        │  (Redis)        │
                        │                 │
                        └─────────────────┘
```

#### 5.1.2 Google Cloud Deployment

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Cloud DNS      │────►│  Cloud CDN      │────►│  Cloud Storage  │
│  (DNS)          │     │  (CDN)          │     │  (Static Files) │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  API Gateway    │────►│  Cloud Run      │────►│  Cloud SQL/     │
│  (API Routing)  │     │  (Containers)   │     │  Firestore      │
│                 │     │                 │     │  (Database)     │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │  Memorystore    │
                        │  (Redis)        │
                        │                 │
                        └─────────────────┘
```

#### 5.1.3 DigitalOcean Deployment

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  DNS            │────►│  Spaces         │────►│  App Platform   │
│  (DNS)          │     │  (Static Files) │     │  (Next.js App)  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │                 │
                                                │  Managed        │
                                                │  Database       │
                                                │                 │
                                                └─────────────────┘
```

### 5.2 Docker Configuration

#### 5.2.1 Frontend Dockerfile

```dockerfile
# Base image
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

#### 5.2.2 Backend Dockerfile

```dockerfile
# Base image
FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy source
COPY . .

# Expose port
EXPOSE 4000

# Start server
CMD ["node", "src/index.js"]
```

#### 5.2.3 Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:4000
      - NEXT_PUBLIC_SOCKET_URL=http://backend:4000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - MONGODB_URI=mongodb://mongo:27017/whatsfordinner
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your_jwt_secret
      - JWT_REFRESH_SECRET=your_jwt_refresh_secret
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  mongo-data:
  redis-data:
```

### 5.3 CI/CD Pipeline

#### 5.3.1 GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build
          path: .next
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: yourusername/whatsfordinner:latest
      - name: Deploy to production
        uses: digitalocean/action-doctl@v2
        with:
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
      - run: doctl apps update ${{ secrets.APP_ID }} --spec .do/app.yaml
```

### 5.4 Domain Configuration

#### 5.4.1 DNS Configuration

```
# A Records
whatsfordinner.com.         IN A      [IP_ADDRESS]
www.whatsfordinner.com.     IN A      [IP_ADDRESS]

# CNAME Records
api.whatsfordinner.com.     IN CNAME  [BACKEND_ENDPOINT]
socket.whatsfordinner.com.  IN CNAME  [SOCKET_ENDPOINT]

# TXT Records for verification
whatsfordinner.com.         IN TXT    "v=spf1 include:_spf.google.com ~all"
```

#### 5.4.2 SSL Configuration

- Use Let's Encrypt for free SSL certificates
- Auto-renewal setup
- HTTP to HTTPS redirection
- HSTS implementation

## 6. Analytics and Monitoring

### 6.1 User Analytics

- Implement Google Analytics 4
- Track user engagement metrics
- Monitor conversion rates
- Analyze user flows

### 6.2 Application Monitoring

- Set up Sentry for error tracking
- Implement Prometheus for metrics
- Use Grafana for dashboards
- Set up alerting for critical issues

### 6.3 Performance Monitoring

- Implement web vitals tracking
- Set up API performance monitoring
- Database query performance tracking
- Regular performance audits

## 7. Implementation Timeline

### Phase 1: Backend Development (Weeks 1-3)
- Set up project structure
- Implement database models
- Create API endpoints
- Implement authentication

### Phase 2: Frontend Enhancement (Weeks 4-6)
- Implement new visual design
- Update UI components
- Integrate with backend APIs
- Implement responsive design

### Phase 3: Real-time Features (Weeks 7-8)
- Set up WebSocket server
- Implement real-time updates
- Create notification system
- Test real-time functionality

### Phase 4: Testing & Deployment (Weeks 9-10)
- Comprehensive testing
- Set up CI/CD pipeline
- Deploy to staging environment
- Final production deployment

## 8. Conclusion

This implementation plan provides a comprehensive roadmap for transforming the current food voting and restaurant ordering app into a production-ready application with the domain name whatsfordinner.com. The plan prioritizes backend architecture, user authentication, enhanced visual design, real-time communication, and deployment strategy as specified by the client.

By following this plan, we will create a robust, scalable, and visually appealing application that provides a seamless experience for users to vote on food choices or order from restaurants together. The implementation will include all the requested features, including MongoDB and PostgreSQL database options, comprehensive authentication with user roles, analytics, security measures, and enhanced visual design with food and family imagery.
