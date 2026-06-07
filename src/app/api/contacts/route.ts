import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const snapshot = await db.collection('contacts').orderBy('createdAt', 'desc').get();
    const contacts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      };
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Fetch contact submissions error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const data = { name, email, subject, message, createdAt: new Date() };
    const ref = await db.collection('contacts').add(data);

    return NextResponse.json({ success: true, contact: { id: ref.id, ...data } }, { status: 201 });
  } catch (error) {
    console.error('Create contact submission error:', error);
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
