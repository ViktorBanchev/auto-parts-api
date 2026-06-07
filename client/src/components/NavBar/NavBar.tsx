import { Link } from "react-router";
import styles from './NavBar.module.css'

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <a href="/" className={styles.logo}>AutoParts</a>
            </div>

            <ul className={styles.navLinks}>
                <li><Link to="/" className={styles.link}>Home</Link></li>
                <li><Link to="/products" className={styles.link}>Products</Link></li>
                <li><Link to="/cart" className={styles.cartButton}>Cart (0)</Link></li>
                <li><Link to="/login" className={styles.link}>Sign in</Link></li>
            </ul>
        </nav>
    )
};
