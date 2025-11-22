import { createClient } from '@/utils/supabase/server';
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';
import WishlistButton from '@/components/WishlistButton';
import Link from 'next/link';

export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--muted-foreground)' }}>
                &larr; Back to Shop
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                    <img
                        src={product.image_url}
                        alt={product.name}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '2rem' }}>
                        ${product.price}
                    </p>

                    <div style={{ marginBottom: '2rem', lineHeight: '1.8', color: 'var(--muted-foreground)' }}>
                        {product.description}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Availability:</p>
                        {product.stock > 0 ? (
                            <span style={{ color: 'green', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'green' }}></span>
                                In Stock ({product.stock} available)
                            </span>
                        ) : (
                            <span style={{ color: 'red' }}>Out of Stock</span>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <AddToCartButton product={product} />
                        <WishlistButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
