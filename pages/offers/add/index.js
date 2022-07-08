import {useState} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { Button, Card, Input, Select, DatePicker, SelectWithCheckbox } from "components";
import styles from 'styles/pages/addOffer.module.scss';

export default function AddOffer() {
    const [service, setService] = useState('');
    const [doctors, setDoctors] = useState('');
    const [branch, setBranch] = useState('');
    const [cardType, setCardType] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [status, setStatus] = useState('');
    const [clientType, setClientType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [checkedDoctors, setCheckedDoctors] = useState([]);

    const doctorsData = [
        {
            id: 0,
            name: 'Annette Black',
        },
        {
            id: 1,
            name: 'Marvin McKinney',
        },
        {
            id: 2,
            name: 'Dianne Russell',
        },
        {
            id: 3,
            name: 'Jenny Wilson',
        },
        {
            id: 4,
            name: 'Cameron Williamson',
        },
        {
            id: 5,
            name: 'Guy Hawkins',
        },
        {
            id: 6,
            name: 'Robert Fox',
        },
        {
            id: 7,
            name: 'Wade Warren',
        },
        {
            id: 8,
            name: 'Albert Flores',
        },
        {
            id: 9,
            name: 'Cameron Williamson',
        },
        {
            id: 10,
            name: 'Ronald Richards',
        },
        {
            id: 11,
            name: 'Bessie Cooper',
        },
        {
            id: 12,
            name: 'Jerome Bell',
        }
    ]

    return <>
    <div className={styles.offersContainer}>
        <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
                <h3>New offer</h3>
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
            <div className={styles.offerBlock}>
                <Input
                    name="offer name"
                    id="offer_name"
                    label="Offer Name" 
                    className={styles.defaultInput} 
                />
                <Select
                    label="Service"
                    labelStyle="outside"
                    className={styles.defaultInput}
                    options={[
                        {
                            label: "4140 Parker Rd. Allentown, New Mexico 31134",
                            value: "1",
                        },
                        { label: "Another Branch", value: "2" },
                        ]}
                    onChange={(value) => {
                        setService(value);
                    }}
                    value={service}
                />
                <SelectWithCheckbox 
                    label="Doctors"
                    labelStyle="outside"
                    options={doctorsData}
                    className={styles.defaultInput}
                    values={checkedDoctors}
                    changeValue={(value)=> setCheckedDoctors(value)}
                />
                <Input
                    name="Clinic"
                    id="clinic"
                    label="Clinic" 
                    className={styles.defaultInput} 
                />
            </div>
            <div className={styles.offerBlock_2}>
                    <Select
                        label="Branch"
                        labelStyle="outside"
                        className={styles.defaultInput}
                        options={[
                            {
                                label: "11 Simon Chikovani St",
                                value: "1",
                            },
                            { label: "Another Branch", value: "2" },
                            ]}
                        onChange={(value) => {
                            setBranch(value);
                        }}
                        value={branch}
                    />
                    <DatePicker
                        mode="single"
                        label="Start date"
                        className={styles.defaultInput}
                    />
                    <DatePicker
                        mode="single"
                        label="End date"
                        className={styles.defaultInput}
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
                    <Select
                        label="Service type"
                        labelStyle="outside"
                        className={styles.defaultInput}
                        options={[
                            {
                                label: "Online",
                                value: "1",
                            },
                            { label: "Offline", value: "2" },
                            ]}
                        onChange={(value) => {
                            setServiceType(value);
                        }}
                        value={serviceType}
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
            </div>
            <div className={styles.offerBlock}>
                <div className={styles.mini_block}>
                    <Select
                        label="Client type"
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
                            setClientType(value);
                        }}
                        value={clientType}
                    />
                    <Select
                        label="Quantity"
                        labelStyle="outside"
                        options={[
                            {
                                label: "11 Simon Chikovani St",
                                value: "1",
                            },
                            { label: "Another Branch", value: "2" },
                            ]}
                        onChange={(value) => {
                            setQuantity(value);
                        }}
                        value={quantity}
                    />
                </div>
                <div className={styles.descriptionBlock}>
                    <Input
                        label="Short description"
                        type="text"
                        multiline
                        className={styles.description}
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

AddOffer.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};