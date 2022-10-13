import styles from 'styles/pages/signup.module.scss';
import { Card } from 'components';
import { ReactSVG } from 'react-svg';

export default function Start({setStep}) {
    return (
        <Card
            cardTitle="Select type of employment"
            className={styles.startCard}
        >
            <div className={styles.startContainer}>
                <div className={styles.startActions}>
                    <div
                        className={styles.startAction}
                        onClick={() => {
                            setStep((origin) => origin + 1);
                        }}
                    >
                        <div className={styles.icon}>
                            <ReactSVG src={'/images/signUp/selfEmp.svg'} />
                        </div>
                        <div className={styles.title}>Self-employed</div>
                        <ReactSVG
                            src={'/images/signUp/arrowRight.svg'}
                            className={styles.arrow}
                        />
                    </div>
                    <div
                        className={styles.startAction}
                        onClick={() => {
                            setStep((origin) => origin + 1);
                        }}
                    >
                        <div className={styles.icon}>
                            <ReactSVG
                                src={'/images/signUp/companyMemb.svg'}
                            />
                        </div>
                        <div className={styles.title}>Company member</div>
                        <ReactSVG
                            src={'/images/signUp/arrowRight.svg'}
                            className={styles.arrow}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};