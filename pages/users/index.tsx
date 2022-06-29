import { ReactSVG } from 'react-svg';
import { Button, Card, Input, Table } from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import styles from 'styles/pages/users.module.scss';

export default function Users() {
    const columns = [
        {
            key: 'actions',
            title: '',
            dataIndex: 'actions',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'birth',
            title: 'Date of birth',
            dataIndex: 'birth',
        },
        {
            key: 'card',
            title: 'Type of card',
            dataIndex: 'card',
        },
        {
            key: 'city',
            title: 'City',
            dataIndex: 'city',
        },
        {
            key: 'company',
            title: 'Company',
            dataIndex: 'company',
        },
        {
            key: 'registration',
            title: 'Date of registration',
            dataIndex: 'registration',
        },
        {
            key: 'orders',
            title: 'Orders count',
            dataIndex: 'orders',
        },
        {
            key: 'lastDate',
            title: 'Date of last visit',
            dataIndex: 'lastDate',
        },
    ];

    const data = [
        {
            name: 'Kathryn Murphy',
            birth: '14.08.1999',
            card: 'Platinum',
            city: 'Akhaltsikhe',
            company: 'Disney Company',
            registration: '14.08.1999',
            orders: '143',
            lastDate: '14.08.1999',
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <h3>Users</h3>
                <Button
                    className={styles.addUser}
                    variant="fill"
                    size="large"
                    label="Add user"
                />
            </div>
            <Card>
                <div className={styles.cardContainer}>
                    <div className={styles.filterContainer}>
                        <div
                            className={styles.searchContainer}
                            onClick={() => {
                                document
                                    .getElementById('search-input')
                                    ?.focus();
                            }}
                        >
                            <ReactSVG
                                src={'/images/icons/inputs/search.svg'}
                                className={styles.searchImg}
                            />
                            <input
                                id="search-input"
                                className={styles.searchInput}
                                type="text"
                                placeholder="Search"
                            />
                        </div>
                        <Input
                            type="date"
                            placeholder="Date interval"
                            className={styles.dateInput}
                        />
                        <div className={styles.whiteSpace}></div>
                        <Button variant="outline" size="large" label="Filter" />
                    </div>
                    <Table
                        className={styles.table}
                        columns={columns}
                        data={data}
                        rowClassName={styles.tableRow}
                        cellClassName={styles.tableCell}
                        pagination={{ pageSize: 10, initialPage: 1 }}
                    />
                </div>
            </Card>
        </div>
    );
}

Users.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
