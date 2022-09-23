import { Button, Input } from 'components/inputs';
import Link from 'next/link';
import aStyles from 'styles/pages/authorization.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import { Card } from 'components';

export default function ResetPassword() {
    return (
        <div className={classNames(aStyles.container, aStyles.reset)}>
            <h1 className={classNames(aStyles.title)}>Asclepius</h1>
            <Card
                className={classNames(aStyles.signInContainer, aStyles.reset)}
            >
                <div className={aStyles.signIn}>
                    <h3 className={aStyles.signInTitle}>Forgot Password?</h3>

                    <Input
                        className={aStyles.input}
                        label="Email"
                        placeholder="Enter your email..."
                    />

                    <div className={aStyles.actions}>
                        <Link href="/">
                            <Button
                                label="Send"
                                size="large"
                                className={aStyles.signInBtn}
                                variant="fill"
                            />
                        </Link>
                        <Link href="/authorization">
                            <Button
                                className={aStyles.cancelBtn}
                                label="Back to log in"
                                size="large"
                                variant="text"
                            />
                        </Link>
                    </div>
                </div>
            </Card>
            <Card
                className={classNames(aStyles.signInContainer, aStyles.reset)}
            >
                <p>
                    If you are self-employed or a clinic administrator, you will
                    receive a password recovery email automatically.
                </p>
                <p>
                    Clinic employees must wait for confirmation to change the
                    password from the clinic administration. If successful, you
                    will receive an email notification.
                </p>
            </Card>
            <div className={aStyles.row}>
                <span>{`Don't have account?`}</span>
                <Link href="/sign-up">
                    <Button
                        className={aStyles.sgnUpBtn}
                        label="Registration"
                        size="large"
                        variant="text"
                    />
                </Link>
            </div>
        </div>
    );
}
