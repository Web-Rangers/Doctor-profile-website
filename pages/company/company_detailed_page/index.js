import { useState } from 'react';
import { Card, Button, StuffCompanyTab, ContactAndBillTab, CardsTab } from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { ReactSVG } from "react-svg";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import TableStyles from "styles/components/TableWithDropdown.module.scss";
import styles from 'styles/pages/companyDetailed.module.scss';
import classNames from "classnames";

export default function Company() {
    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
            render: (record, key) => {
                return (
                    <div className={styles.group}>
                        <ReactSVG
                            className={classNames(styles.arrow, TableStyles.arrow)}
                            src={"/images/icons/table/arrow.svg"}
                        />
                        <div>
                            <span>{record}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: "date_of_birth",
            title: "Date of birth",
            dataIndex: "date_of_birth",
        },
        {
            key: "gender",
            title: "Gender",
            dataIndex: "gender",
        },
        {
            key: "card_type",
            title: "Card type",
            dataIndex: "card_type",
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "phone_number",
            title: "Phone number ",
            dataIndex: "phone_number",
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (record) => {
                return (
                    <div className={classNames({
                        [styles.active]: record === 'Active',
                        [styles.deactived]: record === 'Deactived'
                    })}>{record}</div>
                )
            }
        },
        {
            key: "actions",
            title: "",
            dataIndex: "actions",
            render: (record, key) => {
                return (
                    <div className={styles.tableActons}>
                        <ReactSVG
                            onClick={() => setModalOpen(!isModalOpen)}
                            src={"/images/icons/table/edit.svg"}
                            className={styles.iconContainer}
                        />
                    </div>
                );
            },
        },
        {
            key: "personal_number",
            title: "Personal number",
            dataIndex: "hidden",
        },
        {
            key: "stuff_id",
            title: "Stuff id",
            dataIndex: "hidden",
        },
        {
            key: "registration_date",
            title: "Registration date",
            dataIndex: "hidden",
        },
    ];

    const data = [
        {
            name: 'Cody Fisher',
            date_of_birth: '19.09.2022',
            gender: 'M',
            card_type: 'Platinum',
            email: 'Robert_Fox@gmail.com',
            phone_number: `(704) 555-0127`,
            status: 'Active',
            personal_number: '648568557',
            stuff_id: '567 546 123',
            registration_date: '12.04.2000',
        },
        {
            name: 'Cody Fisher',
            date_of_birth: '19.09.2022',
            gender: 'M',
            card_type: 'Platinum',
            email: 'Robert_Fox@gmail.com',
            phone_number: `(704) 555-0127`,
            status: 'Active',
            personal_number: '648568557',
            stuff_id: '567 546 123',
            registration_date: '12.04.2000',
        },
        {
            name: 'Cody Fisher',
            date_of_birth: '19.09.2022',
            gender: 'M',
            card_type: 'Platinum',
            email: 'Robert_Fox@gmail.com',
            phone_number: `(704) 555-0127`,
            status: 'Deactived',
            personal_number: '648568557',
            stuff_id: '567 546 123',
            registration_date: '12.04.2000',
        },
        {
            name: 'Cody Fisher',
            date_of_birth: '19.09.2022',
            gender: 'M',
            card_type: 'Platinum',
            email: 'Robert_Fox@gmail.com',
            phone_number: `(704) 555-0127`,
            status: 'Active',
            personal_number: '648568557',
            stuff_id: '567 546 123',
            registration_date: '12.04.2000',
        },
        {
            name: 'Cody Fisher',
            date_of_birth: '19.09.2022',
            gender: 'M',
            card_type: 'Platinum',
            email: 'Robert_Fox@gmail.com',
            phone_number: `(704) 555-0127`,
            status: 'Active',
            personal_number: '648568557',
            stuff_id: '567 546 123',
            registration_date: '12.04.2000',
        },
        {
            name: 'Cody Fisher',
            date_of_birth: '19.09.2022',
            gender: 'M',
            card_type: 'Platinum',
            email: 'Robert_Fox@gmail.com',
            phone_number: `(704) 555-0127`,
            status: 'Deactived',
            personal_number: '648568557',
            stuff_id: '567 546 123',
            registration_date: '12.04.2000',
        },
    ];

    return <>
        <div className={styles.companyContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitle}>
                    <h2>Company</h2>
                    <Button
                        size="large"
                        variant="fill"
                        label="Deactive company"
                    />
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
                className={styles.company}
            >
                <div className={styles.companyBlock}>
                    <div>
                        <h2>Company information</h2>
                    </div>
                    <div className={styles.editIcon}>
                        <ReactSVG src='../images/icons/inputs/edit.svg' />
                    </div>
                </div>

                <div className={styles.companyInfo}>
                    <div>
                        <h2>LTD name of company</h2>
                        <span>MedHouse@gmail.com</span>
                    </div>
                    <div>
                        <h2>Display name of company</h2>
                        <span>MedHouse@gmail.com</span>
                    </div>
                    <div>
                        <h2>Company Id</h2>
                        <span>123 456 789</span>
                    </div>
                    <div>
                        <h2>Tax id</h2>
                        <span>123 456 789</span>
                    </div>
                </div>
            </Card>

            <div className={styles.tabContainer}>
                <Tabs>
                    <TabList className={tabStyles.tabList}>
                        <Tab
                            className={tabStyles.tab}
                            tabIndex="1"
                            selectedClassName={tabStyles.selectedTab}
                        >
                            <ReactSVG
                                src="/images/icons/tabs/info.svg"
                                className={styles.iconContainer}
                            />
                            <span>Contact&bill</span>
                        </Tab>
                        <Tab
                            className={tabStyles.tab}
                            tabIndex="2"
                            selectedClassName={tabStyles.selectedTab}
                        >
                            <ReactSVG
                                src="/images/icons/tabs/stuff.svg"
                                className={styles.iconContainer}
                            />
                            <span>Stuff</span>
                        </Tab>
                        <Tab
                            className={tabStyles.tab}
                            tabIndex="3"
                            selectedClassName={tabStyles.selectedTab}
                        >
                            <ReactSVG
                                src="/images/icons/tabs/cards.svg"
                                className={styles.iconContainer}
                            />
                            <span>Cards</span>
                        </Tab>
                    </TabList>
                    <TabPanel className={tabStyles.tabPanel}>
                        <ContactAndBillTab />
                    </TabPanel>
                    <TabPanel className={tabStyles.tabPanel}>
                        <StuffCompanyTab
                            data={data}
                            columns={columns}
                            tableStyle="dropdown"
                        />
                    </TabPanel>
                    <TabPanel className={tabStyles.tabPanel}>
                        <CardsTab />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    </>
}

Company.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}