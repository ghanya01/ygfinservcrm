import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export class InvestmentController {
  getInvestments = async (req: AuthRequest, res: Response) => {
    const investments = await prisma.investment.findMany({
      include: { client: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: investments });
  };

  createInvestment = async (req: AuthRequest, res: Response) => {
    const investment = await prisma.investment.create({
      data: req.body
    });
    res.status(201).json({ success: true, data: investment });
  };

  getInvestmentById = async (req: AuthRequest, res: Response) => {
    const investment = await prisma.investment.findUnique({
      where: { id: req.params.id },
      include: { client: true }
    });
    res.json({ success: true, data: investment });
  };

  updateInvestment = async (req: AuthRequest, res: Response) => {
    const investment = await prisma.investment.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: investment });
  };

  deleteInvestment = async (req: AuthRequest, res: Response) => {
    await prisma.investment.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    res.json({ success: true, message: 'Investment deleted successfully' });
  };
}