import {Modal} from 'components';
import {ReactSVG} from 'react-svg';
import styles from 'styles/components/Modals/AlreadyExists.module.scss';
import Link from 'next/link';

export default function AlreadyExistClinic({
    data,
    onClose
}) {
    let numbers = data?.data.contactInfos.map((contact)=>{
        if(contact?.type.value == 'mobile') {
            return [contact.value]
        }
    })

    return <>
        <Modal onBackClick={onClose}>
            <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Clinic already exists</h2>
            </div>
            <Link href={data?.data.parentId != null ? 
                `/clinics/clinic_detailed/branch?id=${data?.data.id}&parentId=${data?.data.parentId}`
                : `/clinics/clinic_detailed?id=${data?.data.id}`
                }
            >
                <div className={styles.clinic}>
                    <div className={styles.clinicImg}>
                        <img src={data?.data.logoUrl} alt="" />
                    </div>
                    <div className={styles.clinicInfo}>
                        <h2>{data?.data.displayName}</h2>
                        <div className={styles.isActive}>{data?.data.isActive ? 
                            <span className={styles.active}>Open</span> : 
                            <span className={styles.close}>Close</span>}
                            <h3>
                                <ReactSVG
                                    src="/images/icons/clinics/location.svg"
                                    className={styles.iconContainer}
                                />
                                {data?.data.address.address}
                            </h3>
                        </div>
                        <div className={styles.phone}>
                            <ReactSVG
                                src="/images/icons/clinics/phone.svg"
                                className={styles.iconContainer}
                            />
                            {numbers}
                        </div>
                    </div>
                </div>
            </Link>
        </Modal>
    </>
}