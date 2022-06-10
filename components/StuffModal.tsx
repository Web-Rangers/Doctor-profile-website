import Modal from './Modal';
import styles from '../styles/components/StuffModal.module.scss';
import classNames from 'classnames';
import Button from './Button';

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
