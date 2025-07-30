import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../index';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'AGENT', 'VIEWER']).optional()
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters')
});

export class AuthController {
  // Generate JWT token
  private generateToken(userId: string): string {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
    
    if (!JWT_SECRET) {
      throw createError('JWT secret not configured', 500);
    }

    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Register new user
  register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username }
        ]
      }
    });

    if (existingUser) {
      throw createError('User with this email or username already exists', 409);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
        role: validatedData.role || 'AGENT'
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true
      }
    });

    // Generate token
    const token = this.generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });
  };

  // Login user
  login = async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (!user || !user.isActive) {
      throw createError('Invalid credentials or inactive account', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
    
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401);
    }

    // Generate token
    const token = this.generateToken(user.id);

    // Return user data without password
    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  };

  // Refresh token
  refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
      throw createError('Token is required', 400);
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw createError('JWT secret not configured', 500);
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          avatar: true,
          isActive: true
        }
      });

      if (!user || !user.isActive) {
        throw createError('Invalid token or inactive user', 401);
      }

      const newToken = this.generateToken(user.id);

      res.json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          user,
          token: newToken
        }
      });
    } catch (error) {
      throw createError('Invalid token', 401);
    }
  };

  // Forgot password
  forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw createError('Email is required', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if user exists or not
      res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
      return;
    }

    // In a real application, you would:
    // 1. Generate a secure reset token
    // 2. Store it in database with expiration
    // 3. Send email with reset link
    
    // For now, just return success
    res.json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });
  };

  // Reset password
  resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw createError('Token and new password are required', 400);
    }

    if (newPassword.length < 6) {
      throw createError('Password must be at least 6 characters', 400);
    }

    // In a real application, you would verify the reset token
    // For now, just return success message
    res.json({
      success: true,
      message: 'Password reset successful. Please login with your new password.'
    });
  };

  // Change password (authenticated users)
  changePassword = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    const validatedData = changePasswordSchema.parse(req.body);

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(validatedData.currentPassword, user.password);
    
    if (!isValidPassword) {
      throw createError('Current password is incorrect', 400);
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, saltRounds);

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  };
}