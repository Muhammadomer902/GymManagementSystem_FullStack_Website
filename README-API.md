# Gym Management System API Documentation

## Environment Setup

To connect to MongoDB, you need to add a `.env.local` file at the root of your project with the following content:

```
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-management-system?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=your-secret-key-for-jwt-tokens
```

Replace `username`, `password`, and `cluster.mongodb.net` with your MongoDB Atlas credentials or your local MongoDB connection string.

## API Endpoints

### Users API

#### GET /api/users

Fetches all users or filters by role if specified.

**Query Parameters:**

- `role`: Optional. Filter users by role (user, trainer, admin)

**Response:**

```json
{
  "users": [
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
    // More users...
  ]
}
```

#### GET /api/users/me

Fetches the currently authenticated user's information.

**Authentication:**

- Requires a valid JWT token in cookies

**Response:**

```json
{
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/users/update

Updates the currently authenticated user's information.

**Authentication:**

- Requires a valid JWT token in cookies

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "currentPassword": "current-password", // Only required if changing password
  "newPassword": "new-password" // Optional - include only if changing password
}
```

**Response:**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "name": "Updated Name",
    "email": "updated@example.com",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Database Models

### User Model

```typescript
interface IUser {
  name: string;
  email: string;
  password: string; // Stored as hashed
  role: "user" | "trainer" | "admin";
  createdAt: Date;
}
```

## Future Enhancements

In future versions, we plan to implement:

1. User Fees collection to store real fee data instead of generating mock fees
2. Authentication middleware for protected routes
3. Trainer payment tracking
4. Complaint management system
5. Profile image upload and storage
