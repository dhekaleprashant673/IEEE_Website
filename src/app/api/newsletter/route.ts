import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const snapshot = await db.collection('newsletter_subscribers').orderBy('createdAt', 'desc').get();
    const subscribers = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      };
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const existing = await db.collection('newsletter_subscribers').where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    const data = { email, createdAt: new Date() };
    const ref = await db.collection('newsletter_subscribers').add(data);

    return NextResponse.json({ success: true, subscriber: { id: ref.id, email, createdAt: data.createdAt } }, { status: 201 });
  } catch (error) {
    console.error('Create newsletter subscriber error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Subscriber ID is required' }, { status: 400 });
    }

    await db.collection('newsletter_subscribers').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}
