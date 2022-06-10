import classNames from "classnames";
import { ReactSVG } from "react-svg";
import styles from "styles/components/cards/OfferCard.module.scss";

interface OfferCardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    actions?: React.ReactNode;
}

export default function Offercard({
    children,
    className,
    ...props
}: OfferCardProps) {
    return (
        <div className={classNames([styles.cardBody, className])}>
            <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{props.title}</span>
                <ReactSVG src="/images/icons/cards/more.svg" className={styles.iconContainer}/>
            </div>
            {children}
        </div>
    );
}
