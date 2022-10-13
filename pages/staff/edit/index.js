import { useState } from "react";
import SideBarLayout from "layouts/SideBarLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import {
	Card,
	Input,
	DatePicker,
	Select,
	Button,
	AddCardModal,
} from "components";
import Radio from "components/inputs/radio";
import styles from "styles/pages/editStaff.module.scss";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

export default function EditStaff() {
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<>
			{isModalOpen && (
				<AddCardModal
					onCancel={() => setModalOpen(false)}
					onClose={() => setModalOpen(false)}
					onSave={() => setModalOpen(false)}
				/>
			)}
			<div className={styles.addStuffContainer}>
				<div className={styles.pageHeader}>
					<div className={styles.headerTitle}>
						<h2>Staff</h2>
					</div>
					<div className={styles.headerBreadcrumbs}>
						<Breadcrumbs
							omitRootLabel={true}
							listClassName={styles.breadcrumbs}
							replaceCharacterList={[{ from: "_", to: " " }]}
						/>
					</div>
				</div>

				<Card>
					<div className={styles.cardCol2}>
						<Input
							label="Name"
							className={styles.stuffInput}
							placeholder="Enter name..."
						/>
						<Input
							label="Surname"
							className={styles.stuffInput}
							placeholder="Enter surmane..."
						/>
						<Input
							label="Phone Number"
							className={styles.stuffInput}
							placeholder="Enter phone number..."
						/>
						<Input
							label="E-mail"
							className={styles.stuffInput}
							placeholder="Enter email..."
						/>
						<Select
							label="Role"
							labelStyle="outside"
							className={styles.stuffInput}
							onChange={() => { }}
							options={[]}
						/>
					</div>
				</Card>
				<div className={styles.addStaffBtns}>
					<Button label="Cancel" size="large" variant="outline" />
					<Button label="Save" size="large" variant="fill" />
				</div>
			</div>
		</>
	);
}

EditStaff.getLayout = (page) => {
	return <SideBarLayout>{page}</SideBarLayout>;
};
