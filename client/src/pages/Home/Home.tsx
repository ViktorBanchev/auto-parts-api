import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/productService"
import styles from './Home.module.css'

const staticProducts = [
    {
        id: 1,
        title: 'Brembo Brake Pads',
        price: '125.50',
        image: '[https://via.placeholder.com/250?text=Brake+Pads](https://via.placeholder.com/250?text=Brake+Pads)'
    },
    {
        id: 2,
        title: 'Bosch Oil Filter',
        price: '18.90',
        image: '[https://via.placeholder.com/250?text=Oil+Filter](https://via.placeholder.com/250?text=Oil+Filter)'
    },
    {
        id: 3,
        title: 'Continental Timing Belt',
        price: '89.00',
        image: '[https://via.placeholder.com/250?text=Timing+Belt](https://via.placeholder.com/250?text=Timing+Belt)'
    }
];


export default function Home() {
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

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
                        <article key={product.id} className={styles.productCard}>
                            <div className={styles.imageWrapper}>
                                <img src={product.image_url} alt={product.title} className={styles.productImage} />
                            </div>

                            <div className={styles.productInfo}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <p className={styles.productPrice}>${product.price}</p>
                                <button className={styles.addToCartBtn}>Add to Cart</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
};
