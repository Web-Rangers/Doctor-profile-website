import { useState, useEffect } from "react";
import { AboutDoctorTab, AddOrder, Button, Input, Card, DoctorEducationTab, getList, ServicesForRecord } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import { ReactSVG } from "react-svg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styles from "styles/pages/add_record.module.scss";
import tabStyles from "styles/components/Tabs/tabs.module.scss";
import { useRouter } from "next/router";
import {
	getFreelancerDoctor,
	getFreeLancerCertificate,
	getDoctor,
	getFreeLancerEducations,
} from "components/useDoctorsData";
import { useQuery } from "@tanstack/react-query";
import EditDoctorModal from "components/modals/EditDoctorModal";
import Image from 'next/image'

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

export default function AddRecord() {
	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className={styles.pageHeader}>
				<div className={styles.pageHeaderLeft}>
					<h3>Add record</h3>
				</div>
				<Breadcrumbs
                    omitRootLabel={false}
                    rootLabel="Admin"
                    listClassName={styles.breadcrumbs}
                    replaceCharacterList={[{ from: '_', to: ' ' }, { from: 'add record', to: 'Add record' }]}
					omitIndexList={[1]}
                />
			</div>
			<div className={styles.pageBody}>
				{router.query?.id && router.query?.service ? 
					<Card className={styles.clientSearch}>
						<span className={styles.cardTitle}>
							Make an entry
						</span>
						
					</Card>
					:
					<>
						<Card className={styles.clientSearch}>
							<span className={styles.cardTitle}>
								Client
							</span>
							<div className={styles.field}>
								<Input
									label="Enter customer id to search"							
									placeholder="Type here"
									className={styles.search}
								/>
								<Button
									label="Find a client"
									size="large"
									variant="fill"
									onClick={()=>{}}
								/>
							</div>
						</Card>
					
						<Card className={styles.clientSelected}>
							<Image 
								src={`/images/users/user.png`}
								width={75}
								height={75}
								style={{borderRadius:100}}
							/>
							<span>Name Surname</span>
						</Card>				
						<Card className={styles.availableServices}>
							<span className={styles.servicesTitle}>
								Services available
							</span>
							<ServicesForRecord />
						</Card>
					</>
				}
			</div>
		</div>
	);
}

AddRecord.getLayout = (page) => {
	return <SideBarLayout>{page}</SideBarLayout>;
};
