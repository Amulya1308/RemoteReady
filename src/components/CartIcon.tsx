"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartIcon() {
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link href="/cart" style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
            Cart
            {itemCount > 0 && (
                <span style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                }}>
                    {itemCount}
                </span>
            )}
        </Link>
    );
}
