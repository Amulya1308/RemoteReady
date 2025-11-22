"use client";

import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

export default function WishlistButton({ product }: { product: Product }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [inWishlist, setInWishlist] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setInWishlist(isInWishlist(product.id));
    }, [isInWishlist, product.id]);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating if inside a link
        e.stopPropagation();

        if (inWishlist) {
            removeFromWishlist(product.id);
            setInWishlist(false);
        } else {
            addToWishlist(product);
            setInWishlist(true);
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleWishlist}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: inWishlist ? 'red' : 'var(--muted-foreground)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            {inWishlist ? '♥' : '♡'}
        </button>
    );
}
