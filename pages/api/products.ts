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
      SELECT
        st.TypeID AS id,
        s.ModelName AS name,
        b.BrandName AS brand,
        st.TypeName AS color,
        st.Price AS pret,
        st.Image1 AS src,
        st.Image2 AS src2,
        st.Image3 AS src3,
        st.Image4 AS src4,
        st.SneakerID AS sneakerId
      FROM Sneakers_Type st
      JOIN Sneakers s ON st.SneakerID = s.SneakerID
      JOIN Brands b ON s.BrandID = b.BrandID
    `);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Eroare la interogare:', error);
    res.status(500).json({ error: 'Eroare la interogare' });
  }
}
