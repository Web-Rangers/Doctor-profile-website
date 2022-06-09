import classNames from 'classnames';
import styles from '../styles/components/GalleryCard.module.scss';
import { useState } from 'react';
import CheckBox from './CheckBox';

interface GalleryCardProps {
    children?: React.ReactNode;
    className?: string;
    src?: string;
    isEdit?: boolean;
    id?: string;
}

export default function GalleryCard({
    children,
    className,
    src,
    isEdit,
    id,
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
                        onChange={(newValue) => setIsSelect(newValue)}
                    />
                </div>
            )}
        </div>
    );
}
