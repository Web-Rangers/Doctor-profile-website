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
      console.log(info);

      return <>{mobile.length > 0 ? mobile[0]?.value : ""}</>;
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
  id: string | any;
  firstName: string;
  value: string;
  doctorType: string;
  numberOfOrders: string;
}

interface DoctorsTabProps {
  doctors?: Doctors[];
}

export default function DoctorsTab({ doctors }: DoctorsTabProps) {
  console.log("null", doctors);

  const sortDoctors = doctors?.sort((a, b) => b.id - a.id);

  return (
    <Card cardTitle="Doctors">
      <Table
        columns={doctorsColumns}
        data={sortDoctors}
        pagination={{ pageSize: 8, initialPage: 1 }}
        rowClassName={styles.tableRow}
        // temp fix
        detailedUrl="/doctors/doctors_detailed/"
      ></Table>
    </Card>
  );
}
