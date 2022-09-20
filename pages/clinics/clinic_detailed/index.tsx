import { ReactSVG } from 'react-svg';
import { AddServicesModal, 
         Card, 
         ClinicModal, 
         OffersTab, 
         StuffTab, 
         GalleryTab, 
         GenerateBreadcrumbs, 
         Input, 
         Button, 
         getList, 
         AddBranchModal, 
         dayz, 
         getFirstStartEndHours, 
         RichObjectTreeView, 
         AlreadyExistClinic, 
         createTree, 
         AddPhotoToGallery
        } from 'components';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SideBarLayout from 'layouts/SideBarLayout';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import styles from 'styles/pages/clinic_detailed.module.scss';
import classNames from 'classnames';
import { useEffect, useState, useCallback } from 'react';
import BranchTab from 'components/tabs/BranchTab';
import { useRouter } from 'next/router'
import { useQuery } from "@tanstack/react-query";

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick}></ReactSVG>
);

export default function ClinicDetailed() {
    const [clinicEdtModalIsOpen, setClinicEdtModalIsOpen] = useState(false);
    const router = useRouter();
    const id = router.query.id ?? null;
    const[phoneNumber, setPhoneNumber] = useState('');
    const[email, setEmail] = useState('');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [tableSearch, setTableSearch] = useState('');
    const [workingHoursOpen, setWorkingHoursOpen] = useState(false);
    const [addBranchModal, setBranchModal] = useState(false);
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
    const [serviceAddModal, serServiceAddModal] = useState(false);
    
    const [showMore, setShowMore] = useState(false);
    const [addGalleryPic, setGalleryPic] = useState(false);

    let { data, refetch } = useQuery(["key", 'clinics'], ()=> { return getList(`clinics/${id}`, id) });
    let municipalities = useQuery(["key", 'municipalities'], ()=> { return getList(`municipalities`, '1') });

    let doctors = useQuery(["key", 'doctors'], ()=> { return getList(`clinics/${id}/doctors?page=0&size=5`, id) });
    let branch = useQuery(["key", 'branches'], ()=> { return getList(`clinics/${id}/branches/`, id) });
    let gallery = useQuery(["key", 'gallery'], ()=> { return getList(`gallery/clinic/${id}`, id) });
    let services = useQuery(["key", 'services'], ()=> { return getList(`accounting/contract-to-service/${data?.contracts?.contractId}`, data?.contracts?.contractId) });

    const [existClinic, setExistClinic] = useState({
        isOpen: false,
        data: null,
    })

    useEffect(()=> {
        refetch()
        branch.refetch()
        doctors.refetch()
        gallery.refetch()
        services.refetch()
    }, [id])

    useEffect(()=>{
        let numbers = data?.contactInfos.map((contact)=>{
            if(contact?.type.value == 'mobile') {
                return [contact.value]
            }
        })
        
        let emails = data?.contactInfos.map((contact)=>{
            if(contact?.type.value == 'mail') {
                return [contact.value]
            }
        })
        
        setPhoneNumber(numbers)
        setEmail(emails)
    },[data])

    useEffect(()=>{
        const newWorkingHours = workingHours?.map((item)=>{
            const getCurrentDay = data != null && data?.workingHours.filter((e)=> e.dayId === item.days);
            if(getCurrentDay.length > 0){
                return {...item, startHour: getCurrentDay[0]?.startHour, endHour: getCurrentDay[0]?.endHour, active: true}
            } else {
                return {...item, active: false}
            }
        })

        setWorkingHours(newWorkingHours)

    },[data, setWorkingHours])

    return (
        <>
            {
                addGalleryPic && <AddPhotoToGallery clinicId={id} onClose={()=> setGalleryPic(false)} refetch={()=> gallery.refetch()} />
            }
            {
                serviceAddModal && <AddServicesModal contractId={data?.contracts?.contractId} onClose={()=> serServiceAddModal(false)} alreadyExistServices={services?.data} refetch={services}/>
            }
            {
                existClinic.isOpen && <AlreadyExistClinic data={existClinic} onClose={()=> setExistClinic({isOpen: false, data: null})} />
            }
            {clinicEdtModalIsOpen && (
                <ClinicModal
                    data={data}
                    onClose={() => setClinicEdtModalIsOpen(false)}
                    onSave={(newData) => {
                        setClinicEdtModalIsOpen(false);
                    }}
                    onCancel={() => setClinicEdtModalIsOpen(false)}
                    refetch={()=> refetch()}
                    municipalities={municipalities?.data}
                />
            )}
            {addBranchModal && (
                <AddBranchModal
                    onCancel={() => setBranchModal(false)}
                    onClose={() => setBranchModal(false)}
                    onSave={() => {
                        setBranchModal(false);
                    }}
                    id={id}
                    refetch={()=> branch.refetch()}
                    isOpen={existClinic.isOpen}
                    setExistClinic={(bol)=> setExistClinic({isOpen: bol.isOpen, data: bol.data})}
                    municipalities={municipalities?.data}
                />
            )}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h3>Clinics</h3>
                    <GenerateBreadcrumbs customParams={null}/>
                </div>
                <div className={styles.pageBody}>
                    <div className={styles.row}>
                        <div className={styles.colSmall}>
                            <Card className={styles.smallCard}>
                                <img
                                    src={data?.logoUrl ? `${data?.logoUrl}&?${new Date().getTime()}` : '/'}
                                    alt="Picture of the author"
                                />
                                <div className={styles.clinicName}>
                                    {data?.displayName}
                                </div>
                                {/* <div className={styles.clinicRating}>
                                    <StarRatings
                                        rating={4}
                                        starRatedColor="#FFC14E"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        starSpacing="2.5px"
                                        className={styles.rating}
                                    ></StarRatings>
                                    <span className={styles.clinicRatingCount}>
                                        4
                                    </span>
                                    <span
                                        className={styles.clinicRatingDelimiter}
                                    >
                                        /
                                    </span>
                                    <span className={styles.clinicRatingMax}>
                                        5
                                    </span>
                                </div> */}
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
                                        {data != null ? getFirstStartEndHours(workingHours)?.startHour + ' - ' + getFirstStartEndHours(workingHours)?.endHour : ''}
                                    </span>
                                    <div className={classNames(styles.workingHoursBlock, {
                                        [styles.openWorkingHours]: workingHoursOpen
                                    })}>
                                        <div className={styles.workingHoursHeader}>
                                            <h2>Work schedule</h2>
                                            <div className={styles.xclose} onClick={()=>setWorkingHoursOpen(false)}>
                                                <ReactSVG src="/images/icons/inputs/x.svg" />
                                            </div>
                                        </div>
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
                                <div className={styles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/phone.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span className={styles.clinicInfText}>
                                        {phoneNumber}
                                    </span>
                                </div>
                                <div className={styles.clinicInf}>
                                    <ReactSVG
                                        src="/images/icons/clinics/location.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span className={styles.clinicInfText}>
                                        {data?.address.address}
                                    </span>
                                </div>
                            </Card>
                        </div>
                        <div className={styles.colLarge}>
                            <Card
                                cardTitle="Detailded information"
                                cardActions={
                                    <EditAction
                                        icon="/images/icons/inputs/edit.svg"
                                        onClick={() =>
                                            setClinicEdtModalIsOpen(true)
                                        }
                                    />
                                }
                            >
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        E-mail
                                    </div>
                                    <div className={styles.dataValue}>
                                        {email !== 'undefined' && email}
                                    </div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        Amount of orders
                                    </div>
                                    <div className={styles.dataValue}>128</div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        Registration date
                                    </div>
                                    <div className={styles.dataValue}>
                                        {data?.regDate}
                                    </div>
                                </div>
                                <div className={styles.dataRow}>
                                    <div className={styles.dataIndex}>
                                        About clinic
                                    </div>
                                    <div className={classNames(styles.dataValue, {
                                        [styles.activeAbout]: showMore
                                    })}>
                                        {data?.description}
                                    </div>
                                </div>
                                <div
                                    className={classNames(
                                        styles.dataRow,
                                        styles.noMargin
                                    )}
                                >
                                    <div className={styles.dataIndex}></div>
                                    <div className={styles.dataValue}>
                                        <button 
                                            className={styles.textButton}
                                            onClick={()=>setShowMore(!showMore)}
                                        >
                                            {!showMore ? 'See all' : 'Show less'}
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className={styles.tabContainer}>
                        <Tabs>
                            <TabList className={tabStyles.tabList}>
                                <Tab
                                    className={tabStyles.tab}
                                    tabIndex="1"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/branch.svg"
                                        className={styles.iconContainer}
                                    />
                                    <span>Branches</span>
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
                                    tabIndex="2"
                                    selectedClassName={tabStyles.selectedTab}
                                >
                                    <ReactSVG
                                        src="/images/icons/tabs/offer.svg"
                                        className={styles.iconContainer}
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
                                        className={styles.iconContainer}
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
                                        className={styles.iconContainer}
                                    />
                                    <span>Photo gallery</span>
                                </Tab>
                            </TabList>
                            <TabPanel className={tabStyles.tabPanel}>
                                <BranchTab 
                                    branchs={branch?.data} 
                                    clinicId={id}
                                    onClick={()=> setBranchModal(true)} 
                                />
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <div className={styles.servicesTable}>
                                    <div className={styles.servicesHeader}>
                                        <h2>Services</h2>
                                        <Button 
                                            label="Add Service"
                                            variant="fill"
                                            size="large"
                                            className={styles.serviceBtn}
                                            onClick={()=> serServiceAddModal(true)}
                                        />
                                        <div className={styles.servicesSearch}>
                                            <Input 
                                                type="text"
                                                className={styles.servInput}
                                            />
                                            <ReactSVG 
                                                className={styles.searchIcon}
                                                src="/images/icons/inputs/search.svg" 
                                            />
                                        </div>
                                    </div>
                                    <Services contractId={data?.contracts?.contractId} />
                                </div>
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <OffersTab
                                    offers={Array.from(new Array(5).keys()).map(
                                        (i) => {
                                            return {
                                                title:
                                                    i !== 1
                                                        ? 'First visit: free!'
                                                        : 'Second visit: freeeee freeeeeeee!',
                                                description:
                                                    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
                                                type:
                                                    i !== 1
                                                        ? 'Silver card'
                                                        : 'Gold card',
                                                period: '15.06.2022 - 06.06.2022',
                                            };
                                        }
                                    )}
                                />
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <StuffTab
                                    id={id}
                                    stuff={doctors?.data?.content?.map(
                                        (i) => (
                                            {
                                            icon: i.pictureUrl,
                                            address: data?.address?.address,
                                            amountOfOrders: '',
                                            city: data?.address.municipality.title,
                                            clinic: i.clinics[0].displayName,
                                            description:
                                                `${i.professions && i.professions[0].name} • ${i.doctorType ==='CLINIC_DOCTOR' ? 'Clinic Doctor' : 'Freelancer'}`,
                                            gender: i.gender === 'm' ? 'Male' : 'Female',
                                            name: i.firstName + ' ' + i.lastName,
                                            registrationDate: '',
                                        })
                                    )}
                                />
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <GalleryTab
                                    setGalleryPic={setGalleryPic}
                                    images={gallery?.data?.sort((a,b)=> b.galleryId - a.galleryId)}
                                    refetch={()=> gallery.refetch()}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}


export function Services(contractId) {
    const [service, setServices] = useState([]);
    let services = useQuery(["key", 'services'], ()=> { return getList(`accounting/contract-to-service/${contractId.contractId}`, contractId.contractId) });

    useEffect(()=>{
        const tree = createTree(services?.data, 'current')
        
        let newData = services?.data?.map((item)=>(item)).filter((item)=> item.parentServiceId == null);

        setServices(newData)
    },[services?.data])

    return <>
        <RichObjectTreeView 
            data={service ? service : [] } 
            originalData={services?.data && services?.data?.map((item)=>(item))}
            pagination={{ pageSize: 8, initialPage: 1 }} 
            contractId={contractId}
            variant={"current"}
            refetch={()=> services.refetch()}
        />
    </>
}

ClinicDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};