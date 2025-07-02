import { sql, poolPromise } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT s.SneakerID, s.ModelName, b.BrandName
      FROM Sneakers s
      LEFT JOIN Brands b ON s.BrandID = b.BrandID
    `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Eroare la interogare:', err);
    res.status(500).json({ error: 'Eroare la interogare', details: err.message });
  }
}
