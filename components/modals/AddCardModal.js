import styles from '/styles/components/modals/AddCardModal.module.scss';
import { Input, Button, Modal, Select } from 'components';

export default function AddCardModal({
    onClose,
    onCancel
}) {
    return <>
        <Modal onBackClick={onClose} className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalTitle}>
                    <h2>New card</h2>
                </div>
                <div className={styles.modalInputs}>
                    <Input 
                        label="Name card type" 
                        className={styles.modalInput} 
                        placeholder='Enter name...' 
                    />
                    <Input 
                        label="Price" 
                        className={styles.modalInput} 
                        placeholder='Enter surname...' 
                    />
                    <Select 
                        label="Card type"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <Select 
                        label="Promotion"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <div className={styles.buffer}>
                        <h2>Buffer</h2>
                        <div>
                            <Select 
                                label="Days"
                                labelStyle="inside"
                                className={styles.modalInput}
                                options={[
                                    {
                                        label: "Status 1",
                                        value: "1",
                                    },
                                    { label: "Status 2", value: "2" },
                                    ]}
                            />
                            <Select 
                                label="Hours"
                                labelStyle="inside"
                                className={styles.modalInput}
                                options={[
                                    {
                                        label: "Status 1",
                                        value: "1",
                                    },
                                    { label: "Status 2", value: "2" },
                                    ]}
                            />
                            <Select 
                                label="Minutes"
                                labelStyle="inside"
                                className={styles.modalInput}
                                options={[
                                    {
                                        label: "Status 1",
                                        value: "1",
                                    },
                                    { label: "Status 2", value: "2" },
                                    ]}
                            />
                        </div>
                    </div>
                    <Select 
                        label="Expiration date"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <Select 
                        label="Clinic"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <Select 
                        label="Branch"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                </div>
                <div className={styles.modalBtns}>
                    <Button
                        label="Cancel"
                        size="large"
                        variant='outline'
                    />
                    <Button
                        label="Save"
                        size="large"
                        variant='fill'
                    />
                </div>
            </div>
        </Modal>
    </>
}