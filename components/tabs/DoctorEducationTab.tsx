import styles from 'styles/components/Tabs/DoctorEducationTab.module.scss';
import { Card, Button, Table } from 'components';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import tableStyles from 'styles/components/Table.module.scss';
import AddDoctorEducation from 'components/modals/AddDoctorEducation';
import AddDoctorCertificate from 'components/modals/AddDoctorCertificate';

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
}

interface Education {
	school?: string;
	degree?: string;
	fieldOfStudy?: string;
	dateStart?: string;
	dateEnd?: string;
	galleryList?: any;
}

interface DoctorEducationTabProps {
	className?: string;
	certificates?: Certificate[];
	education?: Education[];
}

const certificatesColumns = [
	{
		key: 'title',
		title: 'Title',
		dataIndex: 'title',
	},
	{
		key: 'issuer',
		title: 'Issuing organization',
		dataIndex: 'issuer',
	},
	{
		key: 'expirationDate',
		title: 'Issued date',
		dataIndex: 'expirationDate',
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
		key: 'action',
		title: '',
		dataIndex: 'id',
		render: (action, key) => {
			return (
				<div
					className={`${tableStyles.tableIconCellTemplate} ${styles.smallIcon} ${styles.action}`}
					key={key}
					onClick={() => {}}
				>
					<img
						alt=''
						src='/images/icons/cards/more.svg'
					/>
				</div>
			);
		},
	},
];

export default function DoctorEducationTab({
	certificates = [],
	education = [],
}: DoctorEducationTabProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCertificate, setIsOpenCertificate] = useState(false);
	//   const router = useRouter();
	//   const id = router.query.id ?? null;

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
					{education.map((educationItem) => (
						<Card
							key={educationItem.school}
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
										<div
											key={mediaItem.alt}
											className={styles.media}
										>
											<ReactSVG
												src={'/images/icons/cards/camera.svg'}
												className={styles.icon}
											/>
											<div className={styles.mediaText}>{mediaItem.alt}</div>
										</div>
									))}
								</div>
							</div>
							<div className={styles.column}>
								<div onClick={() => {}}>
									<ReactSVG
										alt=''
										src='/images/icons/cards/more.svg'
										className={styles.editIcon}
									/>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Card>
		</>
	);
}
