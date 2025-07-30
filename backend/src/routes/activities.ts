import express from 'express';
import { ActivityController } from '../controllers/activityController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const activityController = new ActivityController();

router.get('/', asyncHandler(activityController.getActivities));
router.post('/', asyncHandler(activityController.createActivity));
router.get('/:id', asyncHandler(activityController.getActivityById));
router.put('/:id', asyncHandler(activityController.updateActivity));
router.delete('/:id', asyncHandler(activityController.deleteActivity));

export default router;