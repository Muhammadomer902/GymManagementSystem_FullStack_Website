// This is a mock database for demonstration purposes
// In a real application, you would use a proper database like MongoDB, PostgreSQL, etc.

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "trainer" | "user";
  createdAt: Date;
}

// Mock database
export const users: User[] = [
  // Pre-populate with some test users for demonstration
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123", // NEVER store plaintext passwords in production
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Trainer User",
    email: "trainer@example.com",
    password: "password123",
    role: "trainer",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Regular User",
    email: "user@example.com",
    password: "password123",
    role: "user",
    createdAt: new Date(),
  },
];
