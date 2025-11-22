BEGIN;

-- Clear existing data (handling foreign keys)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;

-- Insert products
INSERT INTO products (name, description, price, image_url, stock) VALUES
    ('Premium Wireless Headphones', 'High-fidelity sound with noise cancellation.', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 50),
    ('Ergonomic Office Chair', 'Comfortable chair for long work hours.', 199.50, 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80', 20),
    ('Smart Watch Series 5', 'Track your fitness and stay connected.', 399.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 35),
    ('Mechanical Keyboard', 'Tactile feedback for professional typists.', 129.99, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', 100),
    ('4K Monitor 27"', 'Crystal clear display for creatives.', 450.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', 15),
    ('Gaming Mouse', 'Precision tracking and RGB lighting.', 59.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', 75),
    ('Studio Quality Microphone', 'Crystal clear audio for calls and recording.', 149.99, 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80', 40),
    ('Desktop Speakers', 'Immersive sound for your workspace.', 89.99, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80', 30),
    ('LED Desk Lamp', 'Adjustable brightness and color temperature.', 45.00, 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80', 60),
    ('Ergonomic Laptop Stand', 'Improve posture and cooling.', 35.50, 'https://images.unsplash.com/photo-1616353071588-708dcff912e2?w=800&q=80', 100);

COMMIT;
