import express from 'express';
import { DealController } from '../controllers/dealController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const dealController = new DealController();

router.get('/', asyncHandler(dealController.getDeals));
router.post('/', asyncHandler(dealController.createDeal));
router.get('/:id', asyncHandler(dealController.getDealById));
router.put('/:id', asyncHandler(dealController.updateDeal));
router.delete('/:id', asyncHandler(dealController.deleteDeal));

export default router;