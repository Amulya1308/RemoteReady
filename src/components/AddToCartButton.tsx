"use client";

import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn btn-primary"
            style={{
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                width: '100%',
                opacity: product.stock === 0 ? 0.5 : 1,
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
            }}
        >
            {product.stock === 0 ? 'Out of Stock' : added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    );
}
