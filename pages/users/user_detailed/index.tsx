import {
    AboutDoctorTab,
    Button,
    Calendar,
    Card,
    DoctorEducationTab,
    DoctorServicesTab,
    Input,
    Modal,
    Select,
    Table,
} from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { ReactSVG } from 'react-svg';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from 'styles/pages/user_detailed.module.scss';
import tabStyles from 'styles/components/tabs/Tabs.module.scss';
import { useState } from 'react';
import tableStyles from 'styles/components/Table.module.scss';

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick} className={styles.edit}></ReactSVG>
);

const orderColumns = [
    {
        key: 'date',
        title: 'Date',
        dataIndex: 'date',
    },
    {
        key: 'clinic',
        title: 'Clinic',
        dataIndex: 'clinic',
    },
    {
        key: 'service',
        title: 'Service',
        dataIndex: 'service',
    },
    {
        key: 'doctor',
        title: 'Doctor',
        dataIndex: 'doctor',
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        render: (record, key) => {
            return (
                <div className={tableStyles.tableStatusCellTemplate} key={key}>
                    <div
                        className={tableStyles.tableStatus}
                        style={{
                            color: record.color,
                        }}
                    >
                        {record.title}
                    </div>
                </div>
            );
        },
    },
    {
        key: 'type',
        title: 'Type',
        dataIndex: 'type',
    },
    {
        key: 'price',
        title: 'Price',
        dataIndex: 'price',
    },
    {
        key: 'grade',
        title: 'Grade',
        dataIndex: 'grade',
    },
    {
        key: 'actions',
        title: '',
        dataIndex: 'actions',
    },
];

const data = [
    {
        date: '10.04.2022',
        clinic: 'Medical House 4140 Parker Rd. Allentown',
        service: 'Dentist',
        doctor: 'Jenny Wilson',
        status: {
            title: 'Done',
            color: '#00A875',
        },
        type: 'Online',
        price: '22',
        grade: '5',
    },
];

export default function UserDetailed() {
    const [selectedStatus, setSelectedStatus] = useState('');
    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div className={styles.pageHeaderLeft}>
                    <h3>User</h3>
                    <Button label="Block user" size="large" variant="fill" />
                </div>
                <Breadcrumbs
                    omitRootLabel={true}
                    listClassName={styles.breadcrumbs}
                    replaceCharacterList={[{ from: '_', to: ' ' }]}
                />
            </div>
            <div className={styles.pageBody}>
                <Card className={styles.doctorRow}>
                    <div className={styles.imageContainer}>
                        <img
                            src="/images/users/user.png"
                            alt="doctor"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.name}>Leslie Alexander</div>
                        <div className={styles.mail}>
                            <ReactSVG src={'/images/icons/inputs/mail.svg'} />
                            <span>LeslieAlex@gmail.com</span>
                        </div>
                        <div className={styles.phone}>
                            <ReactSVG src={'/images/icons/inputs/phone.svg'} />
                            <span>(239) 555-0108 </span>
                        </div>
                    </div>
                    <EditAction
                        icon="/images/icons/inputs/edit.svg"
                        onClick={() => {}}
                    />
                </Card>
                <Card
                    cardTitle="Info"
                    cardActions={
                        <EditAction
                            icon="/images/icons/inputs/edit.svg"
                            onClick={() => {}}
                        />
                    }
                >
                    <div className={styles.userInfo}>
                        <div className={styles.infoColumn}>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>
                                    Date of birth
                                </div>
                                <div className={styles.dataValue}>
                                    23.03.1980
                                </div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>
                                    Registration address
                                </div>
                                <div className={styles.dataValue}>
                                    4140 Parker Rd. Allentown
                                </div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>
                                    Amount of orders
                                </div>
                                <div className={styles.dataValue}>89</div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>
                                    Card type
                                </div>
                                <div className={styles.dataValue}>Gold</div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>
                                    Сard status
                                </div>
                                <div className={styles.dataValue}>Active</div>
                            </div>
                        </div>
                        <div className={styles.infoShortColumn}>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>Gender</div>
                                <div className={styles.dataValue}>Female</div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>City</div>
                                <div className={styles.dataValue}>Tbilisi</div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>ID</div>
                                <div className={styles.dataValue}>17807709</div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>
                                    Card valid until
                                </div>
                                <div className={styles.dataValue}>
                                    14.06.2022
                                </div>
                            </div>
                            <div className={styles.dataRow}>
                                <div className={styles.dataTitle}>Family</div>
                                <div className={styles.dataValue}>
                                    <Button
                                        className={styles.addFamily}
                                        variant="text"
                                        label="+ Add member"
                                        size="large"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card
                    cardTitle="orders"
                    cardActions={
                        <div className={styles.orderActions}>
                            <div className={styles.dateContainer}>
                                <span>Date range</span>
                                <Input
                                    type="date"
                                    placeholder="01.01.2001-03.01.2001"
                                ></Input>
                            </div>
                            <div className={styles.selectContainer}>
                                <span>Status</span>
                                <Select
                                    className={styles.statusSelect}
                                    label="Status"
                                    options={[
                                        {
                                            label: 'Active',
                                            value: 'true',
                                        },
                                        {
                                            label: 'Closed',
                                            value: 'false',
                                        },
                                    ]}
                                    onChange={(value) => {
                                        setSelectedStatus(value);
                                    }}
                                    value={selectedStatus}
                                />
                            </div>
                        </div>
                    }
                >
                    <Table
                        columns={orderColumns}
                        rowClassName={styles.tableRow}
                        data={data}
                        pagination={{ pageSize: 5, initialPage: 1 }}
                    />
                </Card>
            </div>
        </div>
    );
}

UserDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
