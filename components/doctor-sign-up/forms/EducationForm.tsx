import { Button, Input, Select, Card, DatePicker } from 'components';
import { useState, useRef, createRef, useEffect } from 'react';
import styles from 'styles/pages/signup.module.scss';
import FileUpload from 'components/doctor-sign-up/FileUpload';

export default function EducationForm({refObject, stateIndex, setStateArray, defaultInfo}) {

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
                school,
                degree,
                fieldsOfStudy,
                dateStart,
                dateEnd
            } = Object.fromEntries(
                new FormData(e.currentTarget)
            )
            changedData[stateIndex] = {
                school,
                degree,
                fieldsOfStudy,
                dateStart,
                dateEnd,
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
                school,
                degree,
                fieldsOfStudy,
                dateStart,
                dateEnd
            } = Object.fromEntries(
                new FormData(refObject.current)
            )
            changedData[stateIndex] = {
                school,
                degree,
                fieldsOfStudy,
                dateStart,
                dateEnd,
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
                    label="School"
                    name="school"
                    placeholder="Enter school..."
                    defaultValue={defaultInfo.school}
                ></Input>
                <Input
                    type="text"
                    label="Degree"
                    name="degree"
                    placeholder="Enter degree..."
                    defaultValue={defaultInfo.degree}
                ></Input>
            </div>
            <div className={styles.editRow}>
                <Input
                    type="text"
                    label="Fields of study"
                    name='fieldsOfStudy'
                    placeholder="Enter school..."
                    defaultValue={defaultInfo.fieldsOfStudy}
                ></Input>
                <div className={styles.editRow}>
                    <DatePicker
                        label="Start Date"
                        mode="single"
                        name='dateStart'
                        placeholder="01.01.2000"
                        value={defaultInfo.dateStart}     
                        onChange={(newDate) => setDatesIn(newDate, 'dateStart')}                            
                    />
                    <DatePicker
                        label="End date"
                        mode="single"
                        name='dateEnd'
                        placeholder="01.01.2000"
                        value={defaultInfo.dateEnd} 
                        onChange={(newDate) => setDatesIn(newDate, 'dateEnd')}   
                    />
                </div>
            </div>
            <FileUpload currentImages={defaultInfo.files} onChange={setImagesIn} />
        </form>
    )
}