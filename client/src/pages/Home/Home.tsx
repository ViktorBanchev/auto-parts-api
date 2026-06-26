import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/productService"
import styles from './Home.module.css'
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Home() {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(null, null, 1, 3)
    });
    
    if (isLoading) return <div>Loading featured parts...</div>;
    // if (error) return <div>Error loading products.</div>;

    return (
        <main className={styles.homeContainer}>
            <header className={styles.homeContainer}>
                <h1 className={styles.pageTitle}>Welcome to AutoParts</h1>
                <p className={styles.subtitle}>Premium auto parts in one place</p>
            </header>

            <section className={styles.productsSection}>
                <h2 className={styles.sectionTitle}>Featured Products</h2>

                <div className={styles.productsGrid}>
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </section>
        </main>
    )
};
