import { sql, poolPromise } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { sneakerId } = req.query;

    if (!sneakerId) {
      return res.status(400).json({ error: 'Lipsește parametru sneakerId' });
    }

    const pool = await poolPromise;

    const result = await pool.request()
      .input('sneakerId', sql.Int, parseInt(sneakerId))
      .query(`
        SELECT TypeID, TypeName, SneakerID, Image1, Price
        FROM sneakers_type
        WHERE SneakerID = @sneakerId
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Eroare la interogare' });
  }
}
