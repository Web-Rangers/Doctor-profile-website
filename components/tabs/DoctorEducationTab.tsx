import styles from 'styles/components/Tabs/DoctorEducationTab.module.scss';
import { Card, Button, Table } from 'components';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import tableStyles from 'styles/components/Table.module.scss';
import AddDoctorEducation from 'components/modals/AddDoctorEducation';
import AddDoctorCertificate from 'components/modals/AddDoctorCertificate';
import Image from 'next/image';
import classNames from 'classnames';
import EditDoctorCertificate from 'components/modals/EditDoctorCertificate';
import axios from 'axios';
import { useRouter } from 'next/router';
import DoctorEducationPopup from './DoctorEducationPopup';

interface Media {
	src: string;
	alt?: string;
}

interface Certificate {
	credentialId?: string;
	credentialInfo?: string;
	doctorId?: string;
	expirationDate?: string;
	id?: string;
	issueDate?: string;
	issuer?: any;
	title?: string;
	galleryList?: any[];
}

interface Education {
	school?: string;
	degree?: string;
	fieldOfStudy?: string;
	dateStart?: string;
	dateEnd?: string;
	galleryList?: any;
	id?: any;
}

interface DoctorEducationTabProps {
	className?: string;
	certificates?: Certificate[];
	education?: Education[];
}

export default function DoctorEducationTab({
	certificates = [],
	education = [],
}: DoctorEducationTabProps) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCertificate, setIsOpenCertificate] = useState(false);

	const id = router.query.id ?? null;
	const certificateId = certificates?.map((item) => item.id);
	const educationId = education?.map((item) => item.id);

	console.log('educationId', educationId, certificateId);

	const removeCertificate = async () => {
		return axios
			.delete(
				`https://asclepius.pirveli.ge/asclepius/v1/api/doctors/${id}/certificates/${certificateId}`
			)
			.then((response) => {});
	};

	useEffect(() => {}, [certificates]);

	const certificatesColumns = [
		{
			key: 'name',
			title: 'Name',
			dataIndex: 'name',
		},
		{
			key: 'credentialId',
			title: 'Creditial ID',
			dataIndex: 'credentialId',
		},
		{
			key: 'credentialInfo',
			title: 'Creditial URL',
			dataIndex: 'credentialInfo',
		},
		{
			key: 'expirationDate',
			title: 'Issued date',
			dataIndex: 'expirationDate',
		},
		{
			key: 'expirationDate',
			title: 'Expiration date',
			dataIndex: 'expirationDate',
		},
		{
			key: 'id',
			title: '',
			dataIndex: 'id',
			render: (record, key) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [open, setOpen] = useState(false);
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [openModal, setOpenModal] = useState(false);

				const currentdata = certificates?.filter((item) => item.id == record);

				return (
					<>
						<div className={styles.more}>
							<ReactSVG
								onClick={() => {
									setOpen(!open);
									console.log('click', open);
								}}
								src={'/images/icons/cards/more.svg'}
								className={styles.moreIcon}
							/>
						</div>
						<div
							className={classNames(styles.morButton, {
								[styles.activeMoreBlock]: open,
							})}
						>
							<div className={styles.btns}>
								<div className={styles.moreBtn}>
									<ReactSVG
										src={'/images/icons/table/edit.svg'}
										className={styles.iconContainer}
										onClick={() => (setOpenModal(true), setOpen(!open))}
									/>

									{openModal && (
										<EditDoctorCertificate
											data={currentdata[0]}
											onClose={() => setOpenModal(false)}
											onSave={(newData) => {
												setOpenModal(false);
											}}
										/>
									)}
									<span onClick={() => (setOpenModal(true), setOpen(!open))}>
										Edit
									</span>
								</div>
								<div
									className={styles.moreBtn}
									onClick={() => removeCertificate()}
								>
									<ReactSVG
										src={'/images/icons/table/delete.svg'}
										className={styles.iconContainer}
									/>

									<span>Delete</span>
								</div>
							</div>
						</div>
					</>
				);
			},
		},
	];

	return (
		<>
			<Card
				cardTitle='Certificates'
				cardActions={
					<Button
						label={'Add certificate'}
						size='large'
						variant='fill'
						onClick={() => setIsOpenCertificate(true)}
					/>
				}
			>
				{isOpenCertificate && (
					<AddDoctorCertificate
						data={null}
						onClose={() => setIsOpenCertificate(false)}
						onSave={(newData) => {
							setIsOpenCertificate(false);
						}}
					/>
				)}
				<Table
					columns={certificatesColumns}
					data={certificates}
					pagination={null}
					rowClassName={styles.tableRow}
					cellClassName={styles.tableCell}
					headerClassName={styles.tableHeader}
				/>
			</Card>
			<Card
				cardTitle='Education'
				cardActions={
					<Button
						label={'Add education'}
						size='large'
						variant='fill'
						onClick={() => setIsOpen(true)}
					/>
				}
			>
				{isOpen && (
					<AddDoctorEducation
						data={null}
						onClose={() => setIsOpen(false)}
						onSave={(newData) => {
							setIsOpen(false);
						}}
					/>
				)}
				<div className={styles.educationContainer}>
					{education?.map((educationItem, index) => (
						<Card
							key={index}
							className={styles.educationCard}
						>
							<div className={styles.column}>
								<div className={styles.title}>School</div>
								<div className={styles.title}>Degree</div>
								<div className={styles.title}>Fields of study</div>
							</div>
							<div className={styles.column}>
								<div className={styles.value}>{educationItem.school}</div>
								<div className={styles.value}>{educationItem.degree}</div>
								<div className={styles.value}>{educationItem.fieldOfStudy}</div>
							</div>
							<div className={styles.column}>
								<div className={styles.title}>Start date</div>
								<div className={styles.title}>End date</div>
								<div className={styles.title}>Media</div>
							</div>
							<div className={styles.column}>
								<div className={styles.value}>{educationItem.dateStart}</div>
								<div className={styles.value}>{educationItem.dateEnd}</div>
								<div className={styles.mediaValue}>
									{educationItem?.galleryList?.map((mediaItem) => (
										<ImageItem
											alt={mediaItem.alt}
											key={mediaItem.id}
											url={mediaItem.url}
										/>
									))}
								</div>
							</div>
							<DoctorEducationPopup
								data={educationItem}
								id={id}
								educationId={educationItem?.id}
							/>
						</Card>
					))}
				</div>
			</Card>
		</>
	);
}

const ImageItem = (props) => {
	const [openPhoto, setOpenPhoto] = useState(false);
	return (
		<div
			key={props.alt}
			className={styles.media}
		>
			{openPhoto && (
				<>
					<Image
						src={props.url}
						width='500px'
						height='500px'
						alt=''
						className={styles.educationPhoto}
					/>
					<ReactSVG
						src={'/images/icons/inputs/x.svg'}
						className={styles.icon}
						onClick={() => setOpenPhoto(false)}
					/>
				</>
			)}
			<ReactSVG
				src={'/images/icons/cards/camera.svg'}
				className={styles.icon}
				onClick={() => setOpenPhoto(true)}
			/>
			<div className={styles.mediaText}>{props.alt}</div>
		</div>
	);
};
