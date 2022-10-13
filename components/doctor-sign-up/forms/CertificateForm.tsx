import { Button, Input, Select, Card, DatePicker } from 'components';
import { useState, useRef, createRef, useEffect } from 'react';
import styles from 'styles/pages/signup.module.scss';
import FileUpload from 'components/doctor-sign-up/FileUpload';

export default function CertificateForm({refObject, stateIndex, setStateArray, defaultInfo}) {

    const [images, setImages] = useState([])

    const setImagesIn = (elems) => {
        setImages(elems)
        refObject.current.images = elems;

        setStateArray((origin) => {
            let changedData = origin
            changedData[stateIndex] = Object.fromEntries(
                new FormData(refObject.current)
            )
            changedData[stateIndex]['files'] = elems
            return changedData
        })
    }

    const formDataChange = (e) => {
        setStateArray((origin) => {
            let changedData = origin
            const { 
                title,
                issuer,
                credentialId,
                issueDate,
                expirationDate,
                credentialInfo
            } = Object.fromEntries(
                new FormData(e.currentTarget)
            )
            changedData[stateIndex] = {
                title,
                issuer,
                credentialId,
                issueDate,
                expirationDate,
                credentialInfo,
                files: changedData[stateIndex].files
            }
            // changedData[stateIndex]['files'] = images
            return changedData
        })
    }

    const setDatesIn = (newDate, name) => {
        setStateArray((origin) => {
            let changedData = origin
            const { 
                title,
                issuer,
                credentialId,
                issueDate,
                expirationDate,
                credentialInfo
            } = Object.fromEntries(
                new FormData(refObject.current)
            )
            changedData[stateIndex] = {
                title,
                issuer,
                credentialId,
                issueDate,
                expirationDate,
                credentialInfo,
                files: changedData[stateIndex].files
            }
            // changedData[stateIndex]['files'] = images
            changedData[stateIndex][name] = newDate
            return changedData
        })
    }

    return (
        <form onChange={formDataChange} ref={refObject} className={styles.cardBody}>
            <div className={styles.editRow}>
                <Input
                    type="text"
                    label="Title"
                    name='title'
                    placeholder="Enter title..."
                    defaultValue={defaultInfo.title}
                ></Input>
                <Input
                    type="text"
                    label="Issuing organization"
                    name='issuer'
                    placeholder="Enter issuer..."
                    defaultValue={defaultInfo.issuer}
                ></Input>
            </div>
            <div className={styles.editRow}>
                <Input
                    type="text"
                    label="Credential ID"
                    name='credentialId'
                    placeholder="Enter credential id..."
                    defaultValue={defaultInfo.credentialId}
                ></Input>
                <div className={styles.editRow}>
                    <DatePicker
                        label="Issue date"
                        mode="single"
                        name='issueDate'
                        placeholder="01.01.2000"
                        value={defaultInfo.issueDate}     
                        onChange={(newDate) => setDatesIn(newDate, 'dateStart')} 
                    />
                    <DatePicker
                        label="End date"
                        mode="single"
                        name='expirationDate'
                        placeholder="01.01.2000"
                        value={defaultInfo.expirationDate}     
                        onChange={(newDate) => setDatesIn(newDate, 'dateStart')} 
                    />
                </div>
            </div>
            <div className={styles.editRow}>
                <Input
                    type="text"
                    label="Credential info"
                    name='credentialInfo'
                    placeholder="Enter credential info..."
                    defaultValue={defaultInfo.credentialInfo}
                ></Input>
            </div>
            <FileUpload currentImages={defaultInfo.files} onChange={setImagesIn} />
        </form>
    )
}