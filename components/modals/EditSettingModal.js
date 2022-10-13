import styles from 'styles/components/Modals/EditSettingModal.module.scss';
import { Input, Button, Modal, Select, DatePicker } from 'components';
import { useState } from 'react';

export default function EditSettingModal({
    number,
    onSave,
    onClose
}) {
    const [type, setType] = useState('');
    const [value, setValue] = useState(number)

    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalTitle}>
                    <h2>Change interval</h2>
                </div>
                <div className={styles.modalInputs}>
                    <Input
                        className={styles.halfInput}
                        label='Interval (in minutes)'
                        placeholder='Enter interval...'
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </div>
                <div className={styles.editBtns}>
                    <Button
                        label="Cancel"
                        size="large"
                        variant="outline"
                        className={styles.modalInput}                      
                        onClick={() => onClose()}
                    />
                    <Button
                        label="Save"
                        size="large"
                        variant="fill"
                        className={styles.modalInput}                        
                        onClick={() => onSave(value)}
                    />
                </div>
            </div>
        </Modal>
    );
}
