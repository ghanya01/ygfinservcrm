import express from 'express';
import { DashboardController } from '../controllers/dashboardController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const dashboardController = new DashboardController();

router.get('/stats', asyncHandler(dashboardController.getDashboardStats));
router.get('/recent-activities', asyncHandler(dashboardController.getRecentActivities));
router.get('/pipeline', asyncHandler(dashboardController.getPipelineData));
router.get('/revenue', asyncHandler(dashboardController.getRevenueData));

export default router;