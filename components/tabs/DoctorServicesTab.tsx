import styles from "styles/components/tabs/DoctorServicesTab.module.scss";
import { Card, Button, Table } from "components";
import { ReactSVG } from "react-svg";

interface Service {
  name: string;
  price: string;
  doctorCommission: string;
  platformCommission: string;
}

interface DoctorServicesTabProps {
  className?: string;
  services?: Service[];
}

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const servicesColumns = [
  {
    key: "name",
    title: "Service name",
    dataIndex: "name",
  },
  {
    key: "price",
    title: "Price",
    dataIndex: "price",
    cellStyle: centerStyle,
    headerStyle: centerStyle,
  },
  {
    key: "doctorCommission",
    title: "Doctor's commission",
    dataIndex: "doctorCommission",
    cellStyle: centerStyle,
    headerStyle: centerStyle,
  },
  {
    key: "platformCommission",
    title: "Platform commission",
    dataIndex: "platformCommission",
    cellStyle: centerStyle,
    headerStyle: centerStyle,
  },
  {
    key: "actions",
    title: "",
    dataIndex: "actions",
    render: (record, key) => {
      return (
        <div className={styles.tableActons}>
          <ReactSVG src={"/images/icons/table/edit.svg"} className={styles.iconContainer}/>
          <ReactSVG src={"/images/icons/table/delete.svg"} className={styles.iconContainer}/>
        </div>
      );
    },
  },
];

export default function DoctorServicesTab({
  services = [],
}: DoctorServicesTabProps) {
  return (
    <>
      <Card
        cardTitle="Services"
        cardActions={
          <Button
            label={"Add service"}
            size="large"
            variant="fill"
            onClick={() => {}}
          />
        }
      >
        <Table
          columns={servicesColumns}
          data={services}
          pagination={{
            pageSize: 8,
          }}
          rowClassName={styles.tableRow}
          cellClassName={styles.tableCell}
          headerClassName={styles.tableHeader}
          bodyClassName={styles.tableBody}
        />
      </Card>
    </>
  );
}
