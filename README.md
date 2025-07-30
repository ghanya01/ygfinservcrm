# Y&G Financial Services CRM

A comprehensive Customer Relationship Management (CRM) system built specifically for Y&G Financial Services Pvt Ltd, Pune. This modern web application helps manage clients, leads, deals, activities, and investment portfolios with a focus on financial services.

## 🌟 Features

### Core CRM Features
- **Client Management**: Complete client profiles with personal, financial, and contact information
- **Lead Tracking**: Lead capture, qualification, and conversion pipeline
- **Deal Management**: Sales pipeline with stages, probability tracking, and revenue forecasting
- **Activity Management**: Track calls, meetings, emails, tasks, and notes
- **Investment Portfolio**: Manage client investments across various financial products

### Financial Services Specific
- **Multiple Investment Types**: Mutual Funds, Stocks, Bonds, Insurance, Fixed Deposits, Real Estate, Commodities
- **KYC Management**: PAN, Aadhar, and bank account information
- **Commission Tracking**: Track commissions on deals and investments
- **Regulatory Compliance**: Support for financial services regulatory requirements

### Technical Features
- **Role-Based Access Control**: Admin, Manager, Agent, and Viewer roles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Dashboard**: Analytics and insights with charts and statistics
- **Search & Filtering**: Advanced search across all modules
- **Data Export**: Export data for reporting and analysis
- **Secure Authentication**: JWT-based authentication with password hashing

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Zod schema validation
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ygfinservcrm
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root directory
cd ..
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yg_crm_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# Email Configuration (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Company Information
COMPANY_NAME="Y&G Financial Services Pvt Ltd"
COMPANY_ADDRESS="Pune, Maharashtra, India"
COMPANY_EMAIL="info@ygfinancial.com"
COMPANY_PHONE="+91-20-XXXXXXXX"
```

#### Frontend Environment (Optional)
Create a `.env` file in the `frontend` directory if you need to customize the API URL:

```bash
cd frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 4. Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run db:seed
```

### 5. Start the Application

#### Option 1: Start Both Services Together (Recommended)
```bash
# From the root directory
npm run dev
```

#### Option 2: Start Services Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Studio**: http://localhost:5555 (run `npx prisma studio` in backend directory)

## 👥 Demo Accounts

The system comes with pre-configured demo accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Admin | admin@ygfinancial.com | admin123 | Full system access |
| Manager | manager@ygfinancial.com | admin123 | Team management access |
| Agent | agent@ygfinancial.com | admin123 | Client and deal management |

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/change-password` - Change password

### Core Endpoints
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity
- `GET /api/investments` - Get all investments
- `POST /api/investments` - Create new investment

### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activities` - Get recent activities
- `GET /api/dashboard/pipeline` - Get sales pipeline data
- `GET /api/dashboard/revenue` - Get revenue data

## 🏗️ Project Structure

```
ygfinservcrm/
├── backend/                 # Node.js/Express backend
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── uploads/            # File uploads directory
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── types/          # TypeScript types
│       └── utils/          # Utility functions
└── package.json           # Root package.json with scripts
```

## 🔧 Development Scripts

### Root Level Scripts
```bash
npm run dev              # Start both frontend and backend
npm run build           # Build both applications
npm run start           # Start production backend
npm run install:all     # Install all dependencies
```

### Backend Scripts
```bash
npm run dev             # Start development server
npm run build           # Build TypeScript
npm run start           # Start production server
npm run migrate         # Run database migrations
npm run db:seed         # Seed database with sample data
npm run db:studio       # Open Prisma Studio
```

### Frontend Scripts
```bash
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
```

## 🚀 Deployment

### Production Environment Variables

Ensure you set the following environment variables in production:

```env
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
DATABASE_URL=your-production-database-url
```

### Build for Production

```bash
# Build both applications
npm run build

# Start production server
npm start
```

### Docker Deployment (Optional)

Create a `Dockerfile` for containerized deployment:

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder

# Build backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Y&G Financial Services

Y&G Financial Services Pvt Ltd is a financial advisory firm based in Pune, Maharashtra, specializing in:

- Mutual Fund Distribution
- Insurance Planning
- Investment Advisory
- Financial Planning
- Wealth Management

**Contact Information:**
- **Address**: Pune, Maharashtra, India
- **Email**: info@ygfinancial.com
- **Phone**: +91-20-XXXXXXXX

## 📞 Support

For technical support or questions about this CRM system:

1. Check the [Issues](../../issues) section for existing solutions
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed specifically for financial services industry requirements
- Follows security best practices for financial data handling
- Responsive design for mobile and desktop usage

---

**Made with ❤️ for Y&G Financial Services Pvt Ltd, Pune**
