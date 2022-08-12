import { useState } from 'react';
import SideBarLayout from 'layouts/SideBarLayout';
import { Card, CheckBox } from 'components';
import styles from 'styles/pages/adminsDetailed.module.scss';
import Breadcrumbs from 'nextjs-breadcrumbs';

export default function AdminsDetailed() {
    const [access, setAccess] = useState(false);
    const [checkboxes, setCheckBoxes] = useState([
        {
            id: 0,
            checked: false,
            title: 'Access1'
        },
        {
            id: 1,
            checked: false,
            title: 'Access2'
        },
        {
            id: 2,
            checked: false,
            title: 'Access3'
        },
        {
            id: 3,
            checked: false,
            title: 'Access4'
        }
    ]);

    const adminInfo = {
        name: 'Cameron Williamson',
        mail: 'Cameron_Williamson11@gmail.com',
        status: 'Custom admin',
        username: 'Cameron_Williamson'
    }

    const checkBoxDiv = (id) => {
        const checkedItem = checkboxes.map((item) => {
            if (item.id === id) {
                return { ...item, checked: !item.checked }
            }

            return item
        })

        return setCheckBoxes(checkedItem)
    }

    return <>
        <div className={styles.adminsContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h3>Admins</h3>
                </div>
                <div className={styles.headerRight}>
                    <Breadcrumbs
                        omitRootLabel={true}
                        listClassName={styles.breadcrumbs}
                        replaceCharacterList={[{ from: '_', to: ' ' }]}
                    />
                </div>
            </div>

            <Card className={styles.adminsCard}>
                <div className={styles.adminInfo}>
                    <div className={styles.block}>
                        <h2>{adminInfo.name}</h2>
                        <h4>{adminInfo.mail}</h4>
                    </div>
                    <div className={styles.block}>
                        <h3>Status</h3>
                        <h4>{adminInfo.status}</h4>
                    </div>
                    <div className={styles.block}>
                        <h3>Username</h3>
                        <h4>{adminInfo.username}</h4>
                    </div>
                </div>
            </Card>

            <Card className={styles.adminsCard}>
                <div className={styles.adminsHeader}>
                    <h2>Access setting</h2>
                </div>
                {
                    checkboxes.map((checkbox) => {
                        return (
                            <div key={checkbox.id} className={styles.checkboxDiv}>
                                <CheckBox onChange={() => checkBoxDiv(checkbox.id)} id={checkbox.id} label={checkbox.title} className={styles.checkbox} checked={checkbox.checked} />
                            </div>
                        )
                    })
                }
            </Card>
        </div>
    </>
}

AdminsDetailed.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};