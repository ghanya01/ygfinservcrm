import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export class DealController {
  getDeals = async (req: AuthRequest, res: Response) => {
    const deals = await prisma.deal.findMany({
      include: { 
        client: { select: { firstName: true, lastName: true } },
        user: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: deals });
  };

  createDeal = async (req: AuthRequest, res: Response) => {
    const deal = await prisma.deal.create({
      data: { ...req.body, userId: req.user?.id },
      include: { client: { select: { firstName: true, lastName: true } } }
    });
    res.status(201).json({ success: true, data: deal });
  };

  getDealById = async (req: AuthRequest, res: Response) => {
    const deal = await prisma.deal.findUnique({
      where: { id: req.params.id },
      include: { client: true, activities: true }
    });
    res.json({ success: true, data: deal });
  };

  updateDeal = async (req: AuthRequest, res: Response) => {
    const deal = await prisma.deal.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: deal });
  };

  deleteDeal = async (req: AuthRequest, res: Response) => {
    await prisma.deal.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    res.json({ success: true, message: 'Deal deleted successfully' });
  };
}