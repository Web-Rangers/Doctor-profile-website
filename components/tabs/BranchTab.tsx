import { Card, Table, Button } from 'components';
import styles from 'styles/components/tabs/BranchTab.module.scss';
import tableStyles from 'styles/components/Table.module.css';
import ReactSelect from 'react-select';
import { ReactSVG } from 'react-svg';

const branchColumns = [
    {
        key: 'city',
        title: 'City',
        dataIndex: 'city',
    },
    {
        key: 'address',
        title: 'Address',
        dataIndex: 'address',
    },
    {
        key: 'contact',
        title: 'Contact',
        dataIndex: 'contact',
    },
    {
        key: 'branchId',
        title: 'Branch Id',
        dataIndex: 'branchId',
    },
    {
        key: 'workingHours',
        title: 'Working hours',
        dataIndex: 'workingHours',
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        headerStyle: {
            justifyContent: 'center',
        },
        render: (status, key) => {
            return (
                <div className={tableStyles.tableStatusCellTemplate} key={key}>
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
];

const BranchActions = () => {
    const options = [
        {
            value: '1',
            label: 'Services',
        },
        {
            value: '2',
            label: 'Ohther options',
        },
    ];
    return (
        <div className={styles.branchActions}>
            <button className={styles.reset}>
                <ReactSVG
                    src="/images/icons/inputs/reset.svg"
                    className={styles.iconContainer}
                />
                <span>Reset filter</span>
            </button>
            <ReactSelect
                options={options}
                className={styles.filter}
            ></ReactSelect>
            <Button label="Add branch" size="large" variant="fill" />
        </div>
    );
};

interface Branch {
    city: string;
    address: string;
    contact: string;
    branchId: string;
    workingHours: string;
    status: boolean;
}

interface BranchTabProps {
    branchs?: Branch[];
}

export default function BranchTab({ branchs }: BranchTabProps) {
    return (
        <Card cardTitle="Branches" cardActions={<BranchActions />}>
            <Table
                columns={branchColumns}
                data={branchs}
                pagination={false}
                rowClassName={styles.tableRow}
            ></Table>
        </Card>
    );
}
