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
    const snapshot = await db.collection('statistics').orderBy('createdAt', 'asc').get();
    const stats = snapshot.docs.map(serializeDoc);
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

    const data = { title, value, createdAt: new Date() };
    const ref = await db.collection('statistics').add(data);

    return NextResponse.json({ id: ref.id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Create stat error:', error);
    return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 });
  }
}
