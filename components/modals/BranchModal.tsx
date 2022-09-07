import styles from '/styles/components/Modals/BranchModal.module.scss';
import { useState, useEffect } from 'react';
import { encodeImageFileAsURL, Button, Input, Modal, CheckBox, activeWorkingHours, handleChange, dayz, getFirstStartEndHours } from 'components';
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

interface BranchData {
    phone?: string | number;
    address?: any;
    time?: string | number;
    about?: string | number;
    contactInfos?: any;
    description?: string;
    workingHours?: any;
    id?: number;
    logoUrl?: string;
}

interface BranchModalProps {
    onClose?: () => void;
    onSave?: (newData: BranchData) => void;
    onCancel?: () => void;
    data?: BranchData;
    mode: 'add' | 'edit';
    refetch?: ()=> void;
}

const BranchModal = ({
    onClose,
    onSave,
    onCancel,
    data = {},
    mode,
    refetch
}: BranchModalProps) => {
    const [phone, setPhone] = useState(mode === 'edit' ? '' : '');
    const [email, setEmail] = useState(mode === 'edit' ? '' : '');
    const [address, setAddress] = useState(mode === 'edit' ? data?.address.address : '');
    const [time, setTime] = useState(mode === 'edit' ? data?.time : '');
    const [about, setAbout] = useState(mode === 'edit' ? data?.description : '');
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
    const [uploadPhoto, setUploadPhoto] = useState('');
    const [image, setImage] = useState<any>(data?.logoUrl + `&?${new Date().getTime()}`);

    const editBranch = async () => {
        let formData = new FormData()
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('description', about)
        formData.append('cityId', '80')
        formData.append('email', email)
        formData.append('pictureFile', image)

        for(let i = 0; i < workingHours.length; i++){
            if(workingHours[i].startHour !== '' && workingHours[i].endHour !== '') {
                formData.append('days', workingHours[i].days.toString())
                formData.append('startHours',workingHours[i].startHour)
                formData.append('endHours', workingHours[i].endHour)
            }
        }

        console.log('sadadasdssad')
     
        return axios.put(`/asclepius/v1/api/clinics/${data?.id}`, formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }).then((response) => { refetch(); onSave?.call(null, { phone, address, time, about })
    }).catch((err)=>{
            console.log(err)
            alert(`გადაამოწმე working hourse, 00:00-23:59მდე შუალედში უნდა იყოს ყველა დრო. დანარჩენი ველები არ უნდა იყოს ცარიელი`)
        })
    }
    
    const { mutate: edit } = useMutation(editBranch)

    useEffect(()=>{
        let numbers = data?.contactInfos.filter((e)=> e?.type.value === 'mobile');

        let emails = data?.contactInfos.filter((e)=> e?.type.value === 'mail');

        setPhone(numbers[0] ? numbers[0]?.value : '')
        setEmail(emails[0] ? emails[0]?.value : '')
    },[data])

    useEffect(()=>{
        const newWorkingHours = workingHours?.map((item)=>{
            const getCurrentDay = data?.workingHours.filter((e)=> e.dayId === item.days);
            if(getCurrentDay.length > 0){
                return {...item, startHour: getCurrentDay[0]?.startHour, endHour: getCurrentDay[0]?.endHour, active: true}
            } else {
                return {...item, active: false}
            }
        })

        setWorkingHours(newWorkingHours)

    },[data, setWorkingHours])

    return <>
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
                                                    type="time"
                                                    className={styles.workingInput}
                                                    value={workingHours[i].startHour}
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
            <span className={styles.modalTitle}>Edit this branch</span>
            <div className={styles.modalContent}>
                <div className={classNames(styles.modalContentRow, styles.center)}>
                    <img 
                        className={classNames(styles.image)} 
                        src={uploadPhoto !== '' ? uploadPhoto : image} 
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
                        label="Phone number"
                        value={phone}
                        onChange={(value) => setPhone(value.toString())}
                    />
                    <Input type="select" label="Status" value="Open" />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="email"
                        value={email}
                        onChange={(value) => setEmail(value.toString())}
                    />
                </div>
                <div className={classNames(styles.modalContentRow, styles.workingHours)}>
                    <h2>Working hours</h2>
                    <input
                        className={styles.workingInp}
                        readOnly 
                        type="text"
                        value={getFirstStartEndHours(workingHours)?.startHour && getFirstStartEndHours(workingHours)?.startHour + ' - ' + getFirstStartEndHours(workingHours)?.endHour}
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
                        label="About clinic"
                        multiline
                        value={about}
                        onChange={(value) => setAbout(value.toString())}
                    />
                </div>
            </div>
            <div className={styles.whiteSpace}></div>
            <div className={styles.modalActions}>
                <Button
                    label="Cancel"
                    variant="outline"
                    onClick={onCancel}
                    size="large"
                />
                <Button
                    label="Save"
                    variant="fill"
                    onClick={() =>{
                        edit()
                    }
                    }
                    size="large"
                />
            </div>
        </Modal>
    </>
};

export default BranchModal;
