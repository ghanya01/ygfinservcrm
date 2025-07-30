import express from 'express';
import { ClientController } from '../controllers/clientController';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();
const clientController = new ClientController();

// GET /api/clients - Get all clients
router.get('/', asyncHandler(clientController.getClients));

// POST /api/clients - Create new client
router.post('/', asyncHandler(clientController.createClient));

// GET /api/clients/:id - Get client by ID
router.get('/:id', asyncHandler(clientController.getClientById));

// PUT /api/clients/:id - Update client
router.put('/:id', asyncHandler(clientController.updateClient));

// DELETE /api/clients/:id - Delete client
router.delete('/:id', asyncHandler(clientController.deleteClient));

// GET /api/clients/:id/activities - Get client activities
router.get('/:id/activities', asyncHandler(clientController.getClientActivities));

// GET /api/clients/:id/investments - Get client investments
router.get('/:id/investments', asyncHandler(clientController.getClientInvestments));

export default router;