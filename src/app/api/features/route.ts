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

export async function GET() {
  try {
    const snapshot = await db.collection('features').orderBy('createdAt', 'asc').get();
    const features = snapshot.docs.map(serializeDoc);
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

    const data = { title, description, icon, createdAt: new Date() };
    const ref = await db.collection('features').add(data);

    return NextResponse.json({ id: ref.id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Create feature error:', error);
    return NextResponse.json({ error: 'Failed to create feature' }, { status: 500 });
  }
}
