import { Link } from 'react-router';
import styles from './Auth.module.css'

export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login form submitted!");
    };

    return (
        <main className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Welcome Back</h1>
                    <p className={styles.authSubtitle}>Sign in to your account to continue</p>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.passwordLabelRow}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Sign In</button>
                </form>

                <div className={styles.authFooter}>
                    <p className={styles.footerText}>
                        Don't have an account? <Link to="/register" className={styles.footerLink}>Sign up here</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}