import { Button, Input } from "components/inputs";
import Link from "next/link";
import styles from "styles/pages/authorization.module.scss";

export default function Authorization() {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src="/images/authorization/Authorization.png" alt="authorization" className={styles.image} />
            </div>
            <div className={styles.signInContainer}>
                <div className={styles.signIn}>
                    <h3 className={styles.signInTitle}>Sign In</h3>
                    <Input className={styles.input} label="Email" placeholder="Enter your email..." />
                    <Input className={styles.input} label="Password" type="password" placeholder="Enter your password..." />
                    <div className={styles.forgot}>
                        <Link href="/reset_password">
                            Forgot password?
                        </Link>
                    </div>
                    <div className={styles.actions}>
                        <Link href="/">
                            <Button label="Sign In" size="large" className={styles.signInBtn} variant="fill" />
                        </Link>
                        <span>
                            or
                        </span>
                        <Link href="/sign-up">
                            <Button className={styles.sgnUpBtn} label="Sign up now" size="large" variant="text" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}