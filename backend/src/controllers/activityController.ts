import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';

export class ActivityController {
  getActivities = async (req: AuthRequest, res: Response) => {
    const activities = await prisma.activity.findMany({
      include: { 
        user: { select: { firstName: true, lastName: true } },
        client: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: activities });
  };

  createActivity = async (req: AuthRequest, res: Response) => {
    const activity = await prisma.activity.create({
      data: { ...req.body, userId: req.user?.id }
    });
    res.status(201).json({ success: true, data: activity });
  };

  getActivityById = async (req: AuthRequest, res: Response) => {
    const activity = await prisma.activity.findUnique({
      where: { id: req.params.id },
      include: { user: true, client: true }
    });
    res.json({ success: true, data: activity });
  };

  updateActivity = async (req: AuthRequest, res: Response) => {
    const activity = await prisma.activity.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: activity });
  };

  deleteActivity = async (req: AuthRequest, res: Response) => {
    await prisma.activity.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, message: 'Activity deleted successfully' });
  };
}