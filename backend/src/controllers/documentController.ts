import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export class DocumentController {
  getDocuments = async (req: AuthRequest, res: Response) => {
    const documents = await prisma.document.findMany({
      include: { client: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: documents });
  };

  uploadDocument = async (req: AuthRequest, res: Response) => {
    // File upload logic would go here
    res.status(201).json({ success: true, message: 'Document uploaded successfully' });
  };

  getDocumentById = async (req: AuthRequest, res: Response) => {
    const document = await prisma.document.findUnique({
      where: { id: req.params.id },
      include: { client: true }
    });
    res.json({ success: true, data: document });
  };

  deleteDocument = async (req: AuthRequest, res: Response) => {
    await prisma.document.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, message: 'Document deleted successfully' });
  };
}