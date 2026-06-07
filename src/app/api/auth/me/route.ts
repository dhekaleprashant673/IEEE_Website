import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyAuth(request);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userDoc = await db.collection('users').doc(decoded.id).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const data = userDoc.data()!;
    const user = { id: userDoc.id, name: data.name, email: data.email, role: data.role };

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
