// pages/api/auth/signin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import sql from 'mssql';

const config = {
  user: 'nextjs',
  password: 'Parola123!',
  server: 'localhost',
  database: 'Market_sql',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM users WHERE email = ${email}`;
if (result.recordset.length === 0) {
  return res.status(401).json({ error: 'Email or password invalid' });
}
const user = result.recordset[0];

// Folosește exact numele coloanei din DB
const isMatch = await bcrypt.compare(password, user.PasswordHash);
if (!isMatch) {
  return res.status(401).json({ error: 'Email or password invalid' });
}

    // Dacă vrei, aici poți genera un JWT sau seta sesiune
    // Pentru moment, doar trimitem răspunsul pozitiv

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
