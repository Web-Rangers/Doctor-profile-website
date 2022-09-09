import { ReactSVG } from 'react-svg';
import { Card, ClinicModal, OffersTab, StuffTab, GalleryTab, GenerateBreadcrumbs, Input, TableServices, getList, AddBranchModal, dayz, getFirstStartEndHours, RichObjectTreeView } from 'components';
import StarRatings from 'react-star-ratings';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SideBarLayout from 'layouts/SideBarLayout';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import styles from 'styles/pages/clinic_detailed.module.scss';
import Breadcrumbs from 'nextjs-breadcrumbs';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import BranchTab from 'components/tabs/BranchTab';
import { useRouter } from 'next/router'
import { useClinicData } from 'components';
import Link from 'next/link';
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick}></ReactSVG>
);

const branches = [
    {
        city: 'Tbilisi',
        address: '7 Simon Chikovani St',
        contact: '947 536 759',
        branchId: '896568984605',
        workingHours: '10:30-17:00',
        status: true,
    },
    {
        city: 'Tbilisi',
        address: '14 Merab Aleksidze St',
        contact: '386 904 204',
        branchId: '476097356897',
        workingHours: '11:30-18:00',
        status: false,
    },
    {
        city: 'Batumi',
        address: '7 Simon Chikovani St',
        contact: '702 942 424',
        branchId: '0757462129067',
        workingHours: '09:30-16:00',
        status: true,
    },
    {
        city: 'Tbilisi',
        address: '30b Mikheil Chiaureli St',
        contact: '104 794 209',
        branchId: '7082453675100',
        workingHours: '08:00-17:00',
        status: true,
    },
    {
        city: 'Kutaisi',
        address: '8 Simon Chikovani St',
        contact: '573 673 367',
        branchId: '707005790797',
        workingHours: '07:30-18:00',
        status: false,
    },
    {
        city: 'Akhaltsikhe',
        address: '11 Simon Chikovani St',
        contact: '865 234 056',
        branchId: '896568984605',
        workingHours: '12:00-16:00',
        status: true,
    },
];

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
    const [serviceData, setServices] = useState([]);

    const offerColumns = [
        {
            key: 'check_box',
            title: '',
            dataIndex: 'check_box',
            form: null
        },
        {
            key: 'id',
            title: 'Service Id',
            dataIndex: 'id',
            form: null
        },
        {
            key: 'title',
            title: 'Service name',
            dataIndex: 'title',
            form: null
        },
        {
            key: 'service_type',
            title: 'Type of service',
            dataIndex: 'service_type',
            form: null
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
            form: null
        },
        {
            key: 'duration',
            title: 'Duration',
            dataIndex: 'duration',
            form: null
        },
        {
            key: "actions",
            title: "",
            dataIndex: "actions",
            form: null,
            render: (record, key) => {
              return (
                    <div className={styles.tableActions}>
                        <ReactSVG 
                            src={"/images/icons/table/edit.svg"} 
                            className={styles.iconContainer}
                            onClick={()=> setEditModalOpen(true)}
                        />
                    </div>
                );
            },
        },
        {
            key: 'children',
            title:'',
            dataIndex: 'hidden',
            form: null
        }
    ];

    const analysisData = [
        {
            check_box: '758597122',
            service_id: '758597122',
            name:'ServiceName1',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
            subServices: [
            {
                id: 758597125,
                checkbox: false,
                title: 'SubserviceName3',
                status: 'Online',
                duration: 5781,
            },{
                id: 758597123,
                checkbox: false,
                title: 'SubserviceName2',
                status: 'Online',
                duration: 1281,
            },
        ]
        },
        {
            check_box: '758597232',
            service_id: '758597122',
            name:'ServiceName2',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
            subServices: [
                {
                    id: 758591122,
                    checkbox: false,
                    title: 'SubserviceName3',
                    status: 'Online',
                    duration: 5781,
                }
            ]
        },
        {
            check_box: '758594122',
            service_id:'758597122',
            name:'ServiceName3',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
        },
        {
            check_box: '758517122',
            service_id: '758597122',
            name:'ServiceName4',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
        },
        {
            check_box: '758591122',
            service_id: '758597122',
            name:'ServiceName5',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
            subServices: [
                {
                    id: 758597121,
                    checkbox: false,
                    title: 'SubserviceName3',
                    status: 'Online',
                    duration: 5781,
                },{
                    id: 758597192,
                    checkbox: false,
                    title: 'SubserviceName2',
                    status: 'Online',
                    duration: 1281,
                },
            ]
        },
        {
            check_box: '708597122',
            service_id: '758597122',
            name:'ServiceName6',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
        },
        {
            check_box: '758547122',
            service_id: '758597122',
            name:'ServiceName7',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
        },
        {
            check_box: '723597122',
            service_id: '758597122',
            name:'ServiceName8',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
        },
        {
            check_box: '258597122',
            service_id: '758597122',
            name:'ServiceName8',
            service_type: 'In clinic',
            duration:'1000',
            price: '800',
        }
    ];
    
    const [showMore, setShowMore] = useState(false);

    var { data, refetch } = useQuery(["key", 'clinics'], ()=> { return getList(`clinics/${id}`, id) });

    var doctors = useQuery(["key", 'doctors'], ()=> { return getList(`clinics/${id}/doctors?page=0&size=5`, id) });
    var branch = useQuery(["key", 'branches'], ()=> { return getList(`clinics/${id}/branches/`, id) });
    var services = useQuery(["key", 'services'], ()=> { return getList(`clinics/contract-type-to-services`, id) });

    function createTree(data) {
        let newData = data?.map((item)=>(item.services[0]));
        const idMapping = newData?.reduce((acc, el, i) => {
            acc[el.id] = i;
            return acc;
          }, {});

        let root: any;

        newData?.forEach((el) => {
            if (el.parentServiceId === null) {
                root = el;
                return;
            }
            const parentEl = newData[idMapping[el.parentServiceId]];
            parentEl.children = [...(parentEl.children || []), el];
        });

        return root
    }

    useEffect(()=> {
        refetch()
        doctors.refetch()
        branch.refetch()
        services.refetch();

        console.log(doctors)
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

    useEffect(()=>{
        const tree = createTree(services?.data)
        
        let newData = services?.data?.map((item)=>(item.services[0])).filter((item)=> item.parentServiceId == null);
        
        setServices(newData)
        console.log('this is services data', newData)
    },[services?.data])

    return (
        <>
            {clinicEdtModalIsOpen && (
                <ClinicModal
                    data={data}
                    onClose={() => setClinicEdtModalIsOpen(false)}
                    onSave={(newData) => {
                        setClinicEdtModalIsOpen(false);
                    }}
                    onCancel={() => setClinicEdtModalIsOpen(false)}
                    refetch={()=> refetch()}
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
                                <div className={styles.clinicRating}>
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
                                </div>
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
                                        {data?.registrationDate}
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
                                    {
                                        <RichObjectTreeView 
                                            data={serviceData} 
                                            pagination={{ pageSize: 8, initialPage: 1 }} 
                                        />
                                    }
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
                                    images={Array.from(new Array(6).keys()).map(
                                        (i) => ({
                                            src:
                                                '/images/gallery/photo' +
                                                (i + 1) +
                                                '.png',
                                        })
                                    )}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

ClinicDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
