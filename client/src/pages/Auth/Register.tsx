import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../services/authService';
import { registerSchema, type RegisterFormInputs } from '../../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/authStore';

export default function RegisterPage() {
    const navigate = useNavigate();

    const loginToStore = useAuthStore((state) => state.login)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema)
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            loginToStore(data.user)
            navigate('/')
        },
        onError: (error: any) => {
            console.error(error.response?.data?.message)
        }
    })

    const onSubmit = (data: RegisterFormInputs) => {
        const { confirmPassword, ...dataNoConfirm } = data;
        registerMutation.mutate(dataNoConfirm);
    }

    return (
        <main className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Create an Account</h1>
                    <p className={styles.authSubtitle}>Join AutoParts to start shopping</p>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="firstName" className={styles.label}>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className={styles.input}
                            placeholder="John Doe"
                            {...register('firstName')}
                        />
                        {errors.firstName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.firstName.message}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="lastName" className={styles.label}>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className={styles.input}
                            placeholder="John Doe"
                            {...register('lastName')}

                        />
                        {errors.lastName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.lastName.message}</span>}

                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="you@example.com"
                            {...register('email')}
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Create a strong password"
                            {...register('password')}
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}

                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={styles.input}
                            placeholder="Retype the same password"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword.message}</span>}

                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? 'Creating Account...' : 'Create account'}
                    </button>
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