import styles from '/styles/components/Modals/ClinicModal.module.scss';
import { Input, Button, Modal } from 'components';
import { useState } from 'react';
import classNames from 'classnames';

interface ClinicData {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    time?: string;
    registrationDate?: string;
    about?: string;
}

interface ClinicModalProps {
    onClose?: () => void;
    onSave?: (newData: ClinicData) => void;
    onCancel?: () => void;
}

export default function AddClinicModal({
    onClose,
    onSave,
    onCancel,
}: ClinicModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');
    const [about, setAbout] = useState('');

    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <span className={styles.modalTitle}>Add clinic</span>
            <div className={styles.modalContent}>
                <div className={classNames(styles.modalContentRow, styles.center)}>
                    <img className={styles.image} src="/images/icons/clinics/placeholder.png" alt="" />
                    <Button className={styles.imageChange} label="change" size="large" />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(value: string) => setName(value)}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Phone number"
                        value={phone}
                        onChange={(value: string) => setPhone(value)}
                    />
                    <Input
                        type="time"
                        label="Working hours"
                        value={time}
                        onChange={(value: string) => setTime(value)}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Address"
                        value={address}
                        onChange={(value: string) => setAddress(value)}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="About clinic"
                        multiline
                        value={about}
                        onChange={(value: string) => setAbout(value)}
                    />
                </div>
            </div>
            <div className={styles.whiteSpace}></div>
            <div className={styles.modalActions}>
                <Button
                    label="Calcel"
                    variant="outline"
                    onClick={onCancel}
                    size="large"
                />
                <Button
                    label="Add"
                    variant="fill"
                    onClick={() =>
                        onSave?.call(null, {
                            phone,
                            address,
                            time,
                            about,
                        })
                    }
                    size="large"
                />
            </div>
        </Modal>
    );
}
