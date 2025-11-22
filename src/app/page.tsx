import { createClient } from '@/utils/supabase/server';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export const revalidate = 0; // Disable caching for demo purposes

export default async function Home() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'red' }}>Error loading products.</h2>
        <p>Please ensure the database is set up and seeded.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Upgrade Your Remote Setup
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', maxWidth: '600px', margin: '0 auto' }}>
          Curated equipment for the ultimate work-from-home experience.
        </p>
      </section>

      <section style={{ paddingBottom: '4rem' }}>
        {products && products.length > 0 ? (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}>
            <p style={{ fontSize: '1.25rem' }}>No products found.</p>
            <p style={{ marginTop: '0.5rem', color: 'var(--muted-foreground)' }}>Please run the seed script in your Supabase dashboard.</p>
          </div>
        )}
      </section>
    </div>
  );
}
