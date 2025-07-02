import { NextApiRequest, NextApiResponse } from "next";
import { sql, poolPromise } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { typeId } = req.query;

  if (!typeId) {
    return res.status(400).json({ error: "Missing typeId query param" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("typeId", sql.Int, Number(typeId))
      .query(`
        SELECT SizeValue, Stock
        FROM Size
        WHERE TypeID = @typeId AND SizeValue BETWEEN 36 AND 46
        ORDER BY SizeValue ASC
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la interogare" });
  }
}
