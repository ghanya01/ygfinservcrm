import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export class DashboardController {
  getDashboardStats = async (req: AuthRequest, res: Response) => {
    const [clientsCount, leadsCount, dealsCount, activitiesCount] = await Promise.all([
      prisma.client.count({ where: { isActive: true } }),
      prisma.lead.count({ where: { isActive: true } }),
      prisma.deal.count({ where: { isActive: true } }),
      prisma.activity.count()
    ]);

    res.json({
      success: true,
      data: {
        clients: clientsCount,
        leads: leadsCount,
        deals: dealsCount,
        activities: activitiesCount
      }
    });
  };

  getRecentActivities = async (req: AuthRequest, res: Response) => {
    const activities = await prisma.activity.findMany({
      take: 10,
      include: {
        user: { select: { firstName: true, lastName: true } },
        client: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: activities });
  };

  getPipelineData = async (req: AuthRequest, res: Response) => {
    const pipeline = await prisma.deal.groupBy({
      by: ['stage'],
      _count: { stage: true },
      _sum: { value: true }
    });
    res.json({ success: true, data: pipeline });
  };

  getRevenueData = async (req: AuthRequest, res: Response) => {
    // Mock revenue data - in real app, calculate from deals
    const revenueData = {
      thisMonth: 125000,
      lastMonth: 98000,
      growth: 27.6
    };
    res.json({ success: true, data: revenueData });
  };
}