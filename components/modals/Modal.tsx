import classNames from 'classnames';
import styles from 'styles/components/Modals/Modal.module.scss';

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
                className={classNames(styles.modalBack)}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onBackClick?.call(null);
                }}
            ></div>

            <div className={classNames(className, styles.modal)}>
                {children}
            </div>
        </>
    );
}
