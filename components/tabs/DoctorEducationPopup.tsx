import styles from 'styles/components/Tabs/DoctorEducationTab.module.scss';
import classNames from 'classnames';
import EditDoctorEducation from 'components/modals/EditDoctorEducation';
import { ReactSVG } from 'react-svg';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorEducationPopup = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const removeEducation = async () => {
		return axios
			.delete(
				`https://asclepius.pirveli.ge/asclepius/v1/api/doctors/${props.id}/educations/${props.educationId}`
			)
			.then((response) => {});
	};

	useEffect(() => {}, [props.data]);

	return (
		<div className={styles.column}>
			<div key={props.index}>
				<div className={styles.more}>
					<ReactSVG
						src={'/images/icons/cards/more.svg'}
						className={styles.moreIcon}
						onClick={() => {
							setIsOpenEdit(!isOpenEdit);
							console.log('click', isOpenEdit);
						}}
					/>
				</div>
				<div
					className={classNames(styles.morButton, {
						[styles.activeMoreBlock]: isOpenEdit,
					})}
				>
					<div className={styles.btns}>
						<div
							className={styles.moreBtn}
							onClick={() => (setOpenModal(true), setIsOpenEdit(isOpenEdit))}
						>
							<ReactSVG
								src={'/images/icons/table/edit.svg'}
								className={styles.iconContainer}
							/>

							{openModal && (
								<EditDoctorEducation
									data={props.data}
									onClose={() => setOpenModal(false)}
									onSave={(newData) => {
										setOpenModal(false);
									}}
								/>
							)}
							<span
								onClick={() => (setOpenModal(true), setIsOpenEdit(!isOpen))}
							>
								Edit
							</span>
						</div>
						<div
							className={styles.moreBtn}
							onClick={() => removeEducation()}
						>
							<ReactSVG
								src={'/images/icons/table/delete.svg'}
								className={styles.iconContainer}
							/>
							<span>Delete</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorEducationPopup;
