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
	getFreelancerDoctor,
	getFreeLancerCertificate,
	getDoctor,
	getFreeLancerEducations,
} from 'components/useDoctorsData';
import { useQuery } from '@tanstack/react-query';
import EditDoctorModal from 'components/modals/EditDoctorModal';
import MultiSelectTreeViewDoctor from 'components/multiSelectTreeViewDoctor';
import DoctorReviewsTab from 'components/tabs/DoctorReviewsTab';

interface ActionProps {
	icon?: string;
	onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
	<ReactSVG src={icon} onClick={onClick} className={styles.edit}></ReactSVG>
);

export default function DoctorsDetailed() {
	

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
									<Button label='See moree >' variant='text' size='large' />
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
									services={[
										{
											name: 'Neurology',
											subservices:[
												{
													name: 'Online consultation',
													price: '100',
													platformCommission: '40',
													serviceDuration: '15'
												},
												{
													name: 'Deciphering analyzes',
													price: '100',
													platformCommission: '40',
													serviceDuration: '15'
												}
											]
										},
										{
											name: 'Cardiology',
											subservices:[
												{
													name: 'Online consultation',
													price: '100',
													platformCommission: '40',
													serviceDuration: '15'
												},
												{
													name: 'Deciphering analyzes',
													price: '100',
													platformCommission: '40',
													serviceDuration: '15'
												}
											]
										},
										{
											name: 'Endocrinology',
											subservices:[
												{
													name: 'Online consultation',
													price: '100',
													platformCommission: '40',
													serviceDuration: '15'
												},
												{
													name: 'Deciphering analyzes',
													price: '100',
													platformCommission: '40',
													serviceDuration: '15'
												}
											]
										},
									]}
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
