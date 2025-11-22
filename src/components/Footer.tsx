export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', marginTop: 'auto', backgroundColor: 'var(--muted)' }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>
                <p>&copy; {new Date().getFullYear()} LuxeStore. All rights reserved.</p>
            </div>
        </footer>
    );
}
