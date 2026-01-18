# Health Skill - Healthcare Professional Skill Assessment Platform

A comprehensive healthcare professional skill assessment and development platform built with React, TypeScript, Node.js/Express, and modern web technologies.

## 🎯 Overview

Health Skill is a full-stack application designed to help healthcare professionals assess their competencies, identify skill gaps, and track professional development. The platform features a powerful admin dashboard for managing users, quiz questions, and skill content.

## ✨ Key Features

### For Users
- *Secure Authentication* - Token-based JWT authentication with 24-hour session expiry
- *Professional Profile* - Create detailed profiles with education, skills, experience, certifications, interests, and career goals
- *Interactive Dashboard* - View personalized analytics showing skill distribution, proficiency levels, and career readiness
- *Skill Assessment* - Take quizzes to assess healthcare competencies with detailed result analysis
- *Skill Gap Analysis* - Identify gaps and get personalized recommendations for skill development
- *Persistent Data* - All profile data persists across sessions - no need to re-enter information
- *Activity Tracking* - Monitor learning history and quiz attempts

### For Admins
- *Admin Panel* - Dedicated admin dashboard with comprehensive analytics
- *User Management* - View all users, profiles, and detailed activity logs
- *Content CRUD Operations*:
  - Manage Skills (organized by 5 healthcare categories)
  - Manage User Interests
  - Manage Career Roles/Goals
  - Create/Edit/Delete Quiz Questions with difficulty levels and categories
- *Platform Analytics* - Real-time monitoring of user activities and engagement

## 🛠️ Tech Stack

### Frontend
- *React 18* - UI framework
- *TypeScript* - Type-safe development
- *Vite 5.4* - Lightning-fast build tool
- *Tailwind CSS* - Utility-first styling
- *ShadCN UI* - Accessible component library
- *React Router v6* - Client-side routing
- *Framer Motion* - Animations
- *Recharts* - Data visualization

### Backend
- *Node.js* - Runtime environment
- *Express.js* - Web framework
- *JWT (jsonwebtoken)* - Token-based authentication
- *Express Session* - Session management
- *CORS* - Cross-origin resource sharing
- *Cookie Parser* - HTTP cookie handling

### State Management & Storage
- *React Context API* - Global state management
- *localStorage* - Client-side data persistence
- *In-memory storage* - Backend data (ready for database integration)

## 📋 Prerequisites

- Node.js v22+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)

## 🚀 Installation & Setup

### 1. Clone the Repository
bash
git clone https://github.com/yourusername/health-skill.git
cd health-skill


### 2. Frontend Setup
bash
# Install dependencies
npm install

# Create .env file (optional, for API configuration)
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev

Frontend will run on http://localhost:8080 (or next available port)

### 3. Backend Setup
bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
JWT_SECRET=health-skill-secret-key-demo
SESSION_SECRET=session-secret-key-demo
EOF

# Start backend server
node index.js
# or for development with auto-reload
npm run dev

Backend will run on http://localhost:5000

## 📖 Usage

### Access the Application
- *Frontend*: Open browser and navigate to http://localhost:8080
- *Backend API*: http://localhost:5000

### Demo Credentials

Email: demo@healthskill.com
Password: password123 (minimum 6 characters)


### Admin Credentials

Email: admin@healthskill.com
Password: password123


## 🔌 API Endpoints

### Authentication
- POST /api/auth/signup - Register new user
- POST /api/auth/login - Login with email/password
- POST /api/auth/logout - Logout user
- GET /api/auth/me - Get current user profile

### Profile Management
- PUT /api/profile - Update user profile (education, skills, experience, etc.)

### Admin Routes
- GET /api/users - Get all users (admin only)
- GET /api/activities - Get activity logs (admin only)

## 📁 Project Structure


