const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n--- Database Setup ---');
console.log('To run this, you need your Connection String from Supabase Settings -> Database -> Connection string -> URI');
console.log('It looks like: postgres://postgres.xxxx:password@aws-0-region.pooler.supabase.com:6543/postgres\n');

rl.question('Enter your Connection String: ', async (connectionString) => {
    if (!connectionString) {
        console.error('Connection string is required.');
        rl.close();
        process.exit(1);
    }

    const client = new Client({
        connectionString: connectionString.trim(),
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Connecting to database...');
        await client.connect();

        console.log('Running schema.sql...');
        const schemaSql = fs.readFileSync(path.join(__dirname, '../../supabase/schema.sql'), 'utf8');
        try {
            await client.query(schemaSql);
            console.log('✅ Schema created successfully.');
        } catch (err) {
            console.log('⚠️ Schema creation failed (tables might already exist), proceeding to seed...');
            console.error(err.message);
        }

        console.log('Running seed.sql...');
        const seedSql = fs.readFileSync(path.join(__dirname, '../../supabase/seed.sql'), 'utf8');
        await client.query(seedSql);
        console.log('✅ Seed data inserted successfully.');

        const res = await client.query('SELECT COUNT(*) FROM products');
        console.log(`\n📊 Total products in database: ${res.rows[0].count}`);

        console.log('\nDone! You can now refresh the website.');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
        rl.close();
        process.exit(0);
    }
});
