import { useState, useEffect } from 'react';
import {
    AddOrder,
    Button,
    Calendar,
    Card,
    getList,
} from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { ReactSVG } from 'react-svg';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from 'styles/pages/doctors_detailed.module.scss';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import { useRouter } from 'next/router';
import StarRatings from 'react-star-ratings';
import {
    getFreelancerDoctor,
    getFreeLancerCertificate,
    getDoctor,
    getFreeLancerEducations,
} from 'components/useDoctorsData';
import { useQuery } from '@tanstack/react-query';
import EditDoctorModal from 'components/modals/EditDoctorModal';
import MultiSelectTreeViewDoctor from 'components/multiSelectTreeViewDoctor';

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick} className={styles.edit}></ReactSVG>
);

export default function DoctorsDetailed() {
    const router = useRouter();
    const id = router.query.id ?? null;
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [active, setActive] = useState(true);
    const [serviceData, setServices] = useState([]);

    var { data, refetch, isLoading, isError, error, status } = useQuery(
        ['key', 'doctorDetailed'],
        () => {
            return getFreelancerDoctor(id);
        }
    );

    const clinicDoctor = useQuery(['key', 'clinicdoctorDetailed'], () => {
        return getDoctor(id);
    });

    const doctorData =
        clinicDoctor?.data?.doctorType === 'CLINIC_DOCTOR'
            ? clinicDoctor?.data
            : data;

    console.log('clinicDoctor', doctorData);
    if (router.isReady) {
        refetch();
    }

    const clinicId = doctorData?.clinics?.map((item) => item.id);

    const certificates = useQuery(['key', 'freeLancerCertificate'], () => {
        return getFreeLancerCertificate(id);
    });

    const education = useQuery(['key', 'freeLancerEducation'], () => {
        return getFreeLancerEducations(id);
    });

    const educations = useEffect(() => {
        let numbers = doctorData?.contactInfos?.map((contact) => {
            if (contact?.type.value == 'mobile') {
                return [contact.value];
            }
        });

        let emails = doctorData?.contactInfos?.map((contact) => {
            if (contact?.type.value == 'mail') {
                return [contact.value];
            }
        });
        setPhone(numbers);
        setEmail(emails);
    }, [doctorData]);

    console.log('education', education.data);
    console.log('sertificate', certificates?.data);

    var services = useQuery(['key', 'services'], () => {
        return getList(`clinics/contract-type-to-services`, id);
    });

    function createTree(data) {
        let newData = data?.map((item) => item.services[0]);
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

        return root;
    }

    useEffect(() => {
        refetch();

        services.refetch();
    }, [id]);

    useEffect(() => {
        const tree = createTree(services?.data);

        let newData = services?.data
            ?.map((item) => item.services[0])
            .filter((item) => item.parentServiceId == null);

        setServices(newData);
        console.log('this is services data', newData);
    }, [services?.data]);

    return (
        <>
            {false && <AddOrder />}
            {isOpen && (
                <EditDoctorModal
                    data={doctorData}
                    onClose={() => setIsOpen(false)}
                    onSave={(newData) => {
                        setIsOpen(false);
                    }}
                    refetch={() => refetch()}
                />
            )}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div className={styles.pageHeaderLeft}>
                        <h3>Doctor</h3>
                    </div>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
                <div className={styles.pageBody}>
                    <Card className={styles.doctorRow}>
                        <div className={styles.imageContainer}>
                            <img
                                src={`/images/doctors/doctor.png`}
                                alt="doctor"
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.name}>Brooklyn Simmons</div>
                            <div className={styles.row}>
                                <div className={styles.speciality}>
                                    Neurologist
                                </div>
                                <div className={styles.birthday}>
                                    <ReactSVG
                                        src={'/images/icons/inputs/mail.svg'}
                                    />
                                    <span>01.01.1990</span>
                                </div>
                                <div className={styles.work}>
                                    <ReactSVG
                                        src={'/images/icons/inputs/phone.svg'}
                                    />
                                    <span>Self-employed</span>
                                </div>
								<div className={styles.more}>
									<Button label='See moree >' variant='text' size='large'/>
								</div>
                            </div>
							<div className={styles.rating}>
								
							<StarRatings
                                        rating={4}
                                        starRatedColor="#FFC14E"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        starSpacing="2.5px"
                                        className={styles.rating}
                                    ></StarRatings>
									<span className={styles.currentRating}>
										4
										</span>
										<span className={styles.fullRating}>
											{'/5'}
										</span>
							</div>
                        </div>
                    </Card>
                    <div className={styles.tabContainer}>
                        <Tabs>
                            <TabList className={tabStyles.tabList}>
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
                                {
                                    <MultiSelectTreeViewDoctor
                                        data={serviceData ?? []}
                                        pagination={{
                                            pageSize: 8,
                                            initialPage: 1,
                                        }}
                                    />
                                }
                                {/* <DoctorServicesTab
									services={[
										{
											name: 'Neurology',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'Cardiology',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'Dental',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'General Medicine',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'Orthopedics',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'Pediatrics',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'Psychiatry',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
										{
											name: 'Surgery',
											price: '100',
											doctorCommission: '10',
											platformCommission: '40',
											serviceDuration: '15',
										},
									]}
								/> */}
                            </TabPanel>
                            <TabPanel className={tabStyles.tabPanel}>
                                <Calendar />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

DoctorsDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
