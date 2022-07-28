import {Card} from 'components';
import { ReactSVG } from "react-svg";
import styles from 'styles/components/Tabs/ContactAndBillTab.module.scss';

export default function ContactAndBillTab() {
    return <>
        <div className={styles.cardColumns}>
            <Card 
                className={styles.colCard}
                cardTitle="Contact"
            >
                <div className={styles.cardInfo}>
                    <div>
                        <h2>Contact name</h2>
                        <span>Courtney Henry</span>
                    </div>
                    <div>
                        <h2>Contact email</h2>
                        <span>company@gmail.com</span>
                    </div>
                    <div>
                        <h2>Contact phone</h2>
                        <span>(603) 555-0123</span>
                    </div>
                </div>
            </Card>
            <Card 
                className={styles.colCard}
                cardTitle="Billing information"
            >
                <div className={styles.cardInfo}>
                    <div>
                        <h2>Billing email</h2>
                        <span>billin_email@gmail.com</span>
                    </div>
                    <div>
                        <h2>Billing date</h2>
                        <span>12.04.2022</span>
                    </div>
                </div>
            </Card>
        </div>
    </>
}