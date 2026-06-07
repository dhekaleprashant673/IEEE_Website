import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key_2026_super_secure_hash';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const usersSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (usersSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const userDoc = usersSnapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() } as {
      id: string;
      email: string;
      password: string;
      name: string;
      role: string;
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
    response.cookies.set('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24, path: '/' });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
