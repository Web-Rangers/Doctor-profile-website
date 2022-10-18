import styles from '/styles/components/Tabs/DoctorServicesTab.module.scss';
import { Card, Button, Table } from 'components';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import AddDoctorServiceModal from 'components/modals/AddDoctorServiceModal';
import EditDoctorServiceModal from 'components/modals/EditDoctorServiceModal';
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Service {
	name: string;
	subservices: {
		name: string;
		price: string;
		platformCommission: string;
		serviceDuration: string;
	}[]
}

interface DoctorServicesTabProps {
	className?: string;
	services?: Service[];
}

const centerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

export default function DoctorServicesTab({
	services = [],
}: DoctorServicesTabProps) {
	
	const [openAddModal, setOpenAddModal] = useState(false);

	const [openEditModal, setOpenEditModal] = useState(false);

	return (
		<>
			<Card
				cardTitle='Services'
				cardActions={
					<Button
						label={'Add service'}
						size='large'
						variant='fill'
						onClick={() => setOpenAddModal(true)}
					/>
				}
			>
				{openAddModal && (
					<AddDoctorServiceModal
						onClose={() => setOpenAddModal(false)}
						onCancel={() => setOpenAddModal(false)}
						onSave={(newData) => {
							setOpenAddModal(false);
						}}
					/>
				)}
				{openEditModal && (
					<EditDoctorServiceModal
						data={services}
						onClose={() => setOpenEditModal(false)}
						onCancel={() => setOpenEditModal(false)}
						onSave={(newData) => {
							setOpenEditModal(false);
						}}
					/>
				)}
				<ServiceBlock service={null} />
			</Card>
		</>
	);
}

function ServiceBlock({service: Service}) {
	const [open, setOpen] = useState(false)

	return (
		<div 
			className={styles.serviceBlock}
			style={
				open ?
				{	
					boxShadow: "0px 4px 6px rgba(190, 187, 203, 0.25)",
					borderLeft: "3px solid #2751F2"
				}
				:
				{}
			}
		>
			<div 
				className={styles.serviceHeader}
				onClick={() => setOpen(!open)}
			>
				<span>Allergology</span>
				<motion.div 
					className={styles.chevron}
					style={ 
						open ? 
						{ transform: "" } 
						: 
						{ transform: "rotateZ(-90deg)" }
					}
				>
					<Image 
						src="/images/icons/inputs/chevron.svg"
						width={24}
						height={24}
					/>
				</motion.div>						
			</div>
			<motion.div 
				className={styles.services}
				transition={{ease:"easeInOut", duration: 0.2}}
				animate={ 
					open ? 
					{ 
						height: "auto"
					} 
					: 
					{ 
						height: "0px"
					}
				}
			>
				<div className={styles.serviceTable}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Subservice name</th>
								<th>Price</th>
								<th>Service commission</th>
								<th>Duration</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Subservice name</td>
								<td>Price</td>
								<td>Service commission</td>
								<td>Duration</td>
								<td>
									<div className={styles.edit}>
										<Image 
                	        			    src="/images/icons/staff/pencil.svg"
                	        			    width={20}
                	        			    height={20}
                	        			    alt=""
                	        			    style={{cursor:'pointer'}}
                	        			    onClick={() => {}}
                	        			/>
									</div>								
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	)
}