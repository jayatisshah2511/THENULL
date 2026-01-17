# Backend Architecture Documentation

## Current Architecture (Frontend-Only)

Currently, this application uses **localStorage** for data persistence with simulated API calls. There is no actual backend server.

### Current Data Layer (`src/contexts/AuthContext.tsx`)

#### Storage Strategy
- **User Data**: Stored in `localStorage` with key `healthskill_user`
- **Profile Data**: Stored in `localStorage` with key `healthskill_profile`
- **User-Specific Profiles**: Stored with key `healthskill_profile_${userId}`

#### Key Functions (Mock Backend Logic)

##### 1. **Login** (`login`)
```typescript
// Line 70-97
- Simulates API call with 1 second delay
- Checks DEMO_USERS array (hardcoded users)
- Validates password (minimum 6 characters)
- Loads user profile from localStorage
- Saves session to localStorage
```

##### 2. **Signup** (`signup`)
```typescript
// Line 99-136
- Simulates API call with 1 second delay
- Checks if user already exists
- Validates password length
- Creates new user with timestamp ID
- Initializes empty profile
- Saves to localStorage
```

##### 3. **Profile Management** (`updateProfile`)
```typescript
// Line 145-152
- Merges updates with existing profile
- Saves to both current session and user-specific localStorage keys
- Updates React state immediately
```

##### 4. **Profile Completion** (`completeProfileStep`)
```typescript
// Line 154-171
- Tracks completed profile steps
- Checks if all 6 steps are complete
- Updates user.profileCompleted flag
- Persists to localStorage
```

#### Data Structures

##### User Object
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  profileCompleted: boolean;
  createdAt: Date;
  lastLogin: Date;
}
```

##### UserProfile Object
```typescript
{
  userId: string;
  education: Education[];
  careerGoal: CareerGoal | null;
  skills: UserSkill[];
  experiences: Experience[];
  certifications: Certification[];
  interests: string[];
  completedSteps: number[];
}
```

---

## Proposed Backend Architecture

If you want to add a real backend server, here's how it would work:

### API Endpoints Structure

#### Authentication Endpoints
```
POST   /api/auth/login
POST   /api/auth/signup
POST   /api/auth/logout
GET    /api/auth/me
```

#### Profile Endpoints
```
GET    /api/profile
PUT    /api/profile
PATCH  /api/profile/skills
PATCH  /api/profile/complete-step
```

#### Recommendations Endpoints
```
GET    /api/recommendations
GET    /api/recommendations?type=course&difficulty=beginner
```

#### Skills Endpoints
```
GET    /api/skills
GET    /api/skills/:id
```

### Example Backend Implementation (Node.js/Express)

```typescript
// server/routes/auth.ts
import express from 'express';
import { User, UserProfile } from '../types';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  // Find user in database
  const user = await db.users.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  // Verify password (using bcrypt or similar)
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  // Update last login
  await db.users.update(user.id, { lastLogin: new Date() });
  
  // Load user profile
  const profile = await db.profiles.findOne({ userId: user.id });
  
  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
  res.json({
    success: true,
    user,
    profile,
    token
  });
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  // Check if user exists
  const existing = await db.users.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: 'User already exists with this email' });
  }
  
  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Create user
  const user = await db.users.create({
    email,
    name,
    passwordHash,
    role: 'user',
    profileCompleted: false,
    createdAt: new Date(),
    lastLogin: new Date()
  });
  
  // Create initial profile
  const profile = await db.profiles.create({
    userId: user.id,
    education: [],
    careerGoal: null,
    skills: [],
    experiences: [],
    certifications: [],
    interests: [],
    completedSteps: []
  });
  
  // Generate token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
  res.status(201).json({
    success: true,
    user,
    profile,
    token
  });
});

export default router;
```

```typescript
// server/routes/profile.ts
import express from 'express';

const router = express.Router();

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// GET /api/profile
router.get('/', authenticate, async (req, res) => {
  const profile = await db.profiles.findOne({ userId: req.userId });
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

// PUT /api/profile
router.put('/', authenticate, async (req, res) => {
  const updates = req.body;
  const profile = await db.profiles.update(
    { userId: req.userId },
    updates
  );
  res.json(profile);
});

// PATCH /api/profile/skills
router.patch('/skills', authenticate, async (req, res) => {
  const { skills } = req.body;
  const profile = await db.profiles.findOne({ userId: req.userId });
  
  const updatedProfile = await db.profiles.update(
    { userId: req.userId },
    { skills }
  );
  
  res.json(updatedProfile);
});

// PATCH /api/profile/complete-step
router.patch('/complete-step', authenticate, async (req, res) => {
  const { step } = req.body;
  const profile = await db.profiles.findOne({ userId: req.userId });
  
  const completedSteps = [...new Set([...profile.completedSteps, step])];
  const isComplete = completedSteps.length >= 6;
  
  const updatedProfile = await db.profiles.update(
    { userId: req.userId },
    { completedSteps }
  );
  
  if (isComplete) {
    await db.users.update(req.userId, { profileCompleted: true });
  }
  
  res.json(updatedProfile);
});

export default router;
```

### Frontend API Service (How to Replace localStorage)

```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request<{ user: User; profile: UserProfile; token: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
  }

  async signup(name: string, email: string, password: string) {
    return this.request<{ user: User; profile: UserProfile; token: string }>(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }
    );
  }

  // Profile methods
  async getProfile() {
    return this.request<UserProfile>('/profile');
  }

  async updateProfile(updates: Partial<UserProfile>) {
    return this.request<UserProfile>('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async updateSkills(skills: UserSkill[]) {
    return this.request<UserProfile>('/profile/skills', {
      method: 'PATCH',
      body: JSON.stringify({ skills }),
    });
  }
}

export const api = new ApiService();
```

### Migration Strategy

To migrate from localStorage to a backend:

1. **Create API service layer** (as shown above)
2. **Update AuthContext** to use API instead of localStorage
3. **Add authentication token management**
4. **Update all data operations** to call API endpoints
5. **Handle loading and error states** for API calls
6. **Implement token refresh logic** if needed

---

## Database Schema (Example)

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) UNIQUE NOT NULL,
  education JSON,
  career_goal JSON,
  skills JSON,
  experiences JSON,
  certifications JSON,
  interests JSON,
  completed_steps JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Summary

**Current State:**
- ✅ Frontend-only with localStorage
- ✅ Mock API calls with setTimeout
- ✅ No authentication tokens
- ✅ Data persists only in browser

**With Backend:**
- ✅ Real database (PostgreSQL, MongoDB, etc.)
- ✅ JWT authentication
- ✅ Server-side validation
- ✅ Multi-device sync
- ✅ Data security and backup
- ✅ Scalability

The current implementation works great for demos and prototypes. For production, you'll need a real backend server with proper authentication and database.
