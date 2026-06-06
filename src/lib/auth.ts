import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_secret_key_2026_super_secure_hash';

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export function verifyAuth(req: NextRequest): DecodedToken | null {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
}
