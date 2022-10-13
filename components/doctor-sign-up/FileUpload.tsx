import styles from 'styles/pages/signup.module.scss'
import { Button } from 'components'
import { useRef, useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'

interface ImageType {
    name: string, 
    size: number, 
    url: string
}

interface FileUploadProps {
    currentImages?: File[],
    name?: string,
    onChange?: (imgs: ImageType[] | File[]) => void,
    returnType?: "files" | "objects",
}

export default function FileUpload({
    currentImages = null, 
    name = 'files',
    returnType = "files",
    onChange
}: FileUploadProps) {

    const inputFileRef = useRef<HTMLInputElement>()
    const [images, setImages] = useState([])
    const fileList = useRef<File[]>()

    useEffect(()=>{
        if (currentImages) {
            let ImgArray = []
            fileList.current = currentImages
            fileList.current.forEach(img => {
                if (img)
                    if (img.type=="image/jpeg" || img.type=="image/png") {
                        ImgArray.push({name: img.name, size: img.size, url: window.URL.createObjectURL(img)}) 
                    }
            })
            setImages(ImgArray)
            if (onChange) {
                if (returnType=='objects')
                    onChange(ImgArray)
                else
                    onChange(fileList.current)
            }
        }
        else {
            setImages([])
            onChange([])
        }
    },[currentImages])

    const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        let ImgArray = []
        fileList.current = Array.from(e.target.files)
        fileList.current.forEach(img => {
            if (img)
                if (img.type=="image/jpeg" || img.type=="image/png") {
                    ImgArray.push({name: img.name, size: img.size, url: window.URL.createObjectURL(img)}) 
                }
        })
        setImages(ImgArray)
        if (onChange) {
            if (returnType=='objects')
                onChange(ImgArray)
            else
                onChange(fileList.current)
        }
        e.currentTarget.value = ""
    };

    const fileCapture = () => {
        inputFileRef?.current?.click()
    }

    return (
        <>
            <div className={styles.fileInput}>
                <input
                    type="file"
                    multiple
                    ref={inputFileRef}
                    onChangeCapture={onFileChangeCapture}
                    accept="image/png,image/jpeg"
                    name={name}
                    title={`${images?.length || 0} items added`}
                />
                <ReactSVG
                    src="/images/signUp/cloud-upload.svg"
                    className={styles.iconContainer}
                />
                <span>Drag and drop your files here</span>
                <div 
                    className={styles.uploadBtn}
                    onDrop={(e) => {
                        e.preventDefault()
                    }}
                    onDragOver={(e) => {
                        e.preventDefault()
                    }}
                >
                    <Button
                        label="Upload file"
                        variant="outline"
                        size="large"
                        onClick={fileCapture}
                    />                    
                </div>
            </div>
            <div className={styles.filesContainer}>
                {images?.map((img, ind) => (
                    <div key={`${img.url}-${ind}`} className={styles.file}>
                        <img src={img.url} alt='' className={styles.preview} />
                        <div className={styles.info}>
                            <div className={styles.name}>
                                {img.name}
                            </div>
                            <div className={styles.size}>{(img.size / 1024).toFixed(2)} KB</div>
                        </div>
                        <div className={styles.whiteSpace} />
                        <ReactSVG
                            src="/images/signUp/x.svg"
                            className={styles.iconContainer}
                            onClick={() => {
                                let newImgs = [...fileList.current]
                                newImgs.splice(ind,1)
                                fileList.current = newImgs
                                setImages(
                                    newImgs.map(img => ({
                                        name: img.name, 
                                        size: img.size, 
                                        url: window.URL.createObjectURL(img)
                                    }))
                                )
                                if (onChange) {
                                    if (returnType=='objects')
                                        onChange(
                                            newImgs.map(img => ({
                                                name: img.name, 
                                                size: img.size, 
                                                url: window.URL.createObjectURL(img)
                                            }))
                                        )
                                    else
                                        onChange(newImgs)
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}