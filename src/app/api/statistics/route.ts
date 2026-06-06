import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const stats = await prisma.statistic.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Fetch stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, value } = await request.json();
    if (!title || !value) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const stat = await prisma.statistic.create({
      data: { title, value },
    });

    return NextResponse.json(stat, { status: 201 });
  } catch (error) {
    console.error('Create stat error:', error);
    return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 });
  }
}
