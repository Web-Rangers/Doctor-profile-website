import classNames from 'classnames';
import styles from '../styles/components/Modal.module.scss';

interface ModalPorps {
    children?: React.ReactNode;
    className?: string;
    onBackClick?: () => void;
}

export default function Modal({
    children,
    className,
    onBackClick,
    ...props
}: ModalPorps) {
    return (
        <>
            <div
                className={classNames([styles.modalBack, className])}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onBackClick?.call(null);
                }}
            ></div>

            <div className={styles.modal}>{children}</div>
        </>
    );
}
