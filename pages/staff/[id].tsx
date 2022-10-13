import {
    Button,
    Card,
} from 'components'
import SideBarLayout from 'layouts/SideBarLayout'
import styles from 'styles/pages/staff.module.css'
import Breadcrumbs from 'nextjs-breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'

export default function Employe({ employe }) {    

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h3>Staff</h3>
                </div>
                <Link href="staff/add">
                    <Button
                        className={styles.deactivateUser}
                        variant="fill"
                        size="large"
                        label="Deactivate account"
                    />
                </Link>
                <div className={styles.headerRight}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        transformLabel={(title) => (<span>{title == employe?.id ? 'Staff detailed page' : title}</span>)}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>
            <Card className={styles.notFullHeight}>
                <div className={styles.cardContainer}>
                    <div className={styles.cardHeader}>
                        <h3>
                            {employe.name}
                        </h3>
                        <Link href={`/staff/edit?id=${employe.id}`}>
                            <Image 
                                src="/images/icons/staff/pencil.svg"
                                width={20}
                                height={20}
                                alt=""
                                style={{cursor:'pointer'}}
                            />
                        </Link>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Phone number</th>
                                <th>Registration date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{employe.email}</td>
                                <td>{employe.role}</td>
                                <td>{employe.phone}</td>
                                <td>{employe.registration_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

export async function getStaticProps({params}) {
    return {
        props: {
            employe: {
                id: params?.id,
                name: 'Kathryn Murphy',
                role: 'Admin',
                email: 'example@gmail.com',
                phone: '(599) 599-599',
                registration_date: '12.09.2022'
            },
        },
    }
}

export async function getStaticPaths() {
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

    return { paths: data.map(item => ({ params: { id: item.id.toString() }})), fallback: false }
}

Employe.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};