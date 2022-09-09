import { TabPanel, Tabs } from 'react-tabs';
import DoctorsTab from '../../components/tabs/DoctorsTab';
import tabStyles from 'styles/components/Tabs/tabs.module.scss';
import { getFreelancer, getDoctors } from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import { useQuery } from '@tanstack/react-query';

export default function DoctorsList() {
	var freelance = useQuery(['key', 'freelancerDoctors'], () => {
		return getFreelancer();
	});

	var clinicdoctors = useQuery(['key', 'clinicDoctors'], () => {
		return getDoctors();
	});

	const allData = freelance?.data?.content?.concat(
		clinicdoctors?.data?.content
	);

	console.log(' allData', allData);

	return (
		<Tabs>
			<TabPanel className={tabStyles.tabPanel}>
				<DoctorsTab doctors={allData} />
			</TabPanel>
		</Tabs>
	);
}

DoctorsList.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
