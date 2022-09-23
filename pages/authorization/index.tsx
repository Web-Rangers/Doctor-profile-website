import { Button, Input } from 'components/inputs';
import Link from 'next/link';
import styles from 'styles/pages/authorization.module.scss';

export default function Authorization() {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.text}>
                    <div className={styles.welcomeText}>
                        Welcome to Asclepius
                    </div>
                    <div className={styles.descText}>
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Amet minim mollit non deserunt
                        ullamco est sit aliqua dolor do amet sint
                    </div>
                </div>
            </div>
            <div className={styles.signInContainer}>
                <div className={styles.signIn}>
                    <h3 className={styles.signInTitle}>Log In</h3>
                    <Input
                        className={styles.input}
                        label="Email"
                        placeholder="Enter your email..."
                    />
                    <Input
                        className={styles.input}
                        label="Password"
                        type="password"
                        placeholder="Enter your password..."
                    />
                    <div className={styles.forgot}>
                        <Link href="/reset_password">Forgot password?</Link>
                    </div>
                    <div className={styles.actions}>
                        <Link href="/">
                            <Button
                                label="Log In"
                                size="large"
                                className={styles.signInBtn}
                                variant="fill"
                            />
                        </Link>
                    </div>
                    <div className={styles.row}>
                        <span>{`Don't have account?`}</span>
                        <Link href="/sign-up">
                            <Button
                                className={styles.sgnUpBtn}
                                label="Registration"
                                size="large"
                                variant="text"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
