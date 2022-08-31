import { Card, Table } from "components";
import styles from "styles/components/Tabs/BranchTab.module.scss";

const doctorsColumns = [
  {
    key: "Doctor ID",
    title: "Doctor ID",
    dataIndex: "id",
  },
  {
    key: "Name",
    title: "Name",
    dataIndex: "firstName",
  },
  {
    key: "contactInfos",
    title: "Phone",
    dataIndex: "contactInfos",
    render: (info) => {
      const mobile = info?.filter((contact) => contact.type.value === "mobile");
      console.log(mobile);

      return <>{mobile !== [] ? mobile[0]?.value : ""}</>;
    },
  },
  {
    key: "Type",
    title: "Type",
    dataIndex: "doctorType",
  },
  {
    key: "Number of orders",
    title: "Number of orders",
    dataIndex: "Number of orders",
  },
];

interface Doctors {
  id: string;
  firstName: string;
  value: string;
  doctorType: string;
  numberOfOrders: string;
}

interface DoctorsTabProps {
  doctors?: Doctors[];
}

export default function DoctorsTab({ doctors }: DoctorsTabProps) {
  console.log("datasss", doctors);
  return (
    <Card cardTitle="Doctors">
      <Table
        columns={doctorsColumns}
        data={doctors}
        pagination={{ pageSize: 8, initialPage: 1 }}
        rowClassName={styles.tableRow}
        // temp fix
        detailedUrl="/doctors/doctors_detailed/"
      ></Table>
    </Card>
  );
}
