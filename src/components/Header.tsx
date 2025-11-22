import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
    return (
        <header style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'sticky', top: 0, backgroundColor: 'var(--background)', zIndex: 10 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    RemoteReady
                </Link>
                <nav>
                    <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none' }}>
                        <li>
                            <Link href="/" style={{ fontWeight: 500 }}>Shop</Link>
                        </li>
                        <li>
                            <Link href="/wishlist" style={{ fontWeight: 500 }}>Wishlist</Link>
                        </li>
                        <li>
                            <CartIcon />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
