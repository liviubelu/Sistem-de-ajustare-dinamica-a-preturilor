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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  try {
    await sql.connect(config);
    const transaction = new sql.Transaction();
    await transaction.begin();

    try {
      for (const item of items) {
        const { typeId, sneakerId, size, quantity } = item;

        if (!sneakerId) {
    throw new Error(`SneakerID este null sau undefined pentru typeId ${typeId}`);
  }

        // Update stock și verifică dacă a modificat un rând
        const updateResult = await transaction.request()
          .input('typeId', sql.Int, typeId)
          .input('size', sql.Int, size)
          .input('quantity', sql.Int, quantity)
          .query(`
            UPDATE Size
            SET Stock = Stock - @quantity
            WHERE TypeID = @typeId AND SizeValue = @size AND Stock >= @quantity
          `);

        if (updateResult.rowsAffected[0] === 0) {
          throw new Error(`Insufficient stock for typeId ${typeId}, size ${size}`);
        }

        // Inserează în tabela Sales
        await transaction.request()
          .input('saleDate', sql.DateTime, new Date())
          .input('typeId', sql.Int, typeId)
          .input('sneakerId', sql.Int, sneakerId)
          .input('size', sql.Int, size)
          .input('quantity', sql.Int, quantity)
          .query(`
            INSERT INTO Sales (SaleDate, TypeID, SneakerID, SizeSold, Quantity)
            VALUES (@saleDate, @typeId, @sneakerId, @size, @quantity)
          `);
      }

      await transaction.commit();
      return res.status(200).json({ message: 'Order processed successfully' });
    } catch (error) {
      await transaction.rollback();
      console.error('Error processing order:', error);
      return res.status(500).json({ message: 'Error processing order', error: error.message });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Database connection error', error: error.message });
  }
}
