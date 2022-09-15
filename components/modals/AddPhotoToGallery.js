import axios from 'axios';
import { Modal, Button, debounce, niceBytes } from 'components';
import {useState} from 'react';
import { ReactSVG } from 'react-svg';
import styles from 'styles/components/Modals/AddPhotoToGallery.module.scss';

const MAX_COUNT = 5;

export default function AddPhotoToGallery({clinicId, onClose, refetch}) {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    function removeImage(name) {
        const removeImg = uploadedFiles.filter((item)=> item.name != name);
        setUploadedFiles(removeImg)
    }

    const processChange = debounce(() => sendRequest(uploadedFiles));

    async function sendRequest(uploadedFiles) {
        for(let i = 0; i < uploadedFiles.length; i++){
            let formData = new FormData()
            formData.append('pictureFile', uploadedFiles[i])
    
            axios.post(`https://asclepius.pirveli.ge/asclepius/v1/api/gallery/clinic?objectId=${clinicId}`, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
            }).then((response) => { 
                console.log(response)
                refetch()
                onClose()
            }).catch(error=> alert(error.response.data.message))
        }

        return true
    }

    return <>
        <Modal onBackClick={onClose}>
            <div>
                <label className={styles.customLabel} htmlFor='upfile'>Upload Photos</label>
                <input type="file" id="upfile" multiple="multiple" onChange={handleFileEvent} className={styles.hidden}/>
            </div>

            <div className={styles.uploadedFileList}>
				{uploadedFiles.map(file => (
                    <div className={styles.uploadPicDet}>
                        <div className={styles.fileInfo}>
                            <span>{file.name}</span>
                            <span>{niceBytes(file.size)}</span>
                        </div>
                        <button 
                            className={styles.removeFileBtn}
                            onClick={()=> removeImage(file.name)}>
                            <ReactSVG
                                src="/images/icons/clinics/removeImage.svg"
                            />
                        </button>
                    </div>
                ))}
			</div>

            <Button
                label='Add Photos'
                variant='fill'
                size='large' 
                onClick={()=> processChange(uploadedFiles)} 
            />
        </Modal>
    </>
}