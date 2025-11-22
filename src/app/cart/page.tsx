"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { items, removeFromCart, clearCart, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Cart is Empty</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--muted-foreground)' }}>Looks like you haven't added anything yet.</p>
                <Link href="/" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Shopping Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {items.map((item) => (
                        <div key={item.id} className="card" style={{ display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius)', overflow: 'hidden', flexShrink: 0 }}>
                                <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontWeight: 600 }}>{item.name}</h3>
                                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>${item.price} x {item.quantity}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ color: 'red', fontSize: '0.875rem', background: 'none', border: 'none', textDecoration: 'underline' }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        style={{ alignSelf: 'flex-start', marginTop: '1rem', color: 'var(--muted-foreground)', background: 'none', border: 'none', textDecoration: 'underline' }}
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link href="/checkout" className="btn btn-primary" style={{ width: '100%' }}>
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
