import axios from 'axios';
import { Modal, Button } from 'components';
import {useState} from 'react';
import styles from 'styles/components/Modals/AddPhotoToGallery.module.scss';

const MAX_COUNT = 5;

export default function AddPhotoToGallery({clinicId}) {
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
            })
        }

        return true
    } 

    return <>
        <Modal>
            <div>
                <label className={styles.customLabel} htmlFor='upfile'>Upload Photos</label>
                <input type="file" id="upfile" multiple="multiple" onChange={handleFileEvent} className={styles.hidden}/>
            </div>

            <div className={styles.uploadedFileList}>
				{uploadedFiles.map(file => (
                    <div>
                        {file.name}
                        <button onClick={()=> removeImage(file.name)}>remove</button>
                    </div>
                ))}
			</div>

            <button onClick={()=> sendRequest(uploadedFiles)}>Add Photos</button>
        </Modal>
    </>
}