import { Card, Table } from "components";
import styles from "styles/components/Tabs/BranchTab.module.scss";
import style from "styles/pages/addDoctor.module.scss";
import { Button } from "components/inputs";
import Link from "next/link";
import Breadcrumbs from "nextjs-breadcrumbs";
import tableStyles from "styles/components/Table.module.scss";
import router, { useRouter } from "next/router";

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

      return <>{mobile.length > 0 ? mobile[0]?.value : " 2  "}</>;
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
  {
    key: "action",
    title: "",
    dataIndex: "id",
    render: (record) => {
      return (
        <div
          className={`${tableStyles.tableIconCellTemplate} ${styles.smallIcon} ${styles.action}`}
          key={record.id}
          onClick={() => {
            router.push({
              pathname: "/doctors/edit",
              query: { id: record },
            });
          }}
        >
          <img alt="" src="/images/icons/cards/more.svg" />
        </div>
      );
    },
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
  const sortDoctors = doctors?.sort((a, b) => b.id - a.id);
  return (
    <>
      <div className={style.doctorsHeader}>
        <div className={style.doctorsHeader}>
          <span className={style.doctorTitle}>Doctors</span>

          <Link href={"./doctors/add"}>
            <Button
              variant="fill"
              label="Add doctor"
              size="large"
              className={style.addDoctorBtn}
            />
          </Link>
        </div>
        <Breadcrumbs
          omitRootLabel={false}
          listClassName={style.breadcrumbs}
          replaceCharacterList={[{ from: "_", to: " " }]}
          rootLabel="admin"
        />
      </div>
      <Card>
        <Table
          columns={doctorsColumns}
          data={sortDoctors}
          pagination={{ pageSize: 8, initialPage: 1 }}
          rowClassName={styles.tableRow}
          detailedUrl="/doctors/doctors_detailed/"
        ></Table>
      </Card>
    </>
  );
}