health-skill/
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/            # ShadCN UI components
│   ├── contexts/          # React Context (AuthContext, ThemeContext)
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout components
│   ├── lib/               # Utilities (auth, tokenUtils, etc.)
│   ├── pages/             # Page components
│   │   └── admin/         # Admin pages
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Static data (skills, interests, etc.)
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── server/
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables
│   └── test-api.ps1       # API test script
├── package.json           # Frontend dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file


## 🔐 Authentication & Security

### Token-Based Authentication
- *JWT Tokens*: 24-hour expiry for security
- *httpOnly Cookies*: Secure cookie storage with CORS support
- *Session Management*: Automatic session validation on app load
- *Role-Based Access*: Separate user and admin interfaces

### Data Security
- *Persistent Storage*: Profile data saved to healthskill_profile_${userId}
- *Token Storage*: Stored in localStorage with expiration validation
- *Protected Routes*: Admin routes require authentication and admin role

## 🎨 Features Highlight

### Unique Aspects
1. *Zero Re-entry Policy* - Users never re-enter data after profile setup
2. *Dual Role System* - Separate workflows for users and administrators
3. *Smart Quiz Analytics* - Not just scores; identifies strengths and weaknesses
4. *Admin Content Control* - Fully editable quiz questions and skill database
5. *Real-time Activity Tracking* - Monitor all user interactions
6. *Responsive Design* - Mobile-friendly interface using Tailwind CSS

## 📊 Skill Categories

The platform organizes healthcare skills into 5 categories:
1. *Health Data Analytics* - Data analysis and visualization
2. *Health Informatics* - IT systems in healthcare
3. *Data Standards* - Healthcare data standards (DICOM, HL7, etc.)
4. *Privacy & Security* - HIPAA, data protection, cybersecurity
5. *AI & Digital Health* - Machine learning and digital transformation

## 🧪 Testing

### Test Login Endpoint (Backend)
bash
cd server
powershell -ExecutionPolicy Bypass -File test-api.ps1


### Manual Testing
1. Signup with new credentials
2. Complete all 6 profile setup steps
3. View dashboard analytics
4. Take a quiz and analyze results
5. Logout and login again to verify data persistence
6. Login as admin to access admin panel

## 🔄 Data Flow


User Signs Up
    ↓
Creates Profile (6 Steps)
    ↓
Data Saved to localStorage & Backend
    ↓
Logout → Login Again
    ↓
Token Validated
    ↓
Profile Data Restored from Backend
    ↓
User Access Dashboard


## 🚧 Future Enhancements

1. *Database Integration*
   - PostgreSQL/MongoDB for persistent data
   - Redis for session caching
   - Database migrations

2. *AI-Powered Features*
   - Personalized skill recommendations
   - Adaptive quiz difficulty
   - Career path suggestions using ML

3. *Mobile Application*
   - React Native mobile apps
   - Offline-first functionality
   - Push notifications

4. *Social & Gamification*
   - Peer networking
   - Leaderboards and badges
   - Group challenges
   - Certifications

5. *Integration & Scaling*
   - Learning management system (LMS) integration
   - Payment processing (Stripe, PayPal)
   - Email notifications
   - Analytics dashboard (Google Analytics, Mixpanel)

## 🛠️ Development

### Run Frontend
bash
npm run dev


### Run Backend
bash
cd server
npm run dev


### Build Frontend
bash
npm run build
npm run preview


### Lint & Format
bash
npm run lint
npm run format


## 📝 Project Scripts

### Frontend
bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint


### Backend
bash
npm start         # Start server
npm run dev       # Start with nodemon (auto-reload)


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@healthskill.com

## 👨‍💻 Authors

- *Health Skill Team* - Initial concept and development

## 🙏 Acknowledgments

- React community for excellent libraries
- ShadCN UI for accessible components
- Tailwind CSS for utility-first styling
- All healthcare professionals using this platform

---

*Health Skill* - Empowering Healthcare Professionals Through Skills Assessment & Development 🏥

*Built with ❤️ for Healthcare Excellence*
