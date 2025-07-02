import type { NextApiRequest, NextApiResponse } from 'next';
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
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT SaleDate, TypeID, SneakerID, SizeSold, Quantity
      FROM Sales
      ORDER BY SaleDate DESC
    `);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
}