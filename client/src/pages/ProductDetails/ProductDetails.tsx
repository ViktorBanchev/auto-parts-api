import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../../services/productService';
import { useCartStore } from '../../store/cartStore';
import styles from './ProductDetailPage.module.css';

export default function ProductDetails() {
    const { slug } = useParams<{ slug: string }>();
    const addToCart = useCartStore((state) => state.addToCart);

    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProductBySlug(slug!),
        enabled: !!slug,
    });

    if (isLoading) return <div className={styles.loading}>Loading product details...</div>;
    if (error || !product) return <div className={styles.error}>Product not found.</div>;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.productWrapper}>
                <div className={styles.imageSection}>
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className={styles.image}
                    />
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>${Number(product.price).toFixed(2)}</p>

                    <div className={styles.stockStatus}>
                        <span className={styles.stockDot}></span>
                        <span>In Stock - Ships Tomorrow</span>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.descriptionBlock}>
                        <h2>Description</h2>
                        <p className={styles.description}>{product.description}</p>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.actionArea}>
                        <div className={styles.quantityBox}>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >
                                −
                            </button>
                            <span className={styles.qtyValue}>{quantity}</span>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQuantity(q => q + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className={styles.addToCartBtn}
                        >
                            Add to Cart 🛒
                        </button>

                    </div>
                </div>

            </div>
        </main>
    );
}