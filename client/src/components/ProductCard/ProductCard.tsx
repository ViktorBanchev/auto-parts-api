import { Link } from "react-router";
import type { Product } from "../../services/productService";
import { useCartStore } from "../../store/cartStore";
import styles from './ProductCard.module.css'

export default function ProductCard(product: Product) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart(product)
    }

    return (
        <article key={product.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
                <Link to={`/products/${product.slug}`}>
                    <img src={product.image_url} alt={product.title} className={styles.productImage} />
                </Link>
            </div>

            <div className={styles.productInfo}>
                <Link to={`/products/${product.slug}`}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                </Link>
                <p className={styles.productPrice}>${product.price}</p>
                <button onClick={handleAddToCart} className={styles.addToCartBtn}>Add to Cart</button>
            </div>
        </article>
    )
};
