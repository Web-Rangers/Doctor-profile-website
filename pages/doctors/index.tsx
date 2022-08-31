import { TabPanel, Tabs } from "react-tabs";
import DoctorsTab from "../../components/tabs/DoctorsTab";
import tabStyles from "styles/components/Tabs/tabs.module.scss";
import { useFreeLancerDoctorData } from "components/useDoctorsData";
import SideBarLayout from "layouts/SideBarLayout";

export default function DoctorsList() {
  const doctors = useFreeLancerDoctorData();

  return (
    <Tabs>
      <TabPanel className={tabStyles.tabPanel}>
        <DoctorsTab doctors={doctors.data} />
      </TabPanel>
    </Tabs>
  );
}

DoctorsList.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
