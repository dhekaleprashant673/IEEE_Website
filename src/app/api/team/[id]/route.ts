import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { name, designation, image, linkedin, github } = await request.json();

    if (!name || !designation || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = db.collection('team_members').doc(id);
    const updateData = { name, designation, image, linkedin, github };
    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const data = updatedDoc.data();

    return NextResponse.json({
      id: updatedDoc.id,
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
    });
  } catch (error) {
    console.error('Update team member error:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await db.collection('team_members').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete team member error:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
