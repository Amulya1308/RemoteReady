const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../../.env.local');
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log(envContent);
} catch (e) {
    console.error('Could not read .env.local');
}
