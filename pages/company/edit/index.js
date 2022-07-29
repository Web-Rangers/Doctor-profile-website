import {useState} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {Card, Input, Button} from 'components';
import styles from 'styles/pages/addCompany.module.scss';

export default function EditCompany(){
    const [ltdName, setLtdName] = useState('Bob');
    const [displayName, setDisplayName] = useState('Jobs');
    const [taxId, setTaxId] = useState('123456');
    const [phoneNumber, setPhoneNumber] = useState('456345');
    const [email, setEmail] = useState('17807709');
    const [contactName, setContactName] = useState('17807709');
    const [contactPhone, setContactPhone] = useState('17807709');
    const [contactEmail, setContactEmail] = useState('17807709');
    const [billingEmail, setBillingEmail] = useState('17807709');
    const [date, setDate] = useState('17807709');

    
    return <>
        <div className={styles.companyContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitle}>
                    <h2>Edit</h2>
                </div>
                <div className={styles.headerBreadcrumbs}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>

            <Card
                cardTitle="General information"
                className={styles.genInfo}
            >
                <Input
                    name="ltd_name_of_company"
                    label="LTD name of company"
                    className={styles.genInput}
                    onChange={(e)=> setLtdName(e)}
                    value={ltdName}
                />
                <Input
                    label="Display name of company"
                    className={styles.genInput}
                    value={displayName}
                    onChange={(e)=> setDisplayName(e)}
                />
                <Input
                    label="Tax id"
                    className={styles.genInput}
                    value={taxId}
                    onChange={(e)=> setTaxId(e)}
                />
                <div className={styles.flexBox}>
                    <Input
                        label="Phone number of company"
                        className={styles.halfInp}
                        value={phoneNumber}
                        onChange={(e)=> setPhoneNumber(e)}
                    />
                    <Input
                        label="Email of company"
                        className={styles.halfInp}
                        value={email}
                        onChange={(e)=> setEmail(e)}
                    />
                </div>
            </Card>
            <Card
                cardTitle="Contacts"
                className={styles.genInfo}
            >
                <Input
                    label="Contact name"
                    className={styles.genInput}
                    value={contactName}
                    onChange={(e)=> setContactName(e)}
                />
                <div className={styles.flexBox}>
                    <Input
                        label="Phone"
                        className={styles.halfInp}
                        value={contactPhone}
                        onChange={(e)=> setContactPhone(e)}
                    />
                    <Input
                        label="Email"
                        className={styles.halfInp}
                        value={contactEmail}
                        onChange={(e)=> setContactEmail(e)}
                    />
                </div>
            </Card>
            <Card
                cardTitle="Billing information"
                className={styles.contacts}
            >
                <Input
                    label="Email"
                    className={styles.genInput}
                    value={billingEmail}
                    onChange={(e)=> setBillingEmail(e)}
                />
                <Input
                    label="Date"
                    className={styles.genInput}
                    value={date}
                    onChange={(e)=> setDate(e)}
                />
            </Card>

            <div className={styles.btns}>
                <Button 
                    label="Cancel"
                    variant="outline"
                    size="large"
                />
                <Button 
                    label="Save"
                    variant="fill"
                    size="large"
                />
            </div>
        </div>
    </>
}

AddCompany.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}