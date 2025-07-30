import express from 'express';
import { InvestmentController } from '../controllers/investmentController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const investmentController = new InvestmentController();

router.get('/', asyncHandler(investmentController.getInvestments));
router.post('/', asyncHandler(investmentController.createInvestment));
router.get('/:id', asyncHandler(investmentController.getInvestmentById));
router.put('/:id', asyncHandler(investmentController.updateInvestment));
router.delete('/:id', asyncHandler(investmentController.deleteInvestment));

export default router;