import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'db-6225-g4.cluster-c7884y4gw831.us-east-1.rds.amazonaws.com', 
  user: 'admin',      
  password: 'Y3vsMaSzcrV5jYhT4dto', 
  database: 'group4db', 

  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // connectTimeout: 10000
});

// Use promise
const db = pool.promise();

export default db; 