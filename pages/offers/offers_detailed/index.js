import React, { useState } from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import styles from 'styles/pages/offersDetailed.module.scss';
import { ReactSVG } from 'react-svg';
import tableStyles from "styles/components/Table.module.scss";
import classNames from "classnames";
import { Table, Card } from 'components';
import Image from 'next/image';

export default function Offers() {
    const [openTool, setOpenTool] = useState(false);

    const offerDetails = [
        {
            key: 'Start date',
            value: '11.09.2022'
        },
        {
            key: 'End date',
            value: '22.10.2022'
        },
        {
            key: 'Client type',
            value: 'Individuals'
        },
        {
            key: 'Card type',
            value: 'Platinum'
        },
        {
            key: 'Quantity',
            value: '202'
        },
    ]

    const servicesInfo = [
        {
            key: 'Type of service',
            value: 'Clinic'
        },
        {
            key: 'Service',
            value: 'Concultation'
        },
        {
            key: 'Clinic',
            value: 'Medical house'
        },
        {
            key: 'Branch',
            value: '7 Simon Chikovani St'
        },
    ]

    const offerColumns = [
        {
            key: 'when',
            title: 'When',
            dataIndex: 'when',
            render: (record, key) => {
                return (
                    <div
                        className={classNames(
                            tableStyles.tableCellTemplate,
                            styles.nameCell
                        )}
                        key={key}
                    >
                        <div className={styles.nameCol}>
                            <div className={styles.data}>{record.data}</div>
                            <div className={styles.time}>{record.time}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'surname',
            title: 'Surname',
            dataIndex: 'surname',
        },
        {
            key: 'username',
            title: 'Username',
            dataIndex: 'username',
        },
        {
            key: 'admin_type',
            title: 'Admin Type',
            dataIndex: 'admin_type',
        },
    ];

    const updateOffersData = [
        {
            when: {
                data: '14.08.1999',
                time: '04:00'
            },
            name: 'Annette',
            surname: 'Black',
            username: 'Annette',
            admin_type: 'Offer admin',
            image: '/images/doctors/doctor.png'
        },
        {
            when: {
                data: '14.08.1999',
                time: '04:00'
            },
            name: 'Marvin',
            surname: 'McKinney',
            username: 'Marvin',
            admin_type: 'Offer admin',
            image: '/images/doctors/doctor.png'
        },
        {
            when: {
                data: '14.08.1999',
                time: '04:00'
            },
            name: 'Jenny',
            surname: 'Wilson',
            username: 'Jenny',
            admin_type: 'Offer admin',
            image: '/images/doctors/doctor.png'
        },
        {
            when: {
                data: '14.08.1999',
                time: '04:00'
            },
            name: 'Guy',
            surname: 'Hawkins',
            username: 'Guy',
            admin_type: 'Offer admin',
            image: '/images/doctors/doctor.png'
        },
        {
            when: {
                data: '14.08.1999',
                time: '04:00'
            },
            name: 'Cameron',
            surname: 'Williamson',
            username: 'Cameron',
            admin_type: 'Offer admin',
            image: '/images/doctors/doctor.png'
        },
        {
            when: {
                data: '14.08.1999',
                time: '04:00'
            },
            name: 'Robert',
            surname: 'Fox',
            username: 'Robert',
            admin_type: 'Offer admin',
            image: '/images/doctors/doctor.png'
        }
    ];

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
                <div className={styles.cardContainer}>
                    <div className={styles.offerHeader}>
                        <h2>Offer Name</h2>
                        <div className={styles.offersTool}>
                            <button
                                className={styles.moreBtn}
                                onClick={() => setOpenTool(!openTool)}
                            >
                                <ReactSVG
                                    src="/images/icons/offer/more.svg"
                                />
                            </button>
                            <div className={styles.toolBox} data-open={openTool}>
                                <button className={styles.tool}>
                                    <ReactSVG
                                        src="/images/icons/offer/edit.svg"
                                        className={styles.toolIcon}
                                    />
                                    <span>Edit</span>
                                </button>
                                <button className={styles.tool}>
                                    <ReactSVG
                                        src="/images/icons/offer/delete.svg"
                                        className={styles.toolIcon}
                                    />
                                    <span>Deactivate</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.status}>
                        <div className={classNames(tableStyles.tableStatus, tableStyles.statusOpen)}>
                            Finished
                        </div>
                    </div>
                    <div className={styles.description}>
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tableRows}>
                            <OfferTable data={offerDetails} />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className={styles.cardContainer}>
                <div className={styles.offerHeader}>
                    <h2>Service info</h2>
                </div>
                <div className={styles.table}>
                    <div className={styles.tableRows}>
                        <OfferTable data={servicesInfo} />
                    </div>
                </div>
            </Card>

            <Card className={styles.cardContainer}>
                <div className={styles.offerHeader}>
                    <h2>Doctors</h2>
                </div>
                <div className={styles.doctors}>
                    {updateOffersData.map((doctor, i) => {
                        return (
                            <div key={i} className={styles.doctor}>
                                <div className={styles.doctor_image}>
                                    <img alt='' src={doctor.image} width='50' height='50' />
                                </div>
                                <div className={styles.doctor_info}>
                                    <h2>{doctor.name}</h2>
                                    <h4>{doctor.admin_type}</h4>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            <Card className={styles.cardContainer}>
                <div className={styles.offerHeader}>
                    <h2>Updates</h2>
                </div>
                <div className={styles.table}>
                    <Table
                        className={styles.table}
                        columns={offerColumns}
                        data={updateOffersData}
                        rowClassName={styles.tableRow}
                        cellClassName={styles.tableCell}
                        headerClassName={styles.tableHeader}
                        bodyClassName={styles.tableBody}
                    />
                </div>
            </Card>

        </div>
    </>
}


function OfferTable({ data }) {
    return <>
        {data.map((item) => {
            return (
                <div key={item.key} className={styles.columnItem}>
                    <h2>{item.key}</h2>
                    <div>{item.value}</div>
                </div>
            )
        })}
    </>
}

Offers.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};