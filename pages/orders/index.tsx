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
import TableOrders from 'components/TableOrders';

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
    const [min, setMin] = useState<number | string>();
    const [max, setMax] = useState<number | string>();

    const headerCellStyle = {
        paddingLeft: '5px',
        paddingRight: '5px'
    }
    const columns = [
        {
            accessor: 'patient_name',
            Header: 'Patient name',
        },
        {
            accessor: 'service_name',
            Header: 'Name of Subservice',
        },
        {
            accessor: 'status',
            Header: 'Status',
            Cell: (record, row) => (
                <div className={styles.statusCell}>
                    <span
                        className={classNames(styles.statusBtn, {
                            [styles.inprogress]: record.value == 'In progress',
                            [styles.done]: record.value == 'Done',
                            [styles.waiting]:
                                record.value == 'Waiting for approval',
                            [styles.canceled]: record.value == 'Canceled',
                        })}
                    >
                        {record.value}
                    </span>
                </div>
            ),
        },
        {
            accessor: 'create_date',
            Header: 'Create date',
        },
        {
            accessor: 'service',
            Header: 'Service Type',
            cellProps: {
                style: {
                    textAlign: 'center'
                },
            },
            headerProps: {
                style: {
                    textAlign: 'center'
                },
            }
        },
        {
            accessor: 'price',
            Header: 'Price',
            cellProps: {
                style: {
                    textAlign: 'right'
                },
            },
            headerProps: {
                style: {
                    textAlign: 'right'
                },
            }
        },
    ];

    const data = [
        {
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
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
                        omitRootLabel={false}
                        rootLabel="Admin"
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
                    <TableOrders
                        columns={columns}
                        data={data}
                    />
                </Card>
            </div>
        </>
    );
}

Orders.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
