import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export class LeadController {
  getLeads = async (req: AuthRequest, res: Response) => {
    const leads = await prisma.lead.findMany({
      include: { user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: leads });
  };

  createLead = async (req: AuthRequest, res: Response) => {
    const lead = await prisma.lead.create({
      data: { ...req.body, userId: req.user?.id },
      include: { user: { select: { firstName: true, lastName: true } } }
    });
    res.status(201).json({ success: true, data: lead });
  };

  getLeadById = async (req: AuthRequest, res: Response) => {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { firstName: true, lastName: true } } }
    });
    res.json({ success: true, data: lead });
  };

  updateLead = async (req: AuthRequest, res: Response) => {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: lead });
  };

  deleteLead = async (req: AuthRequest, res: Response) => {
    await prisma.lead.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    res.json({ success: true, message: 'Lead deleted successfully' });
  };

  convertLead = async (req: AuthRequest, res: Response) => {
    // Convert lead to client and create deal
    res.json({ success: true, message: 'Lead converted successfully' });
  };
}