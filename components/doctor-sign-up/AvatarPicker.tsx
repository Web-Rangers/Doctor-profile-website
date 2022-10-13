import styles from 'styles/pages/signup.module.scss';
import { Button } from 'components';
import { useRef, useState, useEffect } from 'react'

interface AvatarPickerProps {
    currentImage?: string,
    name?: string
}

export default function AvatarPicker({
    currentImage = null, 
    name = 'pictureFile'
}: AvatarPickerProps) {

    const inputFileRef = useRef<HTMLInputElement>()
    const [image, setImage] = useState(currentImage)

    useEffect(()=>{
        setImage(currentImage)
    },[currentImage])

    const onFileChangeCapture = (e) => {
        if (e.target.files[0])
            if (e.target.files[0].type=="image/jpeg" || e.target.files[0].type=="image/png") {
                setImage(window.URL.createObjectURL(e.target.files[0])) 
            } else {
                e.target.files = null
                setImage(null)
            }    
    };

    const fileCapture = () => {
        inputFileRef?.current?.click()
    }

    return (
        <div className={styles.photoChange}>
            <input 
                id={"avatarFile"} 
                type="file"
                style={{display:"none"}} 
                ref={inputFileRef}
                onChangeCapture={onFileChangeCapture}
                accept="image/png,image/jpeg"
                name={name}
            />
            <img
                src={image ?? "/images/doctors/doctor.png"}
                alt="doctor"
                className={styles.doctorImage}
            />
            <Button
                label="Change"
                size="large"
                variant="fill"                
                onClick={fileCapture}
            />
        </div>
    )
}