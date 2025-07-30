import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../index';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional()
});

export class UserController {
  getUsers = async (req: AuthRequest, res: Response) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        isActive: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: users
    });
  };

  getProfile = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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

    if (!user) {
      throw createError('User not found', 404);
    }

    res.json({
      success: true,
      data: user
    });
  };

  updateProfile = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    const validatedData = updateProfileSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: validatedData,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  };

  getUserById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    res.json({
      success: true,
      data: user
    });
  };

  updateUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const validatedData = updateProfileSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: validatedData,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  };

  deactivateUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    await prisma.user.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  };
}