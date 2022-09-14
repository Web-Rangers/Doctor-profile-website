import styles from 'styles/components/Tabs/GalleryTab.module.scss';
import { Card, Button, GalleryCard } from 'components';
import { useState } from 'react';

interface Image {
    src: string;
}

interface GalleryTabProps {
    className?: string;
    images?: Image[];
    setGalleryPic?: any;
}

interface GalleryActionsProps {
    isEdit?: boolean;
    onEdit?: () => void;
    onAdd?: () => void;
    onDelete?: () => void;
}

const GalleryActions = ({
    onEdit,
    onAdd,
    isEdit,
    onDelete,
}: GalleryActionsProps) => {
    return (
        <div className={styles.actions}>
            <Button
                variant="outline"
                label={isEdit ? 'Cancel' : 'Edit'}
                onClick={onEdit}
                size="large"
            />
            <Button
                variant="fill"
                label={isEdit ? 'Delete' : 'Add photo'}
                onClick={isEdit ? onDelete : onAdd}
                size="large"
            />
        </div>
    );
};

export default function GalleryTab({ setGalleryPic, images = [] }: GalleryTabProps) {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <Card
            cardTitle="Photo gallery"
            cardActions={
                <GalleryActions
                    onEdit={() => {
                        setIsEdit(!isEdit);
                    }}
                    isEdit={isEdit}
                    onAdd={()=> setGalleryPic(true)}
                />
            }
        >
            <div className={styles.galleryCardContainer}>
                {images.map(({ src }, i) => (
                    <GalleryCard
                        id={'gallery' + i}
                        key={'gallery' + i}
                        src={src}
                        className={styles.galleryCard}
                        isEdit={isEdit}
                    />
                ))}
            </div>
        </Card>
    );
}
