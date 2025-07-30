import express from 'express';
import { AuthController } from '../controllers/authController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const authController = new AuthController();

// POST /api/auth/register
router.post('/register', asyncHandler(authController.register));

// POST /api/auth/login
router.post('/login', asyncHandler(authController.login));

// POST /api/auth/refresh
router.post('/refresh', asyncHandler(authController.refreshToken));

// POST /api/auth/forgot-password
router.post('/forgot-password', asyncHandler(authController.forgotPassword));

// POST /api/auth/reset-password
router.post('/reset-password', asyncHandler(authController.resetPassword));

// POST /api/auth/change-password (requires authentication)
router.post('/change-password', asyncHandler(authController.changePassword));

export default router;