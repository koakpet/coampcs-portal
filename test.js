const { Pool } = require('pg');

// HARDCODE your credentials here
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'coampcs_db',
    user: 'postgres',
    password: 'Udu128em', // CHANGE THIS to your actual password
});

console.log('1. Trying to connect...');

pool.connect()
    .then(client => {
        console.log('2. Connected successfully!');
        return client.query('SELECT NOW() as time')
            .then(result => {
                console.log('3. Query result:', result.rows[0]);
                client.release();
                return pool.end();
            });
    })
    .then(() => {
        console.log('4. Done!');
    })
    .catch(err => {
        console.error('Error:', err.message);
        console.error('Error code:', err.code);
    });