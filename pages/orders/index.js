import { ReactSVG } from 'react-svg';
import {
    TableWithDropdowns,
    Button,
    Card,
    EditOrderModal,
    DatePicker,
    Select,
    Input,
    Table,
} from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import { useState } from 'react';
import Breadcrumbs from 'nextjs-breadcrumbs';
import classNames from 'classnames';
import styles from 'styles/pages/orders.module.scss';

export default function Orders() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filterIsOpen, setFilterOpen] = useState(false);
    const [city, setCity] = useState('');
    const [branch, setBranch] = useState('');
    const [category, setCategory] = useState('');
    const [doctors, setDoctors] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [clinic, setClinic] = useState('');
    const [status, setStatus] = useState('');
    const [labels, setLabels] = useState('');
    const [cardType, setCardType] = useState('');
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    const headerCellStyle = {
        paddingLeft: '5px',
        paddingRight: '5px'
    }
    const columns = [
        {
            key: 'patient_name',
            title: 'Patient name',
            dataIndex: 'patient_name',
        },
        {
            key: 'service_name',
            title: 'Name of Subservice',
            dataIndex: 'service_name',
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (record, key) => {
                return (
                    <div className={styles.statusCell}>
                        <span
                            className={classNames(styles.statusBtn, {
                                [styles.inprogress]: record == 'In progress',
                                [styles.done]: record == 'Done',
                                [styles.waiting]:
                                    record == 'Waiting for approval',
                                [styles.canceled]: record == 'Canceled',
                            })}
                        >
                            {record}
                        </span>
                    </div>
                );
            },
        },
        {
            key: 'create_date',
            title: 'Create date',
            dataIndex: 'create_date',
        },
        {
            key: 'service',
            title: 'Service Type',
            dataIndex: 'service',
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            headerStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
            headerStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }
        },
    ];

    const data = [
        {
            status: 'In progress',
            service_name:
                'Electroencephalography with video monitoring (EEG video)',
            service: 'Online',
            create_date: '19.09.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            isActive: true
        },
        {
            service: 'Home',
            service_name:
                'Electroencephalography with video monitoring (EEG video)',
            status: 'Done',
            create_date: '19.09.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            isActive: true
        },
        {
            service: 'Home',
            service_name:
                'Electroencephalography with video monitoring (EEG video)',
            status: 'Canceled',
            create_date: '19.09.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            isActive: true
        },
        {
            service: 'Online',
            service_name:
                'Electroencephalography with video monitoring (EEG video)',
            status: 'Waiting for approval',
            create_date: '19.09.2022',
            price: 124,
            patient_name: 'Kathryn Murphy',
            isActive: true
        },
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h3>Orders</h3>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
                <Card className={styles.ordersCard}>
                    <div className={styles.actionsRow}>
                        <div
                            className={styles.searchContainer}
                            onClick={() => {
                                document
                                    .getElementById('search-input')
                                    ?.focus();
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
                        <Button
                            variant="outline"
                            size="large"
                            label="Filter"
                            className={styles.addOrderBtn}
                            onClick={() => setFilterOpen(!filterIsOpen)}
                            icon={
                                <ReactSVG
                                    src="/images/icons/inputs/filter.svg"
                                    className={classNames(
                                        styles.iconContainer,
                                        styles.active
                                    )}
                                />
                            }
                        />
                    </div>
                    <div
                        className={classNames(styles.filterContainer, {
                            [styles.filterOpen]: filterIsOpen,
                        })}
                    >
                        <div className={styles.filterBlock}>
                            <div className={styles.filterSelectors}>
                                <DatePicker
                                    mode="single"
                                    label="Create date"
                                    className={styles.servInput}
                                />
                                <DatePicker
                                    mode="single"
                                    label="Schedule date"
                                    className={styles.servInput}
                                />
                                <Select
                                    label="City"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setCity(value);
                                    }}
                                />
                                <Select
                                    label="Category"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setCategory(value);
                                    }}
                                />
                                <Select
                                    label="Clinic"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setClinic(value);
                                    }}
                                />
                                <Select
                                    label="Branch"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setBranch(value);
                                    }}
                                />
                                <Select
                                    label="Doctors"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setDoctors(value);
                                    }}
                                />
                                <div className={styles.selects}>
                                    <h2>Service type</h2>
                                    <div>
                                        <Button
                                            label="Silver"
                                            variant="outline"
                                            size="large"
                                            className={styles.filterBtn}
                                            selected={serviceType === 'silver'}
                                            onClick={() =>
                                                setServiceType('silver')
                                            }
                                        />
                                        <Button
                                            label="Gold"
                                            variant="outline"
                                            size="large"
                                            className={styles.filterBtn}
                                            selected={serviceType === 'gold'}
                                            onClick={() =>
                                                setServiceType('gold')
                                            }
                                        />
                                        <Button
                                            label="Platinum"
                                            variant="outline"
                                            size="large"
                                            className={styles.filterBtn}
                                            selected={
                                                serviceType === 'platinum'
                                            }
                                            onClick={() =>
                                                setServiceType('platinum')
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={styles.selects}>
                                    <h2>Card types</h2>
                                    <div>
                                        <Button
                                            label="Silver"
                                            variant="outline"
                                            size="large"
                                            className={styles.filterBtn}
                                            selected={cardType === 'silver'}
                                            onClick={() =>
                                                setCardType('silver')
                                            }
                                        />
                                        <Button
                                            label="Gold"
                                            variant="outline"
                                            size="large"
                                            className={styles.filterBtn}
                                            selected={cardType === 'gold'}
                                            onClick={() => setCardType('gold')}
                                        />
                                        <Button
                                            label="Platinum"
                                            variant="outline"
                                            size="large"
                                            className={styles.filterBtn}
                                            selected={cardType === 'platinum'}
                                            onClick={() =>
                                                setCardType('platinum')
                                            }
                                        />
                                    </div>
                                </div>
                                <Select
                                    label="Status"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setStatus(value);
                                    }}
                                />
                                <Select
                                    label="Labels"
                                    labelStyle="outside"
                                    className={styles.servInput}
                                    options={[
                                        {
                                            label: '4140 Parker Rd',
                                            value: '1',
                                        },
                                        { label: 'Another Branch', value: '2' },
                                    ]}
                                    onChange={(value) => {
                                        setLabels(value);
                                    }}
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
                    <Table
                        columns={columns}
                        data={data}
                        className={styles.table}
                        rowClassName={styles.tableRow}
                        cellClassName={styles.tableCell}
                        headerClassName={styles.tableHeader}
                        bodyClassName={styles.tableBody}
                        pagination={{ pageSize: 10, initialPage: 1 }}
                        dropdownClassname={styles.dropDwn}
                        detailedUrl="./orders/orders_detailed"
                    />
                </Card>
            </div>
        </>
    );
}

Orders.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
