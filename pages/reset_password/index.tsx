import { Button, Input } from "components/inputs";
import Link from "next/link";
import aStyles from "styles/pages/authorization.module.scss";
import Image from 'next/image';

export default function ResetPassword() {
    return (
        <div className={aStyles.container}>
            <div className={aStyles.imageContainer}>
                <Image src="/images/authorization/reset.png" alt="reset password" className={aStyles.image} />
            </div>
            <div className={aStyles.signInContainer}>
                <div className={aStyles.signIn}>
                    <h3 className={aStyles.signInTitle}>Forgot Password?</h3>
                    <p>
                        If you are self-employed or a clinic administrator, you will receive a password recovery email automatically.
                    </p>
                    <p>
                        Clinic employees must wait for confirmation to change the password from the clinic administration. If successful, you will receive an email notification.
                    </p>
                    <Input className={aStyles.input} label="Email" placeholder="Enter your email..." />

                    <div className={aStyles.actions}>
                        <Link href="/">
                            <Button label="Send" size="large" className={aStyles.signInBtn} variant="fill" />
                        </Link>
                        <Link href="/authorization">
                            <Button className={aStyles.cancelBtn} label="Cancel" size="large" variant="text" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}      