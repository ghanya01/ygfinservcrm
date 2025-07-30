import express from 'express';
import { DocumentController } from '../controllers/documentController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const documentController = new DocumentController();

router.get('/', asyncHandler(documentController.getDocuments));
router.post('/', asyncHandler(documentController.uploadDocument));
router.get('/:id', asyncHandler(documentController.getDocumentById));
router.delete('/:id', asyncHandler(documentController.deleteDocument));

export default router;