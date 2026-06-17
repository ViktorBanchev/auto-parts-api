import { useCartStore } from "../../store/cartStore"
import { Link, useNavigate } from "react-router";
import styles from './Cart.module.css'

interface CartProps {

}

export default function Cart({ }: CartProps) {
    const navigate = useNavigate();
    const { items, clearCart, updateQuantity, removeFromCart } = useCartStore();

    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className={styles.cartContainer}>
                <div className={styles.emptyCart}>
                    <h2>Your cart is empty 🛒</h2>
                    <p>Add some auto parts to get started.</p>
                    <Link to="/products" className={styles.browseBtn}>
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className={styles.cartContainer}>
            <h1 className={styles.cartTitle}>Shopping Cart</h1>

            <div className={styles.itemsList}>
                {items.map((item) => (
                    <div key={item.product.slug} className={styles.cartItem}>
                        <div className={styles.productInfo}>
                            <img
                                src={item.product.image_url}
                                alt={item.product.title}
                                className={styles.productImage}
                            />
                            <div className={styles.productDetails}>
                                <h3>{item.product.title}</h3>
                                <p className={styles.productPrice}>Price: ${item.product.price.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className={styles.itemMeta}>
                            <div className={styles.quantityContainer}>
                                <button
                                    onClick={() => updateQuantity(item.product.slug, 'decrease')}
                                    className={styles.quantityBtn}
                                    title="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className={styles.quantityValue}>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product.slug, 'increase')}
                                    className={styles.quantityBtn}
                                    title="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <div className={styles.itemTotal}>
                                <p className={styles.itemTotalAmount}>
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.product.slug)}
                                className={styles.removeBtn}
                                title="Remove from Cart"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.cartSummary}>
                <button onClick={clearCart} className={styles.clearBtn}>
                    Clear Cart
                </button>

                <div className={styles.checkoutBlock}>
                    <p className={styles.totalPriceTitle}>Total Price</p>
                    <h2 className={styles.totalPriceAmount}>${totalPrice.toFixed(2)}</h2>
                    <button onClick={() => navigate('/checkout')} className={styles.checkoutBtn}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </main>
    )
};
