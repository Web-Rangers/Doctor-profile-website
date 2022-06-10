import classNames from 'classnames';
import styles from 'styles/components/cards/Card.module.scss';

interface CardProps {
    children?: React.ReactNode;
    className?: string;
    cardTitle?: string;
    cardActions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    ...props
}: CardProps) => {
    return (
        <div className={classNames([styles.cardBody, className])}>
            <div className={styles.cardHeader}>
                {props.cardTitle && (
                    <div className={styles.cardTitle}>{props.cardTitle}</div>
                )}
                {props.cardActions && (
                    <div className={styles.cardActions}>
                        {props.cardActions}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Card;
