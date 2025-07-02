import sql from 'mssql';

const config = {
  user: 'nextjs',
  password: 'Parola123!',
  server: 'localhost',
  port: 1433,
  database: 'Market_sql',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Conectat la SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Eroare la conectare:', err);
    throw err;
  });

export { sql, poolPromise };
