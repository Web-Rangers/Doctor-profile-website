import {
    Button,
    Card,
} from 'components';
import TableStaff from 'components/TableStaff';
import SideBarLayout from 'layouts/SideBarLayout';
import styles from 'styles/pages/staff.module.css';
import Breadcrumbs from 'nextjs-breadcrumbs';
import Link from 'next/link'


export default function Staff() {
    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Role',
            accessor: 'role',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Phone number',
            accessor: 'phone',
        },
        {
            Header: 'Registration date',
            accessor: 'registration_date',
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Kathryn Murphy',
            role: 'Admin',
            email: 'example@gmail.com',
            phone: '(599) 599-599',
            registration_date: '12.09.2022'
        },
        {
            id: 2,
            name: 'Kathryn Murphy',
            role: 'Admin',
            email: 'example@gmail.com',
            phone: '(599) 599-599',
            registration_date: '12.09.2022'
        },
        {
            id: 3,
            name: 'Kathryn Murphy',
            role: 'Admin',
            email: 'example@gmail.com',
            phone: '(599) 599-599',
            registration_date: '12.09.2022'
        },
        {
            id: 4,
            name: 'Kathryn Murphy',
            role: 'Admin',
            email: 'example@gmail.com',
            phone: '(599) 599-599',
            registration_date: '12.09.2022'
        },
        {
            id: 5,
            name: 'Kathryn Murphy',
            role: 'Admin',
            email: 'example@gmail.com',
            phone: '(599) 599-599',
            registration_date: '12.09.2022'
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h3>Staff</h3>
                </div>
                <div className={styles.headerRight}>
                    <Breadcrumbs
                        omitRootLabel={false}
                        rootLabel="Admin"
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>
            <Card className={styles.notFullHeight}>
                <div className={styles.cardContainer}>
                    <div className={styles.pageHeader} style={{marginBottom:30}}>
                        <div className={styles.headerLeft}>
                            <h3>Staff list</h3>
                        </div>
                        <Link href="staff/add">
                            <Button
                                className={styles.addUser}
                                variant="fill"
                                size="large"
                                label="Add user"
                            />
                        </Link>
                    </div>
                    <TableStaff 
                        columns={columns}
                        data={data}
                    />
                </div>
            </Card>
        </div>
    );
}

Staff.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
