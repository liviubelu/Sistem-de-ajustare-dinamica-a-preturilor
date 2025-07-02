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
  
  const { email, password, firstName, lastName, age } = req.body;

  if (!email || !password || !firstName || !lastName || !age) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await sql.connect(config);

    // Verifică dacă emailul există deja
    const checkUser = await sql.query`SELECT * FROM users WHERE email = ${email}`;
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hashează parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserează userul
    await sql.query`
      INSERT INTO users (email, passwordHash, firstName, lastName, age)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${age})
    `;

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
