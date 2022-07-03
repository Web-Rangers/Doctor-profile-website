import styles from 'styles/components/modals/AddOrder.module.scss';
import { Button, DatePicker, Input, Modal, Select } from 'components';
import { useState } from 'react';

interface OrderModalProps {
    onClose?: () => void;
    onAccept?: () => void;
    onCancel?: () => void;
}

export default function AddOrder({
    onClose,
    onAccept,
    onCancel,
}: OrderModalProps) {
    const [step, setStep] = useState<'first' | 'second'>('first');
    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <span className={styles.modalText}>Add order</span>
            {step === 'first' && (
                <>
                    <div className={styles.inputRow}>
                        <Input label="Personal number" />
                        <Input label="Id client" />
                    </div>
                    <div className={styles.inputRow}>
                        <Input label="Name" />
                        <Input label="Surname" />
                    </div>
                    <div className={styles.inputRow}>
                        <Input label="Phone number" />
                        <Input label="Email" />
                    </div>
                </>
            )}
            {step === 'second' && (
                <>
                    <div className={styles.inputRow}>
                        <Select
                            label="Branch"
                            labelStyle="outside"
                            onChange={() => {}}
                            options={[]}
                        />
                        <Select
                            label="Clinic"
                            labelStyle="outside"
                            onChange={() => {}}
                            options={[]}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <Select
                            label="Doctor"
                            labelStyle="outside"
                            onChange={() => {}}
                            options={[]}
                        />
                        <DatePicker label="Calendar" mode="single" />
                    </div>
                </>
            )}
            <div className={styles.modalActions}>
                <Button
                    onClick={
                        step == 'first'
                            ? () => setStep('second')
                            : () => {
                                  onAccept?.call(null);
                              }
                    }
                    variant="outline"
                    label={step == 'first' ? 'Next' : 'Save'}
                    size="large"
                />
            </div>
        </Modal>
    );
}
