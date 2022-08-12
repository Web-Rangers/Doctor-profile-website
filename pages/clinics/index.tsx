import { ReactSVG } from 'react-svg';
import { Table, AddClinicModal, Button } from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import styles from 'styles/pages/clinics.module.css';
import tableStyles from 'styles/components/Table.module.scss';
import { useState, useEffect } from 'react';
import {useClinicsData} from '../../components/useClinicsData';

export default function Clinics({list}) { 
    const [isModalOpen, setModalOpen] = useState(false);
    const columns = [
        {
            key: 'icon',
            title: 'Icon',
            dataIndex: 'icon',
            render: (icon, key) => {
                return (
                    <div
                        className={tableStyles.tableIconCellTemplate}
                        key={key}
                    >
                        <img src={icon} className={tableStyles.rowImg} />
                    </div>
                );
            },
        },
        {
            key: 'displayName',
            title: 'Name',
            dataIndex: 'displayName',
        },
        {
            key: 'address',
            title: 'Legal adress',
            dataIndex: 'address',
            render : (record) =>{
                return <><div className={styles.address}>{record?.address}</div></>
            }
        },
        {
            key: 'isActive',
            title: 'Status',
            dataIndex: 'isActive',
            headerStyle: {
                justifyContent: 'center',
            },
            render: (status, key) => {
                return (
                    <div
                        className={tableStyles.tableStatusCellTemplate}
                        key={key}
                    >
                        <div
                            className={`${tableStyles.tableStatus} ${
                                status
                                    ? tableStyles.statusOpen
                                    : tableStyles.statusClose
                            }`}
                        >
                            {status ? 'Open' : 'Close'}
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'workingHours',
            title: 'Working hours',
            dataIndex: 'workingHours',
            render: (record)=>{
                return <>
                    <div className={styles.dataCheck}>
                        <img src='/images/icons/table/i.svg' alt="" />
                        <span>{record[0]?.startHour}</span>
                        <span>-</span>
                        <span>{record[0]?.endHour}</span>
                    </div>
                </>
            }
        },
        {
            key: 'action',
            title: '',
            dataIndex: 'action',
            render: (action, key) => {
                return (
                    <div
                        className={`${tableStyles.tableIconCellTemplate} ${styles.smallIcon} ${styles.action}`}
                        key={key}
                    >
                        <img src='/images/icons/table/block.png' className={tableStyles.rowImg} />
                    </div>
                );
            },
        },
    ];

    // const dataz = [
    //     {
    //         key: '1',
    //         icon: '/images/icons/clinics/clinic1.png',
    //         name: 'Medical House',
    //         legalAdress: '4140 Parker Rd. Allentown, New Mexico 31134',
    //         phoneNumber: '480-555-0103',
    //         status: true,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '2',
    //         icon: '/images/icons/clinics/clinic2.png',
    //         name: 'Medical House',
    //         legalAdress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    //         phoneNumber: '704-555-0127',
    //         status: false,
    //         workingHours: '09:00-21:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '3',
    //         icon: '/images/icons/clinics/imageclinic3.png',
    //         name: 'Cardinal Health',
    //         legalAdress: '2972 Westheir Rd. Santa Ana, Illinois 85486 ',
    //         phoneNumber: '219-555-0114',
    //         status: true,
    //         workingHours: '08:00-18:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '4',
    //         icon: '/images/icons/clinics/imageclinic4.png',
    //         name: ' Stryker Corp',
    //         legalAdress: '8502 Preston Rd. Inglewood, Maine 98380',
    //         phoneNumber: '684-555-0102',
    //         status: false,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '5',
    //         icon: '/images/icons/clinics/imageclinic5.png',
    //         name: 'Home Care',
    //         legalAdress: '2464 Royal Ln. Mesa, New Jersey 45463',
    //         phoneNumber: '907-555-0101',
    //         status: false,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '6',
    //         icon: '/images/icons/clinics/imageclinic6.png',
    //         name: 'Natus Medical',
    //         legalAdress: '3891 Ranchiew Dr. Richson, California 62639',
    //         phoneNumber: '229-555-0109',
    //         status: true,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '7',
    //         icon: '/images/icons/clinics/imageclinic7.png',
    //         name: 'FONAR',
    //         legalAdress: '6391 Elgin St. Celina, Delaware 10299',
    //         phoneNumber: '629-555-0129',
    //         status: true,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '8',
    //         icon: '/images/icons/clinics/imageclinic8.png',
    //         name: 'Harvard BioScience',
    //         legalAdress: '2715 Ash Dr. San Jose, South Dakota 83475',
    //         phoneNumber: '208-555-0112',
    //         status: true,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '9',
    //         icon: '/images/icons/clinics/imageclinic9.png',
    //         name: 'FONAR',
    //         legalAdress: '6391 Elgin St. Celina, Delaware 10299',
    //         phoneNumber: '629-555-0129',
    //         status: false,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    //     {
    //         key: '10',
    //         icon: '/images/icons/clinics/imageclinic10.png',
    //         name: 'Harvard BioScience',
    //         legalAdress: '2715 Ash Dr. San Jose, South Dakota 83475',
    //         phoneNumber: '208-555-0112',
    //         status: true,
    //         workingHours: '10:00-20:00',
    //         action: '/images/icons/table/block.png',
    //     },
    // ];

    const { isLoading, data, isError, error, refetch } = useClinicsData();

    return (
        <>
            {isModalOpen && (
                <AddClinicModal
                    onCancel={() => setModalOpen(false)}
                    onClose={() => setModalOpen(false)}
                    onSave={() => {
                        setModalOpen(false);
                    }}
                />
            )}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <h3>All clinics</h3>
                        <Button
                            label="Add clinic"
                            size="large"
                            onClick={() => setModalOpen(!isModalOpen)}
                        />
                    </div>
                    <div
                        className={styles.searchContainer}
                        onClick={() => {
                            document.getElementById('search-input')?.focus();
                        }}
                    >
                        <ReactSVG
                            src={'/images/icons/inputs/search.svg'}
                            className={styles.searchImg}
                        />
                        <input
                            id="search-input"
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={data?.sort((a,b)=> b.id - a.id)}
                    pagination={{ pageSize: 10, initialPage: 1 }}
                    detailedUrl={'./clinics/clinic_detailed'}
                    rowClassName={styles.tableRow}
                />
            </div>
        </>
    );
}

Clinics.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};