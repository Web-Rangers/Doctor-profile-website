import classNames from 'classnames';
import styles from 'styles/components/Cards/GalleryCard.module.scss';
import { useState } from 'react';
import { CheckBox } from 'components';
import Image from 'next/image';

interface GalleryCardProps {
    children?: React.ReactNode;
    className?: string;
    src?: string;
    isEdit?: boolean;
    id?: string;
    setCollector?: any;
    imgInfo?: any;
    collector?: any;
}

export default function GalleryCard({
    children,
    className,
    src,
    isEdit,
    id,
    setCollector,
    collector,
    imgInfo,
    ...props
}: GalleryCardProps) {
    const [isSelect, setIsSelect] = useState(false);
    return (
        <div className={classNames([styles.cardBody, className])}>
            <img src={src} alt="gallery" className={styles.image} />
            {isEdit && (
                <div className={styles.cardActions}>
                    <CheckBox
                        id={id}
                        checked={isSelect}
                        className={styles.checkbox}
                        onChange={(newValue) => {
                            if(!isSelect){
                                setCollector((prev)=> ([...prev, imgInfo.galleryId]))
                            }else {
                                const newArray = collector.filter((e)=> e != imgInfo)
                                setCollector(newArray)
                            }
                            setIsSelect(newValue)
                        }}
                    />
                </div>
            )}
        </div>
    );
}
