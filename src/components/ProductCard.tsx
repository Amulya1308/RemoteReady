import Link from 'next/link';
import { Product } from '@/types';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                {product.image_url && (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2 }}>
                    <WishlistButton product={product} />
                </div>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>
                    {product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>${product.price}</span>
                    <Link href={`/products/${product.id}`} className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
