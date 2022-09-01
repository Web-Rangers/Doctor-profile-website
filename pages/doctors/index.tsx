import { TabPanel, Tabs } from "react-tabs";
import DoctorsTab from "../../components/tabs/DoctorsTab";
import tabStyles from "styles/components/Tabs/tabs.module.scss";
import { getFreelancer } from "components/useDoctorsData";
import SideBarLayout from "layouts/SideBarLayout";
import { useQuery } from "@tanstack/react-query";

export default function DoctorsList() {
  var { data } = useQuery(["key", "freelancerDoctors"], () => {
    return getFreelancer();
  });

  console.log("data h", data);
  return (
    <Tabs>
      <TabPanel className={tabStyles.tabPanel}>
        <DoctorsTab doctors={data} />
      </TabPanel>
    </Tabs>
  );
}

DoctorsList.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
