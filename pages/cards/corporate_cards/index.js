import {useState} from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {Card, Table, Button, DatePicker, Input} from 'components';
import { ReactSVG } from "react-svg";
import styles from 'styles/pages/corporateCards.module.scss';
import classNames from "classnames";

export default function CorporateCards() {
    const [filterIsOpen, setFilterOpen] = useState(false);
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    
    const columns = [
        {
            key: "company_id",
            title: "Company id",
            dataIndex: "company_id"
        },
        {
            key: 'company_name',
            title: 'Company name',
            dataIndex: 'company_name',
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 'phone_number',
            title: 'Phone number',
            dataIndex: 'phone_number',
        },
        {
            key: 'invoice_date',
            title: 'Invoice date',
            dataIndex: 'invoice_date',
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (record)=> {
                return <>
                    <div className={classNames(styles.status, {
                        [styles.active]: record === 'Active',
                        [styles.deactive]: record === 'Deactived'
                    })}>{record}</div>
                </>
            }
        }
    ];

    const data = [
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Active'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Deactived'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Active'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Active'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Deactived'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Deactived'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Active'
        },
        {
            company_id: 12301284,
            company_name: 'OptimoGroup',
            email:'OptimoGroup@gmail.com',
            phone_number: '(603) 555-0123',
            invoice_date: '14.04.2022',
            price: 124,
            status: 'Active'
        },
    ];

    return <>
        <div className={styles.cardsContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitle}
                >
                    <h2>Corporate cards</h2>
                </div>
                <div className={styles.headerBreadcrumbs}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>
            
            <Card>

            <div className={styles.actionsRow}>
                <div
                    className={styles.searchContainer}
                    onClick={() => {
                        document
                            .getElementById("search-input")
                            ?.focus();
                    }}
                >
                    <ReactSVG
                        src={"/images/icons/inputs/search.svg"}
                        className={styles.searchImg}
                    />
                    <input
                        id="search-input"
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <Button
                    variant="outline"
                    size="large"
                    label="Filter"
                    onClick={() => setFilterOpen(!filterIsOpen)}
                    icon={
                        <ReactSVG
                            src="/images/icons/inputs/filter.svg"
                            className={classNames(
                                styles.iconContainer,
                                styles.activeFilter
                            )}
                        />
                    }
                />
                <Button
                    className={styles.addNewCompany}
                    variant="fill"
                    size="large"
                    label="Add new company"
                />

                <div className={classNames(styles.filterContainer, {
                    [styles.filterOpen]: filterIsOpen,
                })}>
                    <div className={styles.filterBlock}>
                        <div className={styles.filterSelectors}>
                            <DatePicker
                                mode="range"
                                label="Date of registration"
                                className={styles.servInput}
                            />
                            <div className={styles.minMax}>
                                <h2>Price</h2>
                                <div>                                        
                                    <Input
                                        className={styles.intervalInput}
                                        value={min}
                                        onChange={(value) => setMin(value)}
                                        defaultValue={min}
                                    />
                                    <div className={styles.divider} />
                                    <Input
                                        className={styles.intervalInput}
                                        value={max}
                                        onChange={(value) => setMax(value)}
                                        defaultValue={max}
                                    />
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className={styles.filterBtns}>
                        <Button
                            label="Reset filter"
                            className={styles.resetButton}
                            size="large"
                            variant="text"
                            icon={
                                <ReactSVG
                                    src="/images/icons/inputs/reset.svg"
                                    className={styles.iconContainer}
                                />
                            }
                        />
                        <Button label="Apply" size="large" variant="fill" />
                    </div>
                </div>
            </div>    

            <Table
                className={styles.table}
                columns={columns}
                data={data}
                rowClassName={styles.tableRow}
                cellClassName={styles.tableCell}
                headerClassName={styles.tableHeader}
                bodyClassName={styles.tableBody}
                pagination={{ pageSize: 8, initialPage: 1 }}
            />
            </Card>
        </div>
    </>
}

CorporateCards.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>
}