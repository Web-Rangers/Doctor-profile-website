import Input from './Input';
import Modal from './Modal';
import styles from '../styles/components/BranchModal.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import Button from './Button';

interface BranchData {
    phone?: string;
    address?: string;
    time?: string;
    about?: string;
}

interface BranchModalProps {
    onClose?: () => void;
    onSave?: (newData: BranchData) => void;
    onCancel?: () => void;
    data?: BranchData;
    mode: 'add' | 'edit';
}

export default function BranchModal({
    onClose,
    onSave,
    onCancel,
    data = {},
    mode,
}: BranchModalProps) {
    const [phone, setPhone] = useState(mode === 'edit' ? data.phone : '');
    const [address, setAddress] = useState(mode === 'edit' ? data.address : '');
    const [time, setTime] = useState(mode === 'edit' ? data.time : '');
    const [about, setAbout] = useState(mode === 'edit' ? data.about : '');

    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <span className={styles.modalTitle}>Edit this branch</span>
            <div className={styles.modalContent}>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Phone number"
                        value={phone}
                        onChange={(value) => setPhone(value)}
                    />
                    <Input type="select" label="Status" value="Open" />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Address"
                        value={address}
                        onChange={(value) => setAddress(value)}
                    />
                    <Input
                        type="time"
                        label="Working hours"
                        value={time}
                        onChange={(value) => setTime(value)}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="About clinic"
                        multiline
                        value={about}
                        onChange={(value) => setAbout(value)}
                    />
                </div>
            </div>
            <div className={styles.whiteSpace}></div>
            <div className={styles.modalActions}>
                <Button
                    label="Cancel"
                    variant="outline"
                    onClick={onCancel}
                    size="large"
                />
                <Button
                    label="Save"
                    variant="fill"
                    onClick={() =>
                        onSave?.call(null, { phone, address, time, about })
                    }
                    size="large"
                />
            </div>
        </Modal>
    );
}
