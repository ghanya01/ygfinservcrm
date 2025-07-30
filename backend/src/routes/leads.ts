import express from 'express';
import { LeadController } from '../controllers/leadController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const leadController = new LeadController();

router.get('/', asyncHandler(leadController.getLeads));
router.post('/', asyncHandler(leadController.createLead));
router.get('/:id', asyncHandler(leadController.getLeadById));
router.put('/:id', asyncHandler(leadController.updateLead));
router.delete('/:id', asyncHandler(leadController.deleteLead));
router.post('/:id/convert', asyncHandler(leadController.convertLead));

export default router;