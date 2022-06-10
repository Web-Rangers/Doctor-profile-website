import styles from 'styles/components/modals/StuffModal.module.scss';
import { Button, Modal } from 'components';

interface StuffModalProps {
    onClose?: () => void;
    onAccept?: () => void;
    onCancel?: () => void;
}

export default function StuffModal({
    onClose,
    onAccept,
    onCancel,
}: StuffModalProps) {
    return (
        <Modal onBackClick={onClose}>
            <span className={styles.modalText}>
                Are you sure you want to remove this doctor?
            </span>
            <div className={styles.modalActions}>
                <Button
                    onClick={onCancel}
                    variant="outline"
                    label="Cancel"
                    size="large"
                />
                <Button
                    onClick={onAccept}
                    variant="fill"
                    label="Delete"
                    size="large"
                />
            </div>
        </Modal>
    );
}
