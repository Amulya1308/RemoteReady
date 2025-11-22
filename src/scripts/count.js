const { Client } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter Connection String: ', async (connectionString) => {
    const client = new Client({
        connectionString: connectionString.trim(),
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const res = await client.query('SELECT COUNT(*) FROM products');
        console.log(`COUNT: ${res.rows[0].count}`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
        rl.close();
        process.exit(0);
    }
});
