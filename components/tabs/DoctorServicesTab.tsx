import styles from '/styles/components/Tabs/DoctorServicesTab.module.scss';
import { Card, Button, Table } from 'components';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import AddDoctorServiceModal from 'components/modals/AddDoctorServiceModal';
import EditDoctorServiceModal from 'components/modals/EditDoctorServiceModal';
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function DoctorServicesTab({services = []}) {
	console.log(services)
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
				<div className={styles.services}>
					{services.map(service => (
						<ServiceBlock key={service.id} service={service} />
					))}
				</div>			
			</Card>
		</>
	);
}

function ServiceBlock({service}) {
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
				<span>{service.title}</span>
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
				initial={
					open ? 
					{ 
						height: "auto"
					} 
					: 
					{ 
						height: "0px"
					}
				}
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
							{service.services.map(serv => (
								<tr key={`service-${serv.id}`}>
									<td>{serv.title}</td>
									<td></td>
									<td></td>
									<td></td>
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
							))}							
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	)
}