/* eslint-disable @next/next/no-img-element */
import styles from 'styles/components/Modals/ClinicModal.module.scss';
import {
	Input,
	Button,
	Modal,
	CheckBox,
	activeWorkingHours,
	getFirstStartEndHours,
	handleChange,
	dayz,
} from 'components';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useClinicsData, encodeImageFileAsURL, Select } from 'components';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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
    isOpen?: boolean;
    setExistClinic?: any;
    municipalities?: any;
}

export default function AddClinicModal({
    onClose,
    onSave,
    onCancel,
    isOpen,
    setExistClinic,
    municipalities
}: ClinicModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');
    const [about, setAbout] = useState('');
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
            active: false
        },
        {
            days: 2,
            endHour: '',
            startHour: '',
            active: false
        },
        {
            days: 3,
            endHour: '',
            startHour: '',
            active: false
        },
        {
            days: 4,
            endHour: '',
            startHour: '',
            active: false
        },
        {
            days: 5,
            endHour: '',
            startHour: '',
            active: false
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
    const [municipal, setMunicipal]= useState('');
    const [validOpen, setValidOpen] = useState(false);
    const [validation, setValidation] = useState<any>();

    const addClinic = async () => {
        let formData = new FormData()
        formData.append('pictureFile', image)
        formData.append('displayName', name)
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('description', about)
        formData.append('cityId', municipal)
        formData.append('eligibleForVAT', JSON.stringify(eligable))

        for(let i = 0; i < workingHours.length; i++){
            if(workingHours[i].startHour !== '' && workingHours[i].endHour !== '') {
                formData.append('days', workingHours[i].days.toString())
                formData.append('startHours',workingHours[i].startHour)
                formData.append('endHours', workingHours[i].endHour)
            }
        }
     
        return axios.post("/asclepius/v1/api/clinics/", formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }).then((response) => { 
            if(response.status == 201){
                refetch(); 
            }else {
                // alert('Clinic with this name already exists')
                setExistClinic({
                    data: response.data,
                    isOpen: true
                })
            }
            onSave?.call(null, { phone })
        })
    }
    
    const { mutate: addClinics } = useMutation(addClinic);

    return (
        <>
            {
                openWorkHours && <>
                    <div className={styles.workingHoursModal}>
                        <h2>Work schedule</h2>
                        <ReactSVG 
                            className={styles.closeWorkinBtn}
                            onClick={()=>{setOpenWorkHours(false); setWorkingHours(workingHours)}}
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
                                                        type="time"
                                                        className={styles.workingInput}
                                                        onChange={(e)=>handleChange(i, e, 'startHour', workingHours, setWorkingHours)}
                                                    />
                                                    <div className={styles.lineImg}>
                                                        <img src="/images/icons/clinics/line.svg" alt="" />
                                                    </div>
                                                    <Input 
                                                        type="time"
                                                        className={styles.workingInput}
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
                            onClick={()=> setOpenWorkHours(false)}
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
                            className={classNames({
                                [styles.validation]: validation && !validation['name'],
                                [styles.removeValidate]: name
                            })}
                            onChange={(value: string) => setName(value)}
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="number"
                            label="Phone number"
                            value={phone}
                            onChange={(value: string) => {setPhone(value)}}
                            className={classNames({
                                [styles.validation]: validation && !validation['phone'],
                                [styles.removeValidate]: phone
                            })}
                        />
                    </div>
                    <div className={classNames(styles.modalContentRow, styles.workingHours)}>
                        <h2>Working hours</h2>
                        <input 
                            type="text"
                            readOnly
                            className={classNames(styles.workingInp, {
                                [styles.validationForHours]: validation && validation['workingHours'],
                                [styles.removeWorkingValidations]: getFirstStartEndHours(workingHours) != undefined
                            })}
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
                        <Select
                            label="Municipalities"
                            labelStyle="outside"
                            onChange={(e) => {setMunicipal(e)}}
                            value={municipal}
                            options={municipalities?.map((item)=> ({label: item.title, value: item.id}))}
                            inputClassname={classNames({
                                [styles.validationForSelect]: validation && !validation['municipal'],
                                [styles.removeSelectValidation]: municipal
                            })}
                        />
                        <Input
                            type="text"
                            label="Address"
                            value={address}
                            onChange={(value: string) => setAddress(value)}
                            className={classNames({
                                [styles.validation]: validation && !validation['address'],
                                [styles.removeValidate]: address
                            })}
                        />
                    </div>
                    <div className={styles.modalContentRow}>
                        <Input
                            type="text"
                            label="About clinic"
                            multiline
                            value={about}
                            onChange={(value: string) => setAbout(value)}
                            className={classNames({
                                [styles.validation]: validation && !validation['about'],
                                [styles.removeValidate]: about
                            })} 
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
                    {
                        validOpen && <div className={styles.redFlag}>
                            *please fill all the inputs 
                            {
                                (validation && !validation['uploadPhoto']) && ' and Upload photo'
                            }
                        </div>
                    }
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
                                name && phone && address && about && uploadPhoto && getFirstStartEndHours(workingHours) != undefined ?
                                    addClinics()
                                    : setValidation(()=>(
                                        {
                                            name, 
                                            phone, 
                                            address,
                                            about,
                                            uploadPhoto,
                                            municipal,
                                            workingHours: getFirstStartEndHours(workingHours) == undefined
                                        }
                                    ))
                                    setValidOpen(true)
                            }
                        }
                        }
                        size="large"
                    />
                </div>
            </Modal>
        </>
    );
}
