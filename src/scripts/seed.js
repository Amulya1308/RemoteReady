const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Load env vars manually since we don't want to depend on dotenv
const envPath = path.resolve(__dirname, '../../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
        acc[key.trim()] = value.trim();
    }
    return acc;
}, {});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    {
        name: 'Premium Wireless Headphones',
        description: 'High-fidelity sound with noise cancellation.',
        price: 299.99,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        stock: 50
    },
    {
        name: 'Ergonomic Office Chair',
        description: 'Comfortable chair for long work hours.',
        price: 199.50,
        image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
        stock: 20
    },
    {
        name: 'Smart Watch Series 5',
        description: 'Track your fitness and stay connected.',
        price: 399.00,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        stock: 35
    },
    {
        name: 'Mechanical Keyboard',
        description: 'Tactile feedback for professional typists.',
        price: 129.99,
        image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
        stock: 100
    },
    {
        name: '4K Monitor 27"',
        description: 'Crystal clear display for creatives.',
        price: 450.00,
        image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
        stock: 15
    },
    {
        name: 'Gaming Mouse',
        description: 'Precision tracking and RGB lighting.',
        price: 59.99,
        image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
        stock: 75
    },
    {
        name: 'Studio Quality Microphone',
        description: 'Crystal clear audio for calls and recording.',
        price: 149.99,
        image_url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
        stock: 40
    },
    {
        name: 'Desktop Speakers',
        description: 'Immersive sound for your workspace.',
        price: 89.99,
        image_url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
        stock: 30
    },
    {
        name: 'LED Desk Lamp',
        description: 'Adjustable brightness and color temperature.',
        price: 45.00,
        image_url: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
        stock: 60
    },
    {
        name: 'Ergonomic Laptop Stand',
        description: 'Improve posture and cooling.',
        price: 35.50,
        image_url: 'https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=800&q=80',
        stock: 100
    }
];

async function seed() {
    console.log('Clearing existing products...');
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    if (deleteError) {
        console.error('Error clearing products:', deleteError.message);
    } else {
        console.log('Existing products cleared.');
    }

    console.log('Seeding products...');

    const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select();

    if (error) {
        console.error('Error seeding products:', error.message);
        if (error.message.includes('relation "products" does not exist')) {
            console.error('\nCRITICAL: The "products" table does not exist.');
            console.error('You MUST run the "supabase/schema.sql" script in your Supabase Dashboard SQL Editor first.');
        }
    } else {
        console.log(`Successfully inserted ${data.length} products.`);
    }
}

seed();
