import { AboutDoctorTab, Button, Card, DoctorEducationTab } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import { ReactSVG } from "react-svg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styles from "styles/pages/doctors_detailed.module.scss";
import tabStyles from "styles/components/tabs/Tabs.module.scss";

interface ActionProps {
  icon?: string;
  onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
  <ReactSVG src={icon} onClick={onClick} className={styles.edit}></ReactSVG>
);

export default function DoctorsDetailed() {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h3>Doctor</h3>
          <Button label="Orders" size="large" variant="fill" />
          <Button
            label="Deactivate an account"
            size="large"
            variant="outline"
          />
        </div>
        <Breadcrumbs
          omitRootLabel={true}
          listClassName={styles.breadcrumbs}
          replaceCharacterList={[{ from: "_", to: " " }]}
        />
      </div>
      <div className={styles.pageBody}>
        <Card className={styles.doctorRow}>
          <div className={styles.imageContainer}>
            <img
              src="/images/doctors/doctor.png"
              alt="doctor"
              className={styles.image}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.name}>Brooklyn Simmons</div>
            <div className={styles.speciality}>Neurologist • Freelancer</div>
            <div className={styles.mail}>
              <ReactSVG src={"/images/icons/inputs/mail.svg"} />
              <span>simon_doctor@gmail.com</span>
            </div>
            <div className={styles.phone}>
              <ReactSVG src={"/images/icons/inputs/phone.svg"} />
              <span>(603) 555-0123</span>
            </div>
          </div>
          <EditAction icon="/images/icons/inputs/edit.svg" onClick={() => {}} />
        </Card>
        <div className={styles.tabContainer}>
          <Tabs>
            <TabList className={tabStyles.tabList}>
              <Tab
                className={tabStyles.tab}
                tabIndex="1"
                selectedClassName={tabStyles.selectedTab}
              >
                <ReactSVG
                  src="/images/icons/tabs/info.svg"
                  className={styles.iconContainer}
                />
                <span>About the doctor</span>
              </Tab>
              <Tab
                className={tabStyles.tab}
                tabIndex="2"
                selectedClassName={tabStyles.selectedTab}
              >
                <ReactSVG
                  src="/images/icons/tabs/service.svg"
                  className={styles.iconContainer}
                />
                <span>Services</span>
              </Tab>
              <Tab
                className={tabStyles.tab}
                tabIndex="3"
                selectedClassName={tabStyles.selectedTab}
              >
                <ReactSVG
                  src="/images/icons/tabs/education.svg"
                  className={styles.iconContainer}
                />
                <span>Education</span>
              </Tab>
              <Tab
                className={tabStyles.tab}
                tabIndex="4"
                selectedClassName={tabStyles.selectedTab}
              >
                <ReactSVG
                  src="/images/icons/tabs/calendar.svg"
                  className={styles.iconContainer}
                />
                <span>Calender</span>
              </Tab>
            </TabList>
            <TabPanel className={tabStyles.tabPanel}>
              <AboutDoctorTab
                doctor={{
                  aboutMe:
                    "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
                  clinic: "Medical House",
                  clinicAddress: "4140 Parker Rd. Allentown, New Mexico 31134",
                  dateOfBirth: "23.0.1980",
                  gender: "Male",
                  iban: "DE51680501010002282022",
                  id: "17807709",
                  media: [
                    {
                      src: "/images/doctors/detailed/media1.png",
                      alt: "media1",
                    },
                    {
                      src: "/images/doctors/detailed/media2.png",
                      alt: "media2",
                    },
                    {
                      src: "/images/doctors/detailed/media3.png",
                      alt: "media3",
                    },
                    {
                      src: "/images/doctors/detailed/media4.png",
                      alt: "media4",
                    },
                    {
                      src: "/images/doctors/detailed/media5.png",
                      alt: "media5",
                    },
                  ],
                }}
              />
            </TabPanel>
            <TabPanel className={tabStyles.tabPanel}>b</TabPanel>
            <TabPanel className={tabStyles.tabPanel}>
              <DoctorEducationTab
                certificates={[
                  {
                    creditialId: "123456789",
                    creditialUri: "www.google.com",
                    issuedAt: "01.01.2020",
                    issuedBy: "Medical univercity",
                    name: "Certificate in neurology",
                  },
                  {
                    creditialId: "123456789",
                    creditialUri: "www.medical.com",
                    issuedAt: "Don't expire",
                    issuedBy: "Harvard BioScience",
                    name: "Rare diseases of the nervous system",
                  },
                ]}
                education={[
                  {
                    degree: "Doctor of Medicine",
                    endDate: "01.01.2020",
                    school: "Medical univercity",
                    startDate: "01.01.2010",
                    fieldsOfStudey: "Neurology",
                    media: [
                      {
                        src: "/images/doctors/detailed/media1.png",
                        alt: "media1",
                      },
                      {
                        src: "/images/doctors/detailed/media2.png",
                        alt: "media2",
                      },
                      {
                        src: "/images/doctors/detailed/media3.png",
                        alt: "media3",
                      },
                    ],
                  },
                  {
                    degree: "Doctor of Medicine",
                    endDate: "01.01.2020",
                    school: "Medical univercity",
                    startDate: "01.01.2010",
                    fieldsOfStudey: "Neurology",
                    media: [],
                  },
                ]}
              />
            </TabPanel>
            <TabPanel className={tabStyles.tabPanel}>d</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

DoctorsDetailed.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
