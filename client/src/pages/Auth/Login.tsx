import { Link, useLocation, useNavigate } from 'react-router';
import styles from './Auth.module.css'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const loginToStore = useAuthStore((state) => state.login);

    const from = location.state?.from?.pathname || '/'

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInputs>();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            loginToStore(data.user)
            navigate(from, { replace: true})
        },
        onError: (error: any) => {
            console.error(error.response?.data?.message)
        }
    });

    const onSubmit = (data: LoginFormInputs) => {
        loginMutation.mutate(data)
    }

    return (
        <main className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Welcome Back</h1>
                    <p className={styles.authSubtitle}>Sign in to your account to continue</p>
                </div>

                {loginMutation.isError && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {loginMutation.error?.response?.data?.message || 'Error occured'}
                </div>
            )}

                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            id="email"
                            className={styles.input}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email'
                                }
                            })}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.passwordLabelRow}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            id="password"
                            className={styles.input}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password should be at least 6 chars long'
                                }
                            })}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? 'Loading...' : 'Sign in'}
                        </button>
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