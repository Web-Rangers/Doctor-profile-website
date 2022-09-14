import { useState, useEffect } from 'react';
import {
	AboutDoctorTab,
	AddOrder,
	Button,
	Calendar,
	Card,
	DoctorEducationTab,
	DoctorServicesTab,
} from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { ReactSVG } from 'react-svg';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from 'styles/pages/doctors_detailed.module.scss';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import { useRouter } from 'next/router';
import {
	getFreelancerDoctor,
	getFreeLancerCertificate,
	getDoctor,
	getFreeLancerEducations,
} from 'components/useDoctorsData';
import { useQuery } from '@tanstack/react-query';
import EditDoctorModal from 'components/modals/EditDoctorModal';

interface ActionProps {
	icon?: string;
	onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
	<ReactSVG
		src={icon}
		onClick={onClick}
		className={styles.edit}
	></ReactSVG>
);

export default function DoctorsDetailed() {
	const router = useRouter();
	const id = router.query.id ?? null;
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

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
	console.log('sertificate', certificates.data);

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
						<Button
							label='Orders'
							size='large'
							variant='fill'
						/>
						<Button
							label='Deactivate an account'
							size='large'
							variant='outline'
						/>
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
								src={`${doctorData?.pictureUrl + `&?${new Date().getTime()}`}`}
								alt='doctor'
								className={styles.image}
							/>
						</div>
						<div className={styles.infoContainer}>
							<div className={styles.name}>
								{doctorData != null ? doctorData?.firstName : ''}
							</div>
							<div className={styles.speciality}>
								{' '}
								{doctorData != null
									? doctorData?.professions && doctorData?.professions[0].name
									: ''}
							</div>
							<div className={styles.mail}>
								<ReactSVG src={'/images/icons/inputs/mail.svg'} />
								<span>{email}</span>
							</div>
							<div className={styles.phone}>
								<ReactSVG src={'/images/icons/inputs/phone.svg'} />
								<span>{phone}</span>
							</div>
						</div>
						<EditAction
							icon='/images/icons/inputs/edit.svg'
							onClick={() => {
								setIsOpen(true);
							}}
						/>
					</Card>
					<div className={styles.tabContainer}>
						<Tabs>
							<TabList className={tabStyles.tabList}>
								<Tab
									className={tabStyles.tab}
									tabIndex='1'
									selectedClassName={tabStyles.selectedTab}
								>
									<ReactSVG
										src='/images/icons/tabs/info.svg'
										className={styles.iconContainer}
									/>
									<span>About the doctor</span>
								</Tab>
								<Tab
									className={tabStyles.tab}
									tabIndex='2'
									selectedClassName={tabStyles.selectedTab}
								>
									<ReactSVG
										src='/images/icons/tabs/service.svg'
										className={styles.iconContainer}
									/>
									<span>Services</span>
								</Tab>
								<Tab
									className={tabStyles.tab}
									tabIndex='3'
									selectedClassName={tabStyles.selectedTab}
								>
									<ReactSVG
										src='/images/icons/tabs/education.svg'
										className={styles.iconContainer}
									/>
									<span>Education</span>
								</Tab>
								<Tab
									className={tabStyles.tab}
									tabIndex='4'
									selectedClassName={tabStyles.selectedTab}
								>
									<ReactSVG
										src='/images/icons/tabs/calendar.svg'
										className={styles.iconContainer}
									/>
									<span>Calender</span>
								</Tab>
							</TabList>
							<TabPanel className={tabStyles.tabPanel}>
								<AboutDoctorTab
									onClose={() => setIsOpen(false)}
									onSave={(newData) => {
										setIsOpen(false);
									}}
									doctor={{
										firstName: doctorData != null ? doctorData?.firstName : '',
										lastName: doctorData != null ? doctorData?.lastName : '',
										pictureFile:
											doctorData != null ? doctorData?.pictureUrl : '',
										phone: doctorData != null ? phone : '',
										email: doctorData != null ? email : '',

										aboutMe: doctorData != null ? doctorData?.aboutMe : '',
										clinic: doctorData != null ? doctorData?.clinic : '',
										clinicAddress:
											'4140 Parker Rd. Allentown, New Mexico 31134',
										dateOfBirth:
											doctorData != null ? doctorData?.dateOfBirth : '',
										gender: doctorData != null ? doctorData?.gender : '',
										iban: doctorData != null ? doctorData?.iban : '',
										id: doctorData != null ? doctorData?.id : '',
										idNumber: doctorData != null ? doctorData?.idNumber : '',
										doctorType:
											doctorData != null ? doctorData?.doctorType : '',

										media: [
											{
												src: '/images/doctors/detailed/media1.png',
												alt: 'media1',
											},
											{
												src: '/images/doctors/detailed/media2.png',
												alt: 'media2',
											},
											{
												src: '/images/doctors/detailed/media3.png',
												alt: 'media3',
											},
											{
												src: '/images/doctors/detailed/media4.png',
												alt: 'media4',
											},
											{
												src: '/images/doctors/detailed/media5.png',
												alt: 'media5',
											},
										],
									}}
								/>
							</TabPanel>
							<TabPanel className={tabStyles.tabPanel}>
								<DoctorServicesTab
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
								/>
							</TabPanel>
							<TabPanel className={tabStyles.tabPanel}>
								<DoctorEducationTab
									certificates={certificates?.data}
									education={education?.data}
								/>
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
