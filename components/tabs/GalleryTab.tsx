import styles from 'styles/components/Tabs/GalleryTab.module.scss';
import { Card, Button, GalleryCard } from 'components';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Image {
    url: string;
}

interface GalleryTabProps {
    className?: string;
    images?: Image[];
    setGalleryPic?: any;
    refetch?: any;
}

interface GalleryActionsProps {
    isEdit?: boolean;
    onEdit?: () => void;
    onAdd?: () => void;
    onDelete?: () => void;
    collector?: any;
}

const GalleryActions = ({
    onEdit,
    onAdd,
    isEdit,
    onDelete,
    collector = null
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

export default function GalleryTab({ setGalleryPic, images = [], refetch }: GalleryTabProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [collector, setCollector] = useState([]);
    
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
                    collector={collector}
                    onDelete={()=> {removeImage(collector, refetch); setIsEdit(false); setCollector([])}}
                />
            }
        >
            <div className={styles.galleryCardContainer}>
                {images.map((img, i) => (
                    <GalleryCard
                        id={'gallery' + i}
                        key={'gallery' + i}
                        src={img.url}
                        className={styles.galleryCard}
                        isEdit={isEdit}
                        setCollector={setCollector}
                        collector={collector}
                        imgInfo={img}
                    />
                ))}
            </div>
        </Card>
    );
}

export async function removeImage(collector, refetch) {
    await axios.delete('/asclepius/v1/api/gallery/clinic/urlListByIdList', {
        data: { 'ids': collector}
    })
                    .then((response)=>refetch())
                    .catch(error=>alert(error))

}