import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import clientRoutes from './routes/clients';
import leadRoutes from './routes/leads';
import dealRoutes from './routes/deals';
import activityRoutes from './routes/activities';
import investmentRoutes from './routes/investments';
import documentRoutes from './routes/documents';
import dashboardRoutes from './routes/dashboard';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Y&G Financial CRM API',
    version: '1.0.0'
  });
});

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/clients', authenticateToken, clientRoutes);
app.use('/api/leads', authenticateToken, leadRoutes);
app.use('/api/deals', authenticateToken, dealRoutes);
app.use('/api/activities', authenticateToken, activityRoutes);
app.use('/api/investments', authenticateToken, investmentRoutes);
app.use('/api/documents', authenticateToken, documentRoutes);
app.use('/api/dashboard', authenticateToken, dashboardRoutes);

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Database connection and server start
async function startServer() {
  try {
    await prisma.$connect();
    console.log('📊 Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Y&G Financial CRM API Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📋 API Documentation: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();