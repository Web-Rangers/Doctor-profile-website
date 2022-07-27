import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {Card, Input, Button} from 'components';
import styles from 'styles/pages/addCompany.module.scss';

export default function AddCompany(){
    return <>
        <div className={styles.companyContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitle}>
                    <h2>New company</h2>
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
                    label="LTD name of company"
                    className={styles.genInput}
                />
                <Input
                    label="Display name of company"
                    className={styles.genInput}
                />
                <div className={styles.flexBox}>
                    <Input
                        label="Company Id"
                        className={styles.halfInp}
                    />
                    <Input
                        label="Tax id"
                        className={styles.halfInp}
                    />
                    <Input
                        label="Phone number of company"
                        className={styles.halfInp}
                    />
                    <Input
                        label="Email of company"
                        className={styles.halfInp}
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
                />
                <div className={styles.flexBox}>
                    <Input
                        label="Phone"
                        className={styles.halfInp}
                    />
                    <Input
                        label="Email"
                        className={styles.halfInp}
                    />
                </div>
            </Card>
            <Card
                cardTitle="Contacts"
                className={styles.contacts}
            >
                <Input
                    label="Email"
                    className={styles.genInput}
                />
                <Input
                    label="Date"
                    className={styles.genInput}
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