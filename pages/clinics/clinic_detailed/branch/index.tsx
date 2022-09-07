import { ReactSVG } from "react-svg";
import {
  Card,
  BranchModal,
  ServicesTab,
  OffersTab,
  StuffTab,
  GalleryTab,
  Button,
} from "components";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SideBarLayout from "layouts/SideBarLayout";
import tabStyles from "styles/components/Tabs/tabs.module.scss";
import cDStyles from "styles/pages/clinic_detailed.module.scss";
import styles from "styles/pages/branch.module.scss";
import tableStyles from "styles/components/Table.module.scss";
import Breadcrumbs from "nextjs-breadcrumbs";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useQuery } from "@tanstack/react-query";
import {getList} from 'components';
import {GenerateBreadcrumbs, getFirstStartEndHours, dayz} from 'components';

interface ActionProps {
  icon?: string;
  onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
  <ReactSVG src={icon} onClick={onClick}></ReactSVG>
);

const Status = ({ active }: { active: boolean }) => {
  return (
    <div
      className={classNames(tableStyles.tableStatus, {
        [tableStyles.statusOpen]: active,
        [tableStyles.statusClosed]: !active,
      })}
    >
      {active ? "Open" : "Close"}
    </div>
  );
};

export default function Branch() {
    const [branchModalIsOpen, setBranchModalIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const router = useRouter();
    const id = router.query.id ?? null;
    const parentId = router.query.parentId ?? null;
    const[phoneNumber, setPhoneNumber] = useState('');
    const[email, setEmail] = useState('');
    const [workingHoursOpen, setWorkingHoursOpen] = useState(false);
    const [workingHours, setWorkingHours] = useState([
        {
            days: 1,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 2,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 3,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 4,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 5,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 6,
            endHour: '',
            startHour: '',
            active: false
        },
        {
            days: 7,
            endHour: '',
            startHour: '',
            active: false
        }
    ]);

    var branchDetail = useQuery(["key", 'branch'], ()=> { return getList(`clinics/${id}`, id) });
    var branchDoctors = useQuery(["key", 'branchDoctors'], ()=> { return getList(`clinics/${id}/doctors`, id) });

    if(router.isReady) {
        branchDetail.refetch();
        branchDoctors.refetch();
    }

    useEffect(()=>{
        let numbers = branchDetail?.data != null && branchDetail?.data?.contactInfos?.map((contact)=>{
            if(contact?.type.value == 'mobile') {
                return [contact.value]
            }
        })
        
        let emails =branchDetail?.data != null && branchDetail?.data?.contactInfos?.map((contact)=>{
            if(contact?.type.value == 'mail') {
                return [contact.value]
            }
        })
        
        setPhoneNumber(numbers)
        setEmail(emails)
    },[branchDetail?.data])

    useEffect(()=>{
        const newWorkingHours = workingHours?.map((item)=>{
            const getCurrentDay = branchDetail?.data != null && branchDetail?.data.workingHours.filter((e)=> e.dayId === item.days);
            if(getCurrentDay.length > 0){
                return {...item, startHour: getCurrentDay[0]?.startHour, endHour: getCurrentDay[0]?.endHour, active: true}
            } else {
                return {...item, active: false}
            }
        })

        setWorkingHours(newWorkingHours)
    },[branchDetail?.data, setWorkingHours])

    return (
        <>
            {branchModalIsOpen && (
                <BranchModal
                    onClose={() => setBranchModalIsOpen(false)}
                    mode={modalMode === "add" ? "add" : "edit"}
                    onCancel={() => setBranchModalIsOpen(false)}
                    onSave={() => setBranchModalIsOpen(false)}
                    data={branchDetail?.data}
                    refetch={()=> branchDetail.refetch()}
                />
            )}
            <div className={cDStyles.container}>
                <div className={cDStyles.pageHeader}>
                    <div className={styles.pageHeaderLeft}>
                        <h3>Branch</h3>
                        <Button label="Deactivate branch" size="large" variant="fill" />
                    </div>
                    <GenerateBreadcrumbs
                        customParams={[parentId, id]}
                    />
                </div>
                <div className={cDStyles.pageBody}>
                    <div className={cDStyles.row}>
                        <div className={cDStyles.colSmall}>
                            <Card className={cDStyles.smallCard}>
                                <img
                                    alt=""
                                    src={branchDetail?.data != null ? branchDetail?.data?.logoUrl + `&?${new Date().getTime()}` : "/images/icons/clinics/medicalhouse.png"}
                                    className={cDStyles.clinicIcon}
                                />
                                <div className={cDStyles.clinicName}>{branchDetail?.data != null ? branchDetail?.data?.displayName : ''}</div>
                                <div 
                                    className={classNames(styles.clinicInf)}
                                    onClick={()=> setWorkingHoursOpen(!workingHoursOpen)}
                                >
                                    <ReactSVG
                                        src="/images/icons/clinics/clock.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span className={classNames(styles.clinicInfText, {
                                        [styles.activeClinicInf]: workingHoursOpen
                                    })}>
                                        {branchDetail?.data != null ? getFirstStartEndHours(workingHours)?.startHour + ' - ' + getFirstStartEndHours(workingHours)?.endHour : ''}
                                    </span>
                                    <div className={classNames(styles.workingHoursBlock, {
                                        [styles.openWorkingHours]: workingHoursOpen
                                    })}>
                                        <h2>Work schedule</h2>
                                        <div className={styles.workHoursList}>
                                            {
                                                workingHours?.map((item)=>{
                                                    return <>
                                                    {
                                                        item.active ? (
                                                            <div>
                                                                <h4>{dayz[item.days - 1]}</h4>
                                                                <span>{item?.startHour} - {item?.endHour}</span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <h4>{dayz[item.days - 1]}</h4>
                                                                <span className={styles.dayOff}>Day off</span>
                                                            </div>
                                                        )
                                                    }
                                                    </>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cDStyles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/phone.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span className={cDStyles.clinicInfText}>{phoneNumber}</span>
                                </div>
                                <div className={cDStyles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/location.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span className={cDStyles.clinicInfText}>
                                        {branchDetail?.data != null ? branchDetail?.data?.address.address : ''}
                                    </span>
                                </div>
                            </Card>
                        </div>
                        <div className={cDStyles.colLarge}>
                            <Card
                                cardTitle="Detailded information"
                                cardActions={
                                    <EditAction
                                        icon="/images/icons/inputs/edit.svg"
                                        onClick={() => {
                                            setModalMode("edit");
                                            setBranchModalIsOpen(true);
                                        }}
                                    />
                                }
                            >
                                <div className={cDStyles.dataRow}>
                                    <div className={cDStyles.dataIndex}>Branch ID</div>
                                    <div className={cDStyles.dataValue}>
                                        {branchDetail?.data != null ? branchDetail?.data?.id : ''}
                                    </div>
                                </div>
                                <div className={cDStyles.dataRow}>
                                    <div
                                        className={classNames(cDStyles.dataIndex, styles.dataIndex)}
                                    >
                                        Status
                                    </div>
                                    <div className={cDStyles.dataValue}>
                                        {branchDetail?.data != null ? branchDetail?.data?.isActive ? 
                                        <Status active></Status> : 
                                        <Status active={false}></Status> : ''}
                                    </div>
                                </div>
                                <div className={cDStyles.dataRow}>
                                    <div className={cDStyles.dataIndex}>About clinic</div>
                                    <div className={cDStyles.dataValue}>
                                        {branchDetail?.data != null ? branchDetail?.data?.description : ''}
                                    </div>
                                </div>
                                <div className={styles.whiteSpace}></div>
                                <div
                                    className={classNames(cDStyles.dataRow, cDStyles.noMargin)}
                                >
                                    <div className={cDStyles.dataIndex}></div>
                                    <div className={cDStyles.dataValue}>
                                        <button className={cDStyles.textButton}>See all</button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className={cDStyles.tabContainer}>
                        <Tabs>
                            <TabList className={tabStyles.tabList}>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="1"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/Service.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span>Services</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="2"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/offer.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span>Offers</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="3"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/stuff.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span>Stuff</span>
                                </Tab>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="4"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/gallery.svg"
                                        className={cDStyles.iconContainer}
                                    />
                                    <span>Photo gallery</span>
                                </Tab>
                            </TabList>
                            <TabPanel className={tabStyles.tabPanel}>
                                <ServicesTab
                                    services={Array.from(new Array(50).keys()).map((x) => {
                                        return {
                                            name: "Service " + x,
                                            enabled: true,
                                        };
                                    })}
                                />
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <OffersTab
                                    offers={Array.from(new Array(5).keys()).map((i) => {
                                        return {
                                            title:
                                                i !== 1
                                                    ? "First visit: free!"
                                                    : "Second visit: freeeee freeeeeeee!",
                                            description:
                                                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                                            type: i !== 1 ? "Silver card" : "Gold card",
                                            period: "15.06.2022 - 06.06.2022",
                                        };
                                    })}
                                />
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <StuffTab
                                    stuff={branchDoctors?.data?.map(
                                        (i) => ({
                                            icon: i.pictureUrl,
                                            address: '11 Simon Chikovani St',
                                            amountOfOrders: 143,
                                            city: 'Akhaltsikhe',
                                            clinic: i.clinics[0].displayName,
                                            description:
                                                `${i.professions[0].name} • ${i.doctorType ==='CLINIC_DOCTOR' ? 'Clinic Doctor' : 'Freelancer'}`,
                                            gender: i.gender === 'm' ? 'Male' : 'Female',
                                            name: i.firstName + ' ' + i.lastName,
                                            rating: 4.7,
                                            registrationDate: '04.11.2017',
                                        })
                                    )}
                                />
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <GalleryTab
                                    images={Array.from(new Array(6).keys()).map((i) => ({
                                        src: "/images/gallery/photo" + (i + 1) + ".png",
                                    }))}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

Branch.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
