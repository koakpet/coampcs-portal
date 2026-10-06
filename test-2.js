const net = require('net');

const client = net.createConnection({ 
    host: 'localhost', 
    port: 5432 
});

client.on('connect', () => {
    console.log('✅ Can reach PostgreSQL on port 5432');
    client.end();
});

client.on('error', (err) => {
    console.log('❌ Cannot reach PostgreSQL:', err.message);
});

client.setTimeout(3000, () => {
    console.log('❌ Connection timed out');
    client.destroy();
});