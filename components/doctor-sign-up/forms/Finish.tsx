import { Button, Input, Select, Card, DatePicker } from 'components';
import styles from 'styles/pages/signup.module.scss';

export default function Finish() {
    return (
        <Card className={styles.card}>
            <div className={styles.finishContainer}>
                <img alt='' src="/images/signUp/finish.png" />
                <div className={styles.finishText}>
                    Thank you for the information provided, our operators
                    are currently processing it. After processing, our
                    operator will contact you
                </div>
                <Button variant="fill" label="Finish" size="large" />
            </div>
        </Card>
    );
};