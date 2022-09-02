import styles from '/styles/components/Modals/BranchModal.module.scss';
import { useState } from 'react';
import { Button, Input, Modal } from 'components';
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";

interface BranchData {
    phone?: string | number;
    address?: string | number;
    time?: string | number;
    about?: string | number;
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
    let phoneNum = data[0]?.contactInfos?.map((contact)=>{
        if(contact?.type.value == 'mobile') {
            return [contact.value]
        }
    }).filter((e)=> e != undefined)
    const [phone, setPhone] = useState(mode === 'edit' ? phoneNum[0] : '');
    const [address, setAddress] = useState(mode === 'edit' ? data[0].address.address : '');
    const [time, setTime] = useState(mode === 'edit' ? data[0].time : '');
    const [about, setAbout] = useState(mode === 'edit' ? data[0].description : '');

    const editBranch = async () => {
        let formData = new FormData()
        formData.append('startHours',"10:00")
        formData.append('endHours', '11:00')
        formData.append('phone', phone)
        formData.append('days', '1')
        formData.append('address', address)
        formData.append('description', about)
        formData.append('cityId', '80')
        formData.append('email', 'mail@mail.com')
     
        return axios.put(`/asclepius/v1/api/clinics/${data[0].id}`, formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }).then((response) => { refetch() })
    }
    
    const { mutate: edit } = useMutation(editBranch)

    return (
        <Modal onBackClick={onClose} className={styles.modal}>
            <span className={styles.modalTitle}>Edit this branch</span>
            <div className={styles.modalContent}>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Phone number"
                        value={phone}
                        onChange={(value) => setPhone(value)}
                    />
                    <Input type="select" label="Status" value="Open" />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="Address"
                        value={address}
                        onChange={(value) => setAddress(value)}
                    />
                    <Input
                        type="time"
                        label="Working hours"
                        value={time}
                        onChange={(value) => setTime(value)}
                    />
                </div>
                <div className={styles.modalContentRow}>
                    <Input
                        type="text"
                        label="About clinic"
                        multiline
                        value={about}
                        onChange={(value) => setAbout(value)}
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
                        onSave?.call(null, { phone, address, time, about })
                        edit()
                    }
                    }
                    size="large"
                />
            </div>
        </Modal>
    );
};

export default BranchModal;
