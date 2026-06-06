import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(features);
  } catch (error) {
    console.error('Fetch features error:', error);
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, icon } = await request.json();
    if (!title || !description || !icon) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const feature = await prisma.feature.create({
      data: { title, description, icon },
    });

    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error('Create feature error:', error);
    return NextResponse.json({ error: 'Failed to create feature' }, { status: 500 });
  }
}
