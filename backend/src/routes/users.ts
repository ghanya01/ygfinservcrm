import express from 'express';
import { UserController } from '../controllers/userController';
import { asyncHandler } from '../middleware/errorHandler';
import { requireManagerOrAdmin } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

// GET /api/users - Get all users (managers/admins only)
router.get('/', requireManagerOrAdmin, asyncHandler(userController.getUsers));

// GET /api/users/profile - Get current user profile
router.get('/profile', asyncHandler(userController.getProfile));

// PUT /api/users/profile - Update current user profile
router.put('/profile', asyncHandler(userController.updateProfile));

// GET /api/users/:id - Get user by ID (managers/admins only)
router.get('/:id', requireManagerOrAdmin, asyncHandler(userController.getUserById));

// PUT /api/users/:id - Update user (managers/admins only)
router.put('/:id', requireManagerOrAdmin, asyncHandler(userController.updateUser));

// DELETE /api/users/:id - Deactivate user (managers/admins only)
router.delete('/:id', requireManagerOrAdmin, asyncHandler(userController.deactivateUser));

export default router;