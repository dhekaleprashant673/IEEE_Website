import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';

const serializeDoc = (doc: FirebaseFirestore.DocumentSnapshot) => {
  const data = doc.data()!;
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() || data.createdAt,
  };
};

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
    const { title, value } = await request.json();

    if (!title || !value) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = db.collection('statistics').doc(id);
    await docRef.update({ title, value });

    const updatedDoc = await docRef.get();
    return NextResponse.json(serializeDoc(updatedDoc));
  } catch (error) {
    console.error('Update stat error:', error);
    return NextResponse.json({ error: 'Failed to update statistic' }, { status: 500 });
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

    await db.collection('statistics').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete stat error:', error);
    return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 });
  }
}
