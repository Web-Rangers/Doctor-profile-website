import styles from 'styles/components/Modals/EditServiceModal.module.scss';
import { Input, Button, Modal, Select } from 'components';
import { useState } from 'react';

import s from 'styles/components/Modals/AddDoctorService.module.scss';

export default function EditDoctorServiceModal({
	onClose,
	onSave,
	onCancel,
	data,
}) {
	const [type, setType] = useState('');

	return (
		<Modal
			onBackClick={onClose}
			className={styles.modal}
		>
			<div className={styles.modalContent}>
				<div className={styles.modalTitle}>
					<h2>Edit service</h2>
				</div>
				<div className={styles.modalInputs}>
					<div className={s.serviceName}>
						<Select
							label='Service Name'
							labelStyle='outside'
							className={s.halfInput}
							options={[
								{
									label: 'Status 1',
									value: '1',
								},
								{ label: 'Status 2', value: '2' },
							]}
							onChange={(value) => {
								setType(value);
							}}
							value={type}
						/>
					</div>
					<div className={s.inputFields}>
						<Input
							className={styles.title}
							label='Price'
							placeholder='Enter price...'
						/>
						<Input
							className={styles.title}
							label='Doctor’s commision'
						/>
					</div>
					<div className={s.inputFields}>
						<Input
							className={styles.title}
							label='Platform commision'
						/>

						<Input
							className={styles.title}
							label='Service duration'
						/>
					</div>
				</div>
				<div className={styles.editBtns}>
					<Button
						label='Cancel'
						size='large'
						variant='outline'
						className={styles.modalInput}
						onClick={() => onCancel()}
					/>
					<Button
						label='Save'
						size='large'
						variant='fill'
						className={styles.modalInput}
						onClick={() => onSave()}
					/>
				</div>
			</div>
		</Modal>
	);
}
