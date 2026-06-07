import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';

const serializeDoc = (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() || data.createdAt,
  };
};

export async function GET() {
  try {
    const snapshot = await db
      .collection('gallery_images')
      .orderBy('createdAt', 'desc')
      .get();

    const images = snapshot.docs.map(serializeDoc);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Fetch gallery images error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageUrl, title, category } = await request.json();
    if (!imageUrl || !title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docData = { imageUrl, title, category, createdAt: new Date() };
    const ref = await db.collection('gallery_images').add(docData);

    return NextResponse.json({ id: ref.id, ...docData }, { status: 201 });
  } catch (error) {
    console.error('Create gallery image error:', error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
