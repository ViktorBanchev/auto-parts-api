import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';

export default function ProductsPage() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    if (isLoading) return <div>Loading catalog...</div>;
    if (error) return <div>Error loading catalog.</div>;

    return (
        <main className={styles.catalogContainer}>
            <h1 className={styles.catalogTitle}>All Auto Parts</h1>

            <div className={styles.productGrid}>
                {products?.map((product: any) => (
                    <ProductCard key={product.slug} {...product} />
                ))}
            </div>
        </main>
    );
}