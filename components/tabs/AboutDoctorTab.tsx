import styles from 'styles/components/Tabs/AboutDoctorTab.module.scss';
import { Card, Button, Modal, Input, Select, DatePicker } from 'components';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AddDoctorCertificate from 'components/modals/AddDoctorCertificate';

interface Media {
	src: string;
	alt?: string;
}

interface Doctor {
	dateOfBirth?: string;
	id?: string;
	clinicAddress?: string;
	clinic?: string;
	iban?: string;
	gender?: 'Male' | 'Female';
	aboutMe?: string;
	media?: Media[];
	doctorType?: string;
	firstName?: string;
	lastName?: string;
	pictureFile?: any;
	phone?: string;
	email?: string;
	idNumber?: string;
}

interface AboutDoctorTabProps {
	className?: string;
	doctor?: Doctor;
	onSave?: (newData: Doctor) => void;
	onClose?: () => void;
}
interface ActionProps {
	icon?: string;
	onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
	<ReactSVG
		src={icon}
		onClick={onClick}
	></ReactSVG>
);

export default function AboutDoctorTab({
	doctor = {},
	onSave,
}: AboutDoctorTabProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [clinic, setClinic] = useState<string>('');
	const [personalId, setPersonalId] = useState(doctor?.idNumber);
	const [dateOfBirth, setDateOfBirth] = useState(doctor?.dateOfBirth);
	const [iban, setIban] = useState(doctor?.iban);
	const [gender, setGender] = useState<string>(doctor?.gender);
	const [aboutMe, setAboutMe] = useState(doctor?.aboutMe);
	const [isOpen, setIsOpen] = useState(false);

	const modifyDoctor = async () => {
		let formData = new FormData();
		formData.append('firstName', doctor?.firstName);
		formData.append('lastName', doctor?.lastName);
		formData.append('phone', doctor?.phone[0]);
		formData.append('email', doctor?.email[1]);
		formData.append('professionId', '1');
		formData.append('personalId', personalId);
		formData.append('dateOfBirth', dateOfBirth);
		formData.append('iban', iban);
		formData.append('gender', gender);
		formData.append('aboutMe', aboutMe);
		formData.append('isActive', 'true');
		formData.append('pictureFile', null);

		return axios
			.put(
				`https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers/${doctor?.id}`,
				formData,
				{
					headers: {
						'Content-Type': `multipart/form-data`,
					},
				}
			)
			.then((response) => {
				console.log('this is response', response);
				setIsEditing(false);
			})
			.catch((error) => {
				if (error.response) console.log(error.response);
			});
	};
	const { mutate: doctorUpdate } = useMutation(modifyDoctor);

	return (
		<>
			{isEditing && (
				<Modal
					onBackClick={() => {
						setIsEditing(false);
					}}
				>
					<div className={styles.modal}>
						<div className={styles.modalHeader}>
							<div className={styles.modalTitle}>Edit information</div>
							<div className={styles.modalClose}>
								<ReactSVG
									src={'/images/icons/inputs/x.svg'}
									onClick={() => {
										setIsEditing(false);
									}}
									className={styles.close}
								/>
							</div>
						</div>
						<div className={styles.modalBody}>
							<div className={styles.editRow}>
								<div className={styles.editColumn}>
									<Input
										label='ID'
										maxLength={11}
										type='number'
										value={personalId}
										onChange={(value: string) => setPersonalId(value)}
									/>
									<Input
										label='IBAN'
										value={iban}
										onChange={(value: string) => setIban(value)}
									/>
									<Input
										label='Branch'
										disabled={doctor.doctorType === 'FREELANCER' ? true : false}
									/>
								</div>
								<div className={styles.editColumn}>
									<DatePicker
										label='Date of birth'
										mode='single'
										value={dateOfBirth}
										onChange={(value: string) => setDateOfBirth(value)}
									/>
									<Select
										label='Gender'
										labelStyle='outside'
										options={[
											{
												label: 'Male',
												value: 'm',
											},
											{
												label: 'Female',
												value: 'f',
											},
										]}
										onChange={(value) => {
											setGender(value);
										}}
										value={gender}
									/>
									<Select
										disabled={doctor.doctorType === 'FREELANCER' ? true : false}
										label='Clinic'
										labelStyle='outside'
										options={[
											{
												label: 'Clinic 1',
												value: '1',
											},
											{
												label: 'Clinic 2',
												value: '2',
											},
										]}
										onChange={(value) => {
											setClinic(value);
										}}
										value={clinic}
									/>
								</div>
							</div>
							<Input
								label='About me'
								type='text'
								multiline
								value={aboutMe}
								onChange={(value: string) => setAboutMe(value)}
							/>
						</div>
						<div className={styles.modalFooter}>
							<Button
								label='Cancel'
								size='large'
								variant='outline'
								onClick={() => {
									setIsEditing(false);
								}}
							/>
							<Button
								label='Save'
								size='large'
								variant='fill'
								onClick={() => {
									personalId.length !== 11
										? alert('personal Id should be 11 charachters')
										: doctorUpdate();
									onSave?.call(null, {
										personalId,
										dateOfBirth,
										iban,
										gender,
										aboutMe,
									});
								}}
							/>
						</div>
					</div>
				</Modal>
			)}
			<Card
				cardTitle='Info'
				cardActions={
					<EditAction
						icon='/images/icons/inputs/edit.svg'
						onClick={() => {
							setIsEditing(true);
						}}
					/>
				}
			>
				<div className={styles.container}>
					<div className={styles.info}>
						<div className={styles.subInfo}>
							<div className={styles.infoTitle}>Date of birth</div>
							<div className={styles.infoText}>{doctor.dateOfBirth}</div>
						</div>
						<div className={styles.subInfo}>
							<div className={styles.infoTitle}>ID</div>
							<div className={styles.infoText}>{doctor.idNumber}</div>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.subInfo}>
							<div className={styles.infoTitle}>Clinic</div>
							<div className={styles.infoText}>{doctor.clinicAddress}</div>
						</div>
						<div className={styles.subInfo}>
							<div className={styles.infoTitle}>Clinic</div>
							<div className={styles.infoText}>{doctor.clinic}</div>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.subInfo}>
							<div className={styles.infoTitle}>IBAN</div>
							<div className={styles.infoText}>{doctor.iban}</div>
						</div>
						<div className={styles.subInfo}>
							<div className={styles.infoTitle}>Gender</div>
							<div className={styles.infoText}>
								{gender === 'm' ? 'Male' : 'Female'}
							</div>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.infoTitle}>About me</div>
						<div className={styles.infoText}>{doctor.aboutMe}</div>
					</div>
				</div>
			</Card>
			<Card
				cardTitle='Media files'
				cardActions={
					<Button
						label={'Add certificate'}
						size='large'
						variant='fill'
						onClick={() => setIsOpen(true)}
					/>
				}
			>
				{isOpen && (
					<AddDoctorCertificate
						data={null}
						onClose={() => setIsOpen(false)}
						onSave={(newData) => {
							setIsOpen(false);
						}}
					/>
				)}

				<div className={styles.mediaContainer}>
					{doctor.media?.map((media, index) => (
						<div
							key={index}
							className={styles.mediaItem}
						>
							<img
								src={media.src}
								alt={media.alt}
							/>
						</div>
					))}
				</div>
			</Card>
		</>
	);
}
