import { useState, useEffect } from 'react';
import {
	AddOrder,
	Button,
	Calendar,
	Card,
	DoctorServicesTab,
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
	getFreeLancerServices,
	getDoctorsServices,
	getDoctor,
} from 'components/useDoctorsData';
import { useQuery } from '@tanstack/react-query';
import EditDoctorModal from 'components/modals/EditDoctorModal';
import MultiSelectTreeViewDoctor from 'components/multiSelectTreeViewDoctor';
import DoctorReviewsTab from 'components/tabs/DoctorReviewsTab';
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import Moment from 'react-moment';

interface ActionProps {
	icon?: string;
	onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
	<ReactSVG src={icon} onClick={onClick} className={styles.edit}></ReactSVG>
);

export default function DoctorsDetailed() {
	const { data: session, status } = useSession()

	const doctor = useQuery(
		['doctor'], 
		() => getDoctor(session?.user?.id)
	)
	const servicesFreelancer = useQuery(
		['doctorServicesFreelancer'], 
		() => getFreeLancerServices()
	)
	const servicesClinics = useQuery(
		['doctorServicesClinics'], 
		() => getDoctorsServices()
	)

	useEffect(() => {
		if (status == 'unauthenticated')
			signIn("credentials", {
				email: "forzaitalia@gmail.com",
				password: "qwerty"
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	},[status])

	useEffect(()=>{
		if (session?.user?.id)
			doctor.refetch()
	},[session])

	if (status !='authenticated' || !doctor.data) {
		return <></>
	}

	return (
		<>
			{false && <AddOrder />}
			{/* {isOpen && (
				<EditDoctorModal
					data={doctorData}
					onClose={() => setIsOpen(false)}
					onSave={(newData) => {
						setIsOpen(false);
					}}
					refetch={() => refetch()}
				/>
			)} */}
			<div className={styles.container}>
				<div className={styles.pageHeader}>
					<div className={styles.pageHeaderLeft}>
						<h3>Doctor</h3>
					</div>
					<Breadcrumbs
                        omitRootLabel={false}
                        rootLabel="Doctor's detailed page"
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
				</div>
				<div className={styles.pageBody}>
					<Card className={styles.doctorRow}>
						<div className={styles.imageContainer}>
							<Image
								src={`${doctor?.data?.pictureUrl}`}
								alt="doctor"
								width={100}
								height={100}
								className={styles.image}
							/>
						</div>
						<div className={styles.infoContainer}>
							<div className={styles.name}>{doctor?.data?.firstName} {doctor?.data?.lastName}</div>
							<div className={styles.row}>
								<div className={styles.professions}>
									{doctor?.data?.professions?.map((prof) => (
										<span key={`prof-${prof.id}`} className={styles.speciality}>
											{prof.name}
										</span>
									))}
								</div>
								<div className={styles.birthday}>
									<ReactSVG
										src={'/images/icons/doctor/cake.svg'}
									/>
									<Moment format='DD.MM.YYYY'>
										{doctor?.data?.dateOfBirth}
									</Moment>
								</div>
								<div className={styles.work}>
									<ReactSVG
										src={'/images/icons/doctor/briefcase.svg'}
									/>
									<span>Self-employed</span>
								</div>
								<div className={styles.more}>
									<Button className={styles.seeMore} label='See more >' variant='text' size='large' />
								</div>
							</div>
							{/* <div className={styles.rating}>
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
							</div> */}
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
									<span>Calendar</span>
								</Tab>
								<Tab
									className={tabStyles.tab}
									tabIndex="4"
									selectedClassName={tabStyles.selectedTab}
								>
									<ReactSVG
										src="/images/icons/tabs/chat-alt.svg"
										className={styles.iconContainer}
									/>
									<span>Reviews</span>
								</Tab>
							</TabList>
							<TabPanel className={tabStyles.tabPanel}>
								{/* {
                                    <MultiSelectTreeViewDoctor
                                        data={serviceData ?? []}
                                        pagination={{
                                            pageSize: 8,
                                            initialPage: 1,
                                        }}
                                    />
                                } */}
								<DoctorServicesTab
									services={
										doctor.data ? (
											doctor.data.doctorType=='FREELANCER' ? 
											servicesFreelancer.data 
											: 
											servicesClinics.data
										) : []										
									}
								/>
							</TabPanel>
							<TabPanel className={tabStyles.tabPanel}>
								<Calendar />
							</TabPanel>
							<TabPanel className={tabStyles.tabPanel}>
								<DoctorReviewsTab doctorId='0' />
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