import styles from 'styles/components/Tabs/StuffTab.module.scss';
import { Card, Button, CheckBox, StuffModal, StuffCard } from 'components';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

interface Stuff {
    icon: string;
    address: string;
    amountOfOrders: number;
    city: string;
    clinic: string;
    description: string;
    gender: 'Male' | 'Female';
    name: string;
    rating: number;
    registrationDate: string;
}

interface StuffTabProps {
    className?: string;
    stuff?: Stuff[];
}

const StuffActions = () => {
    return (
        <div className={styles.actions}>
            <div
                className={styles.searchContainer}
                onClick={() => {
                    document.getElementById('search-input')?.focus();
                }}
            >
                <ReactSVG
                    src={'/images/icons/inputs/search.svg'}
                    className={classNames(
                        styles.searchImg,
                        styles.iconContainer
                    )}
                />
                <input
                    id="search-input"
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search"
                />
            </div>
            <Button variant="fill" label="Add doctor" size="large" />
        </div>
    );
};

export default function StuffTab({
    className,
    stuff = [],
    ...props
}: StuffTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Card cardTitle="Stuff" cardActions={<StuffActions />}>
            <div className={styles.stuffCardContainer}>
                {isModalOpen && (
                    <StuffModal
                        onClose={() => setIsModalOpen(false)}
                        onAccept={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                    />
                )}
                {stuff.map((stuffData, i) => (
                    <StuffCard
                        key={'stuff' + i}
                        data={stuffData}
                        onDelete={() => {
                            setIsModalOpen(true);
                        }}
                    />
                ))}
            </div>
        </Card>
    );
}
