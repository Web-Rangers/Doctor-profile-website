import { Card, Table, Button, Select } from "components";
import styles from "styles/components/Tabs/BranchTab.module.scss";
import tableStyles from "styles/components/Table.module.scss";
import ReactSelect from "react-select";
import { ReactSVG } from "react-svg";
import { useState } from "react";

const branchColumns = [
    {
        key: "address",
        title: "Address",
        dataIndex: "address",
        render: (city)=> {
            return <div className={styles.tableItem}>{city?.address}</div>
        }
    },
    {
        key: "contactInfos",
        title: "Contact",
        dataIndex: "contactInfos",
        render: (contact)=> {
            return <div className={styles.tableItem}>{contact[0].value}</div>
        }
    },
    {
        key: "regId",
        title: "Branch ID",
        dataIndex: "regId",
    },
    {
        key: "workingHours",
        title: "Working hours",
        dataIndex: "workingHours",
        render: (work)=>{
            return <div className={styles.tableItem}>{work[0].startHour} - {work[0].endHour}</div>
        }
    },
    {
        key: "isActive",
        title: "Status",
        dataIndex: "isActive",
        headerStyle: {
            justifyContent: "center",
        },
        render: (status, key) => {
            return (
                <div className={tableStyles.tableStatusCellTemplate} key={key}>
                    <div
                        className={`${tableStyles.tableStatus} ${styles.tableStatus} ${status ? tableStyles.statusOpen : tableStyles.statusClose
                            }`}
                    >
                        {status ? "Open" : "Close"}
                    </div>
                </div>
            );
        },
    },
];

const BranchActions = ({onClick}) => {
    const [selectedService, setSelectedService] = useState(null);
    const options = [
        {
            value: "1",
            label: "Services",
        },
        {
            value: "2",
            label: "Ohther options",
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
            <Select
                label="Services"
                onChange={setSelectedService}
                options={[
                    { label: "Service 1", value: "1" },
                    { label: "Service 2", value: "2" },
                ]}
                value={selectedService}
            />
            <Button label="Add branch" size="large" variant="fill" onClick={onClick()}/>
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
    click?: () => void;
}

interface BranchTabProps {
    branchs?: Branch[];
    clinicId?: any;
    onClick?: () => void;
}

export default function BranchTab({ branchs, clinicId, onClick }: BranchTabProps) {
    console.log(clinicId)
    return (
        <Card cardTitle="Branches" cardActions={<BranchActions onClick={()=> onClick} />}>
            <Table
                columns={branchColumns}
                data={branchs}
                pagination={null}
                rowClassName={styles.tableRow}
                // temp fix
                querys={`${clinicId}`}
                detailedUrl={`/clinics/clinic_detailed/branch`}
            ></Table>
        </Card>
    );
}
