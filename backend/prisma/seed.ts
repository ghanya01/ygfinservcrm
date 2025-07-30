import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash password for demo users
  const hashedPassword = await bcrypt.hash('admin123', 12)

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ygfinancial.com' },
    update: {},
    create: {
      email: 'admin@ygfinancial.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '+91-20-12345678',
    },
  })

  // Create manager user
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@ygfinancial.com' },
    update: {},
    create: {
      email: 'manager@ygfinancial.com',
      username: 'manager',
      firstName: 'Rajesh',
      lastName: 'Sharma',
      password: hashedPassword,
      role: 'MANAGER',
      phone: '+91-20-12345679',
    },
  })

  // Create agent user
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@ygfinancial.com' },
    update: {},
    create: {
      email: 'agent@ygfinancial.com',
      username: 'agent',
      firstName: 'Priya',
      lastName: 'Patel',
      password: hashedPassword,
      role: 'AGENT',
      phone: '+91-20-12345680',
    },
  })

  console.log('👥 Created demo users')

  // Create sample clients
  const client1 = await prisma.client.create({
    data: {
      firstName: 'Amit',
      lastName: 'Kumar',
      email: 'amit.kumar@email.com',
      phone: '+91-98765-43210',
      clientType: 'INDIVIDUAL',
      address: '123 MG Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      country: 'India',
      occupation: 'Software Engineer',
      company: 'Tech Solutions Pvt Ltd',
      annualIncome: 1200000,
      panNumber: 'ABCDE1234F',
      source: 'Website',
      userId: agentUser.id,
    },
  })

  const client2 = await prisma.client.create({
    data: {
      firstName: 'Sunita',
      lastName: 'Devi',
      email: 'sunita.devi@email.com',
      phone: '+91-98765-43211',
      clientType: 'INDIVIDUAL',
      address: '456 FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
      country: 'India',
      occupation: 'Doctor',
      company: 'City Hospital',
      annualIncome: 1800000,
      panNumber: 'FGHIJ5678K',
      source: 'Referral',
      userId: agentUser.id,
    },
  })

  console.log('👥 Created sample clients')

  // Create sample leads
  const lead1 = await prisma.lead.create({
    data: {
      firstName: 'Mohan',
      lastName: 'Singh',
      email: 'mohan.singh@email.com',
      phone: '+91-98765-43212',
      company: 'Manufacturing Corp',
      jobTitle: 'Manager',
      status: 'NEW',
      source: 'Cold Call',
      value: 500000,
      probability: 30,
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      userId: agentUser.id,
    },
  })

  const lead2 = await prisma.lead.create({
    data: {
      firstName: 'Neha',
      lastName: 'Gupta',
      email: 'neha.gupta@email.com',
      phone: '+91-98765-43213',
      company: 'Consulting Services',
      jobTitle: 'Director',
      status: 'CONTACTED',
      source: 'LinkedIn',
      value: 750000,
      probability: 50,
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      userId: agentUser.id,
    },
  })

  console.log('🎯 Created sample leads')

  // Create sample deals
  const deal1 = await prisma.deal.create({
    data: {
      title: 'Mutual Fund Investment - Amit Kumar',
      description: 'SIP investment in diversified equity funds',
      stage: 'PROPOSAL',
      value: 300000,
      probability: 70,
      investmentType: 'MUTUAL_FUNDS',
      products: ['HDFC Equity Fund', 'ICICI Prudential Bluechip Fund'],
      commission: 15000,
      clientId: client1.id,
      userId: agentUser.id,
    },
  })

  const deal2 = await prisma.deal.create({
    data: {
      title: 'Life Insurance - Sunita Devi',
      description: 'Term life insurance policy',
      stage: 'NEGOTIATION',
      value: 500000,
      probability: 80,
      investmentType: 'INSURANCE',
      products: ['LIC Term Plan'],
      commission: 25000,
      clientId: client2.id,
      userId: agentUser.id,
    },
  })

  console.log('💼 Created sample deals')

  // Create sample activities
  await prisma.activity.create({
    data: {
      title: 'Follow-up call with Amit Kumar',
      description: 'Discussed mutual fund options and risk appetite',
      type: 'CALL',
      priority: 'MEDIUM',
      isCompleted: true,
      completedAt: new Date(),
      clientId: client1.id,
      dealId: deal1.id,
      userId: agentUser.id,
    },
  })

  await prisma.activity.create({
    data: {
      title: 'Send insurance proposal to Sunita Devi',
      description: 'Email comprehensive insurance proposal with benefits',
      type: 'EMAIL',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      clientId: client2.id,
      dealId: deal2.id,
      userId: agentUser.id,
    },
  })

  await prisma.activity.create({
    data: {
      title: 'Meeting with Mohan Singh',
      description: 'Initial consultation about investment goals',
      type: 'MEETING',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      leadId: lead1.id,
      userId: agentUser.id,
    },
  })

  console.log('📅 Created sample activities')

  // Create sample investments
  await prisma.investment.create({
    data: {
      investmentType: 'MUTUAL_FUNDS',
      productName: 'HDFC Top 100 Fund',
      investmentAmount: 100000,
      currentValue: 105000,
      purchaseDate: new Date('2024-01-15'),
      interestRate: 12.5,
      returns: 5000,
      folioNumber: 'HDFC123456789',
      clientId: client1.id,
    },
  })

  await prisma.investment.create({
    data: {
      investmentType: 'FIXED_DEPOSITS',
      productName: 'SBI Fixed Deposit',
      investmentAmount: 200000,
      currentValue: 210000,
      purchaseDate: new Date('2024-02-01'),
      maturityDate: new Date('2025-02-01'),
      interestRate: 6.5,
      returns: 10000,
      certificateNumber: 'SBI-FD-987654321',
      clientId: client2.id,
    },
  })

  console.log('📈 Created sample investments')

  // Create company information
  await prisma.company.upsert({
    where: { id: 'company-1' },
    update: {},
    create: {
      id: 'company-1',
      name: 'Y&G Financial Services Pvt Ltd',
      address: 'Office No. 123, Business Center',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      pincode: '411001',
      phone: '+91-20-12345678',
      email: 'info@ygfinancial.com',
      website: 'https://www.ygfinancial.com',
      licenseNumber: 'AMFI-ARN-123456',
      licenseType: 'Mutual Fund Distributor',
      regulatoryBody: 'AMFI',
    },
  })

  console.log('🏢 Created company information')
  console.log('✅ Database seed completed successfully!')
  
  console.log('\n📋 Demo Login Credentials:')
  console.log('Admin: admin@ygfinancial.com / admin123')
  console.log('Manager: manager@ygfinancial.com / admin123')
  console.log('Agent: agent@ygfinancial.com / admin123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during database seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })