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
    const { imageUrl, title, category } = await request.json();

    if (!imageUrl || !title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = db.collection('gallery_images').doc(id);
    const updateData = { imageUrl, title, category };
    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const data = updatedDoc.data();

    return NextResponse.json({
      id: updatedDoc.id,
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
    });
  } catch (error) {
    console.error('Update gallery image error:', error);
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
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

    await db.collection('gallery_images').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
