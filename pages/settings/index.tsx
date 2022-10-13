import {
    Card,
    EditSettingModal
} from 'components'
import SideBarLayout from 'layouts/SideBarLayout'
import styles from 'styles/pages/settings.module.css'
import Breadcrumbs from 'nextjs-breadcrumbs'
import Image from 'next/image'
import { useState } from 'react'

export default function Settings() {
    const [isModalClinicsOpen, setModalClinicsOpen] = useState(false)
    const [isModalFreelancersOpen, setModalFreelancersOpen] = useState(false)
    const [numberClinics, setNumberClinics] = useState(20)
    const [numberFreelancers, setNumberFreelancers] = useState(15)

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
            <div className={styles.cardWrap}>
                <Card className={styles.notFullHeight}>
                    {isModalClinicsOpen && 
                        <EditSettingModal
                            number={numberClinics}
                            onSave={(number) => {
                                setNumberClinics(number)
                                setModalClinicsOpen(false)
                            }}
                            onClose={() => setModalClinicsOpen(false)}
                        /> 
                    }
                    <div className={styles.cardHeader}>
                        <h3>
                            For clinics
                        </h3>
                        <Image 
                            src="/images/icons/staff/pencil.svg"
                            width={20}
                            height={20}
                            alt=""
                            style={{cursor:'pointer'}}
                            onClick={() => setModalClinicsOpen(true)}
                        />
                    </div>
                    <div className={styles.intervalBlock}>
                        <span>
                            Interval (in minutes)
                        </span>
                        <span className={styles.intervalNumber}>
                            {numberClinics}
                        </span>
                    </div>
                </Card>            
                <Card className={styles.notFullHeight}>
                    {isModalFreelancersOpen && 
                        <EditSettingModal 
                            number={numberFreelancers}
                            onSave={(number) => {
                                setNumberFreelancers(number)
                                setModalFreelancersOpen(false)
                            }}
                            onClose={() => setModalFreelancersOpen(false)}
                        /> 
                    }
                    <div className={styles.cardHeader}>
                        <h3>
                            For freelancers
                        </h3>
                        <Image 
                            src="/images/icons/staff/pencil.svg"
                            width={20}
                            height={20}
                            alt=""
                            style={{cursor:'pointer'}}
                            onClick={() => setModalFreelancersOpen(true)}
                        />
                    </div>
                    <div className={styles.intervalBlock}>
                        <span>
                            Interval (in minutes)
                        </span>
                        <span className={styles.intervalNumber}>
                            {numberFreelancers}
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
}

Settings.getLayout = (page) => {
    return <SideBarLayout>{page}</SideBarLayout>;
};
