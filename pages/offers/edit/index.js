import {useState} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { Button, Card, Input, Select, DatePicker, SelectWithCheckbox } from "components";
import styles from 'styles/pages/addOffer.module.scss';

export default function EditOffer() {
    const [cardType, setCardType] = useState('');
    const [status, setStatus] = useState('');
    const [clinic, setClinic] = useState('');
    const [admin, setAdmin] = useState([]);

    return <>
    <div className={styles.offersContainer}>
        <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
                <h3>Offers</h3>
            </div>
            <div className={styles.headerRight}>
                <Breadcrumbs
                    omitRootLabel={true}
                    listClassName={styles.breadcrumbs}
                    replaceCharacterList={[{ from: '_', to: ' ' }]}
                />
            </div>
        </div>
        <Card className={styles.offerBody}>
            <div className={styles.offerHeader}>
                <h2>Edit Offer</h2>
            </div>
            <div className={styles.offerBlock_2}>
                    <Input 
                        label="Offer Name"
                        labelStyle="outside"
                        className={styles.defaultInput}
                        value="Cashback"
                    />
                    <Input 
                        label="Category"
                        labelStyle="outside"
                        className={styles.defaultInput}
                        value="Discount"
                    />
                    <Select
                        label="Status"
                        labelStyle="outside"
                        className={styles.defaultInput}
                        options={[
                            {
                                label: "Finished",
                                value: "1",
                            },
                            { label: "In Progress", value: "2" },
                            ]}
                        onChange={(value) => {
                            setStatus(value);
                        }}
                        value={status}
                    />
                    <DatePicker
                        mode="single"
                        label="Start date"
                        className={styles.defaultInput}
                        value="11.02.2000"
                    />
                    <DatePicker
                        mode="single"
                        label="End date"
                        className={styles.defaultInput}
                        value="11.02.2000"
                    />
                    <Select
                        label="Card type"
                        labelStyle="outside"
                        className={styles.defaultInput}
                        options={[
                            {
                                label: "Gold",
                                value: "1",
                            },
                            { label: "Bronze", value: "2" },
                            ]}
                        onChange={(value) => {
                            setCardType(value);
                        }}
                        value={cardType}
                    />
            </div>
            <div className={styles.offerBlock}>
                <div className={styles.mini_block}>
                    <Select
                        label="Admin"
                        labelStyle="outside"
                        className={styles.input}
                        options={[
                            {
                                label: "11 Simon Chikovani St",
                                value: "1",
                            },
                            { label: "Another Branch", value: "2" },
                            ]}
                        onChange={(value) => {
                            setAdmin(value);
                        }}
                        value={admin}
                    />
                    <Select
                        label="Clinic"
                        labelStyle="outside"
                        options={[
                            {
                                label: "11 Simon Chikovani St",
                                value: "1",
                            },
                            { label: "Another Branch", value: "2" },
                            ]}
                        onChange={(value) => {
                            setClinic(value);
                        }}
                        value={clinic}
                    />
                </div>
                <div className={styles.descriptionBlock}>
                    <Input
                        label="Short description"
                        type="text"
                        multiline
                        className={styles.description}
                        value="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                    />
                </div>
            </div>
            <div className={styles.buttons}>
                <Button label="Cancel" size="large" variant="outline" />
                <Button label="Save" size="large" variant="fill" />
            </div>
        </Card>
    </div>
    </>
}

EditOffer.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};