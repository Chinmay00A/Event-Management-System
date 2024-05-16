const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'radhika@90',
    database: 'event_management_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const query = async (sql, values) => {
    const connection = await pool.getConnection();
    try {
        const [rows, fields] = await connection.query(sql, values);
        return rows;
    } finally {
        connection.release();
        
    }
};

module.exports = { query };
