import { Link } from 'react-router';
import styles from './Footer.module.css'

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Основен грид с 4 колони */}
                <div className={styles.grid}>

                    {/* Колона 1: За нас */}
                    <div className={styles.column}>
                        <h3 className={styles.brand}>AutoParts Pro</h3>
                        <p className={styles.description}>
                            Your trusted partner for high-quality auto parts.
                            We offer a wide range of parts for all car makes and models.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#">FB</a>
                            <a href="#">IG</a>
                            <a href="#">TW</a>
                        </div>
                    </div>

                    {/* Колона 2: Бързи връзки */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Quick Links</h4>
                        <Link to="/" className={styles.link}>Home</Link>
                        <Link to="/products" className={styles.link}>All Products</Link>
                        <Link to="/about" className={styles.link}>About Us</Link>
                        <Link to="/blog" className={styles.link}>Blog</Link>
                    </div>

                    {/* Колона 3: Обслужване на клиенти */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Customer Service</h4>
                        <Link to="/shipping" className={styles.link}>Shipping & Payment</Link>
                        <Link to="/returns" className={styles.link}>Returns & Refunds</Link>
                        <Link to="/faq" className={styles.link}>FAQ</Link>
                        <Link to="/terms" className={styles.link}>Terms & Conditions</Link>
                    </div>

                    {/* Колона 4: Контакти */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contact Us</h4>
                        <div className={styles.contactItem}>
                            <span className={styles.icon}>📍</span>
                            <span>123 Example St, Sofia, Bulgaria</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.icon}>📞</span>
                            <span>+359 888 123 456</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.icon}>✉️</span>
                            <span>contact@autoparts.bg</span>
                        </div>
                    </div>

                </div>

                {/* Долна лента (Copyright) */}
                <div className={styles.bottomBar}>
                    <p>&copy; {currentYear} AutoParts Pro. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};
