/* eslint-disable @next/next/no-img-element */
import styles from 'styles/components/Modals/ClinicModal.module.scss';
import { Input, Button, Modal, CheckBox, activeWorkingHours, getFirstStartEndHours, handleChange} from 'components';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useClinicsData, encodeImageFileAsURL } from 'components';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';

interface ClinicData {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    time?: string;
    registrationDate?: string;
    about?: string;
    image?: any;
}

interface ClinicModalProps {
    onClose?: () => void;
    onSave?: (newData: ClinicData) => void;
    onCancel?: () => void;
    setBool?: any;
}

export default function AddClinicModal({
    onClose,
    onSave,
    onCancel,
}: ClinicModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');
    const [about, setAbout] = useState('');
    const [startHours, setStartHours] = useState('');
    const [endHours, setEndHours] = useState('');
    const [eligable, setEligable] = useState(false);
    const { refetch } = useClinicsData()
    const [image, setImage] = useState<File>()
    const [uploadPhoto, setUploadPhoto] = useState('');
    const [openWorkHours, setOpenWorkHours] = useState(false);
    const [workingHours, setWorkingHours] = useState([
        {
            days: 1,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 2,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 3,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 4,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 5,
            endHour: '',
            startHour: '',
            active: true
        },
        {
            days: 6,
            endHour: '',
            startHour: '',
            active: false
        },
        {
            days: 7,
            endHour: '',
            startHour: '',
            active: false
        }
    ]);

    const addClinic = async () => {
        let formData = new FormData()
        formData.append('pictureFile', image)
        formData.append('displayName', name)
        formData.append('startHours',startHours)
        formData.append('endHours', endHours)
        formData.append('phone', phone)
        formData.append('days', '1')
        formData.append('address', address)
        formData.append('description', about)
        formData.append('cityId', '80')
        formData.append('eligibleForVAT', JSON.stringify(eligable))

        console.log(workingHours)
     
        return axios.post("/asclepius/v1/api/clinics/", formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }).then((response) => { refetch(); console.log(response) })
    }
    
    const { mutate: addClinics } = useMutation(addClinic)

    const dayz = [
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday', 
        'Sunday'
    ]
    
    return (
        <>
            {
                openWorkHours && <>
                    <div className={styles.workingHoursModal}>
                        <h2>Work schedule</h2>
                        <ReactSVG 
                            className={styles.closeWorkinBtn}
                            onClick={()=>setOpenWorkHours(false)}
                            src="/images/icons/clinics/closeWorkingHours.svg" 
                        />
                        {
                            workingHours?.map((item, i)=>{
                                return <>
                                    <div className={styles.workingHoursInputs}>
                                        <div className={styles.dayz}>
                                            <CheckBox
                                                id={dayz[i]}
                                                label={dayz[i]}
                                                className={styles.checkbox}
                                                defaultChecked={item.active}
                                                onChange={()=>{activeWorkingHours(i, workingHours, setWorkingHours)}}
                                            />
                                        </div>
                                        <div className={styles.workingActive}>
                                            {
                                                workingHours[i].active ? <span>Open</span> : <span>Close</span>
                                            }
                                        </div>
                                        <div className={styles.workingH}>
                                            {
                                                workingHours[i].active ? 
                                                <>
                                                    <Input 
                                                        value={workingHours[i].startHour}
                                                        onChange={(e)=>handleChange(i, e, 'startHour', workingHours, setWorkingHours)}
                                                    />
                                                    <div className={styles.lineImg}>
                                                        <img src="/images/icons/clinics/line.svg" alt="" />
                                                    </div>
                                                    <Input 
                                                        value={workingHours[i].endHour}
                                                        onChange={(e)=>handleChange(i, e, 'endHour', workingHours, setWorkingHours)}
                                                    />
                                                </> : 'Day off'
                                            }
                                        </div>
                                    </div>
                                </>
                            })
                        }
                        
                        <Button 
                            label="Save"
                            className={styles.workingSaveBtn}
                        />
                    </div>
                </>
            }
            <Modal onBackClick={onClose} className={styles.modal}>
                <span className={styles.modalTitle}>Add clinic</span>
                <div className={styles.modalContent}>
                    <div className={classNames(styles.modalContentRow, styles.center)}>
                        <img 
                            className={classNames(styles.image)} 
                            src={uploadPhoto !== '' ? uploadPhoto : "/images/icons/clinics/placeholder.png"} 
                            alt=""
                        />
                        <input 
                            className={styles.upInput} 
                            id="uploadPhoto" 
                            type="file" 
                            onChange={(e)=> {
                                setImage(e.target.files[0]);
                                encodeImageFileAsURL(e.target, setUploadPhoto)
                            }} 
                        />
                        <label htmlFor='uploadPhoto' className={classNames(styles.upBtn, {
                            [styles.upBtnH]: uploadPhoto !== ''
                        })}></label>
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(value: string) => setName(value)}
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="number"
                            label="Phone number"
                            value={phone}
                            onChange={(value: string) => setPhone(value)}
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="time"
                            label="Start hours"
                            value={startHours}
                            onChange={(value: string) => setStartHours(value)}
                        />
                        <Input
                            type="time"
                            label="End hours"
                            value={endHours}
                            onChange={(value: string) => setEndHours(value)}
                        />
                    </div>
                    <div className={classNames(styles.modalContentRow, styles.workingHours)}>
                        <Input 
                            type="text"
                            label="Working hours"
                            value={getFirstStartEndHours(workingHours)?.startHour && 
                                getFirstStartEndHours(workingHours)?.startHour + 
                                ' - ' + 
                                getFirstStartEndHours(workingHours)?.endHour
                            }
                        />
                        <ReactSVG 
                            className={styles.workingIcon} 
                            onClick={()=> setOpenWorkHours(true)}
                            src="/images/icons/inputs/clock.svg" 
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="text"
                            label="Address"
                            value={address}
                            onChange={(value: string) => setAddress(value)}
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="text"
                            label="About clinic"
                            multiline
                            value={about}
                            onChange={(value: string) => setAbout(value)}
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <CheckBox
                            id='eligable_for_vat'
                            label='Eligable for VAT'
                            className={styles.checkbox}
                            defaultChecked={eligable}
                            onChange={() => { setEligable(!eligable) }}
                        />
                    </div>
                </div>
                <div className={styles.whiteSpace}></div>
                <div className={styles.modalActions}>
                    <Button
                        label="Calcel"
                        variant="outline"
                        onClick={onCancel}
                        size="large"
                    />
                    <Button
                        label="Add"
                        variant="fill"
                        onClick={() => {
                            {
                                name && address && startHours && endHours ?
                                    addClinics()
                                    : alert('Fields are not filled')
                            }
                            onSave?.call(null, {
                                phone,
                                address,
                                time,
                                about,
                            })
                        }
                        }
                        size="large"
                    />
                </div>
            </Modal>
        </>
    );
}
