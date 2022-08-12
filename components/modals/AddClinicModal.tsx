import styles from '/styles/components/modals/ClinicModal.module.scss';
import { Input, Button, Modal, CheckBox } from 'components';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import {useQuery, useMutation} from '@tanstack/react-query';
import {useClinicsData} from '../useClinicsData';

interface ClinicData {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    time?: string;
    registrationDate?: string;
    about?: string;
}

interface ClinicModalProps {
    onClose?: () => void;
    onSave?: (newData: ClinicData) => void;
    onCancel?: () => void;
    setBool?:any;
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

    let img = {
        lastModified: 1656921762941,
        lastModifiedDate: `Mon Jul 04 2022 12:02:42 GMT+0400 (Georgia Standard Time)`,
        name: "user.png",
        size: 30662,
        type: "image/png",
        webkitRelativePath: ""
    };

    const addClinic = async() => {
        return axios.post("/asclepius/v1/api/clinics/", {
                "displayName": name,
                "days": 1,
                "startHours": startHours,
                "phone": phone,
                "endHours": endHours,
                "address": address,
                "logoBody": `${img}`,
                "description": about,
                "eligibleForVAT": eligable
            }, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }).then((response)=> {refetch(); console.log(response)})
    }

    const addClinicMutation = () => {
        return useMutation(addClinic)
    }

    const { mutate: addClinics } = addClinicMutation();
 
    const handleClick = () => {
        const clinicBody = {
            "displayName": name,
            "days": 1,
            "startHours": startHours,
            "endHours": endHours,
            "address": address,
            "logoBody": `${img}`,
            "description": about
        }

        addClinics(clinicBody)
    }

    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <span className={styles.modalTitle}>Add clinic</span>
            <div className={styles.modalContent}>
                <div className={classNames(styles.modalContentRow, styles.center)}>
                    <img className={styles.image} src="/images/icons/clinics/placeholder.png" alt="" />
                    <Button className={styles.imageChange} label="change" size="large" />
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
                        type="text"
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
                        onChange={()=>{setEligable(!eligable)}}
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
                    onClick={() =>{
                            {name && address && startHours && endHours ? 
                            handleClick()
                            : alert('Fields are not filled')}
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
    );
}
