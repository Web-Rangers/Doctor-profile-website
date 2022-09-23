import styles from 'styles/components/Tabs/OffersTab.module.scss';
import { Card, Button, OfferCard } from 'components';

interface Offer {
    title: string;
    description: string;
    type: string;
    period: string;
}

interface OffersTabProps {
    className?: string;
    offers?: Offer[];
}

interface OfferActionsProps {
    onAdd?: () => void;
}

const OfferActions = ({ onAdd }: OfferActionsProps) => {
    return (
        <div className={styles.actions}>
            <Button
                onClick={onAdd}
                variant="fill"
                label="Add offer"
                size="large"
            />
        </div>
    );
};

export default function OffersTab({
    className,
    offers = [],
    ...props
}: OffersTabProps) {
    return (
        <Card cardTitle="Offers" cardActions={<OfferActions />}>
            <div className={styles.cardContainer}>
                {offers.map((offer, i) => (
                    <OfferCard
                        key={'offer' + i}
                        title={offer.period}
                        className={styles.offerCard}
                    >
                        <div className={styles.title}>{offer.title}</div>
                        <div className={styles.description}>
                            {offer.description}
                        </div>
                        <div className={styles.type}>{offer.type}</div>
                    </OfferCard>
                ))}
            </div>
        </Card>
    );
}
