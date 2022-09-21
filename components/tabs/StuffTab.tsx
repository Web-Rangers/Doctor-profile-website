import styles from 'styles/components/Tabs/StuffTab.module.scss';
import { Card, Button, CheckBox, StuffModal, StuffCard } from 'components';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Fuse from "fuse.js";
import Link from 'next/link';

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
    id?:any;
}

interface StuffTabProps {
    className?: string;
    stuff?: Stuff[];
    id?: any;
    branchId?: any;
}

const StuffActions = ({searchValue, setSearchValue, id, branchId}) => {
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
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                />
            </div>
            {
                branchId ? <>
                    <Link href={`/doctors/add?id=${id}&branchId=${branchId}`}>
                        <Button variant="fill" onClick={()=> console.log(id)} label="Add doctor" size="large" />
                    </Link>
                </> : <>
                    <Link href={`/doctors/add?id=${id}`}>
                        <Button variant="fill" onClick={()=> console.log(id)} label="Add doctor" size="large" />
                    </Link>
                </>
            }
        </div>
    );
};

export default function StuffTab({
    id,
    branchId,
    className,
    stuff = [],
    ...props
}: StuffTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const fuse = new Fuse(stuff, {
        includeScore: true,
        threshold: 0.4,
        keys: ["name"],
      });

    const result = fuse.search(searchValue);
    const searchResult = searchValue ? result.map((result) => result.item) : stuff;

    return <>
        <Card cardTitle="Stuff" cardActions={<StuffActions id={id} branchId={branchId} searchValue={searchValue} setSearchValue={setSearchValue} />}>
            <div className={styles.stuffCardContainer}>
                {isModalOpen && (
                    <StuffModal
                        onClose={() => setIsModalOpen(false)}
                        onAccept={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                    />
                )}
                {searchResult.map((stuffData, i) => (
                    <StuffCard
                        key={'stuff' + i}
                        data={stuffData}
                        onDelete={() => {
                            setIsModalOpen(true);
                        }}
                        id={id}
                        branchId={branchId}
                    />
                ))}
            </div>
        </Card>
    </>
}
