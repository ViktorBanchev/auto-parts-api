import React from 'react';
import styles from './Auth.module.css'; // Използваме същия общ CSS файл
import { Link } from 'react-router';

export default function RegisterPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register form submitted!");
    };

    return (
        <main className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Create an Account</h1>
                    <p className={styles.authSubtitle}>Join AutoParts to start shopping</p>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            placeholder="John Doe"
                            required
                        />
                    </div>

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
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Create a strong password"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Create Account</button>
                </form>

                <div className={styles.authFooter}>
                    <p className={styles.footerText}>
                        Already have an account? <Link to="/login" className={styles.footerLink}>Sign in</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}