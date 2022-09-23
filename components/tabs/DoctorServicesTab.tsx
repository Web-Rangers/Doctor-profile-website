import styles from '/styles/components/Tabs/DoctorServicesTab.module.scss';
import { Card, Button, Table } from 'components';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import AddDoctorServiceModal from 'components/modals/AddDoctorServiceModal';
import EditDoctorServiceModal from 'components/modals/EditDoctorServiceModal';

interface Service {
	name: string;
	price: string;
	doctorCommission: string;
	platformCommission: string;
	serviceDuration: string;
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
	const servicesColumns = [
		{
			key: 'name',
			title: 'Service name',
			dataIndex: 'name',
		},
		{
			key: 'price',
			title: 'Price',
			dataIndex: 'price',
			cellStyle: centerStyle,
			headerStyle: centerStyle,
		},
		{
			key: 'doctorCommission',
			title: "Doctor's commission",
			dataIndex: 'doctorCommission',
			cellStyle: centerStyle,
			headerStyle: centerStyle,
		},
		{
			key: 'platformCommission',
			title: 'Platform commission',
			dataIndex: 'platformCommission',
			cellStyle: centerStyle,
			headerStyle: centerStyle,
		},
		{
			key: 'service duration',
			title: 'Service duration',
			dataIndex: 'service duration',
			cellStyle: centerStyle,
			headerStyle: centerStyle,
		},

		{
			key: 'actions',
			title: '',
			dataIndex: 'actions',
			render: (record, key) => {
				return (
					<div className={styles.tableActons}>
						<ReactSVG
							src={'/images/icons/table/edit.svg'}
							className={styles.iconContainer}
							onClick={() => setOpenEditModal(true)}
						/>

						<ReactSVG
							src={'/images/icons/table/delete.svg'}
							className={styles.iconContainer}
						/>
					</div>
				);
			},
		},
	];

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
				<Table
					columns={servicesColumns}
					data={services}
					pagination={{
						pageSize: 8,
					}}
					rowClassName={styles.tableRow}
					cellClassName={styles.tableCell}
					headerClassName={styles.tableHeader}
					bodyClassName={styles.tableBody}
				/>
			</Card>
		</>
	);
}
