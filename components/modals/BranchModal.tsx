import styles from 'styles/components/Modals/BranchModal.module.scss';
import { useState } from 'react';
import { Button, Input, Modal, Select } from 'components';

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

const BranchModal = ({
    onClose,
    onSave,
    onCancel,
    data = {},
    mode,
}: BranchModalProps) => {
    const [phone, setPhone] = useState(mode === 'edit' ? data.phone : '');
    const [address, setAddress] = useState(mode === 'edit' ? data.address : '');
    const [time, setTime] = useState(mode === 'edit' ? data.time : '');
    const [about, setAbout] = useState(mode === 'edit' ? data.about : '');
    const [status, setStatus] = useState('open');

    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <span className={styles.modalTitle}>Edit this branch</span>
            <div className={styles.modalContent}>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Phone number"
                        value={phone}
                        onChange={(value) => setPhone(value.toString())}
                    />
                    <Select
                        label="Status"
                        options={[
                            { value: 'open', label: 'Open' },
                            { value: 'close', label: 'Close' },
                        ]}
                        onChange={(value) => {
                            setStatus(value);
                        }}
                        value={status}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Address"
                        value={address}
                        onChange={(value) => setAddress(value.toString())}
                    />
                    <Input
                        type="time"
                        label="Working hours"
                        value={time}
                        onChange={(value) => setTime(value.toString())}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="About clinic"
                        multiline
                        value={about}
                        onChange={(value) => setAbout(value.toString())}
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
};

export default BranchModal;
