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
      .collection('team_members')
      .orderBy('createdAt', 'asc')
      .get();

    const team = snapshot.docs.map(serializeDoc);
    return NextResponse.json(team);
  } catch (error) {
    console.error('Fetch team error:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, designation, image, linkedin, github } = await request.json();
    if (!name || !designation || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docData = { name, designation, image, linkedin, github, createdAt: new Date() };
    const ref = await db.collection('team_members').add(docData);

    return NextResponse.json({ id: ref.id, ...docData }, { status: 201 });
  } catch (error) {
    console.error('Create team member error:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
