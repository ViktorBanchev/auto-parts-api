import { Link, useNavigate } from "react-router";
import styles from './NavBar.module.css'
import { useAuthStore } from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";
import { useCartStore } from "../../store/cartStore";
import type React from "react";
import { useState } from "react";

export default function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout} = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const cartItems = useCartStore((state) => state.items);

    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            logout();
            navigate('/');
        },
        onError: (error) => {
            console.error('Error during logout', error)
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    }

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault();

        const trimmedSearch = searchTerm.trim();

        if (trimmedSearch) {
            navigate(`/products?search=${encodeURIComponent(trimmedSearch)}`);
            setSearchTerm('');
        } else {
            navigate('/products')
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <a href="/" className={styles.logo}>AutoParts</a>
            </div>

            <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchField}
                    placeholder="Search parts..."
                />
                <button className={styles.searchBtn}>Search</button>
            </form>

            <ul className={styles.navLinks}>
                <li><Link to="/" className={styles.link}>Home</Link></li>
                <li><Link to="/products" className={styles.link}>Products</Link></li>
                <li><Link to="/cart" className={styles.cartButton}>Cart ({totalItemsCount})</Link></li>
                {isAuthenticated ?
                    (
                        <>
                            <li className={styles.greeting}>Hello, {user?.firstName}</li>
                            <li>
                                <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) :
                    (
                        <>
                            <li><Link to="/login" className={styles.link}>Sign in</Link></li>
                            <li><Link to="/register" className={styles.link}>Sign up</Link></li>
                        </>
                    )
                }

            </ul>
        </nav>
    )
};
