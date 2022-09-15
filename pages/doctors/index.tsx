import { TabPanel, Tabs } from 'react-tabs';
import DoctorsTab from '../../components/tabs/DoctorsTab';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import { getFreelancer, getDoctors } from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function DoctorsList() {
	const [allData, setAllData] = useState([]);
	var freelance = useQuery(['key', 'freelancerDoctors'], () => {
		return getFreelancer();
	});

	var clinicdoctors = useQuery(['key', 'clinicDoctors'], () => {
		return getDoctors();
	});

	useEffect(() => {
		const allData = freelance?.data?.content?.concat(
			clinicdoctors?.data?.content
		);
		setAllData(allData);
	}, [freelance?.data, clinicdoctors?.data]);

	console.log('freelance', clinicdoctors);

	return (
		<Tabs>
			<TabPanel className={tabStyles.tabPanel}>
				<DoctorsTab doctors={allData?.length != 0 ? allData : []} />
			</TabPanel>
		</Tabs>
	);
}

DoctorsList.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
