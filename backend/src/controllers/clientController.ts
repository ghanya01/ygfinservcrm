import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../index';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const clientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  alternatePhone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  clientType: z.enum(['INDIVIDUAL', 'CORPORATE', 'TRUST', 'PARTNERSHIP']).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  annualIncome: z.number().optional(),
  panNumber: z.string().optional(),
  aadharNumber: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional()
});

export class ClientController {
  getClients = async (req: AuthRequest, res: Response) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      AND: [
        { isActive: true },
        search ? {
          OR: [
            { firstName: { contains: search as string, mode: 'insensitive' as const } },
            { lastName: { contains: search as string, mode: 'insensitive' as const } },
            { email: { contains: search as string, mode: 'insensitive' as const } },
            { phone: { contains: search as string } }
          ]
        } : {}
      ]
    };

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        include: {
          user: {
            select: { firstName: true, lastName: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.client.count({ where })
    ]);

    res.json({
      success: true,
      data: clients,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  };

  createClient = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    const validatedData = clientSchema.parse(req.body);

    const client = await prisma.client.create({
      data: {
        ...validatedData,
        userId: req.user.id,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null
      },
      include: {
        user: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
    });
  };

  getClientById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true } },
        activities: { take: 5, orderBy: { createdAt: 'desc' } },
        investments: { take: 5, orderBy: { createdAt: 'desc' } },
        deals: { take: 5, orderBy: { createdAt: 'desc' } }
      }
    });

    if (!client) {
      throw createError('Client not found', 404);
    }

    res.json({
      success: true,
      data: client
    });
  };

  updateClient = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const validatedData = clientSchema.partial().parse(req.body);

    const client = await prisma.client.update({
      where: { id },
      data: {
        ...validatedData,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined
      },
      include: {
        user: { select: { firstName: true, lastName: true } }
      }
    });

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: client
    });
  };

  deleteClient = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    await prisma.client.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  };

  getClientActivities = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const activities = await prisma.activity.findMany({
      where: { clientId: id },
      include: {
        user: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: activities
    });
  };

  getClientInvestments = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const investments = await prisma.investment.findMany({
      where: { clientId: id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: investments
    });
  };
}