import {useState} from 'react';
import styles from '/styles/components/modals/AddCardModal.module.scss';
import { Input, Button, Modal, Select, SelectWithCheckbox } from 'components';

export default function AddCardModal({
    onClose,
    onCancel
}) {
    const clinicData = [
        {
            id: 0,
            name: 'Annette Black',
        },
        {
            id: 1,
            name: 'Marvin McKinney',
        },
        {
            id: 2,
            name: 'Dianne Russell',
        },
        {
            id: 3,
            name: 'Jenny Wilson',
        },
        {
            id: 4,
            name: 'Cameron Williamson',
        },
        {
            id: 5,
            name: 'Guy Hawkins',
        },
        {
            id: 6,
            name: 'Robert Fox',
        },
        {
            id: 7,
            name: 'Wade Warren',
        },
        {
            id: 8,
            name: 'Albert Flores',
        },
        {
            id: 9,
            name: 'Cameron Williamson',
        },
        {
            id: 10,
            name: 'Ronald Richards',
        },
        {
            id: 11,
            name: 'Bessie Cooper',
        },
        {
            id: 12,
            name: 'Jerome Bell',
        }
    ]

    const servicesData = [
        {
            id: 'serv-11',
            name: 'Annette',
        },
        {
            id: 'serv-0',
            name: 'Marvin McKinney',
        },
        {
            id: 'serv-1',
            name: 'Dianne Russell',
        },
        {
            id: 'serv-2',
            name: 'Jenny Wilson',
        },
        {
            id: 'serv-3',
            name: 'Cameron Williamson',
        },
        {
            id: 'serv-4',
            name: 'Guy Hawkins',
        },
        {
            id: 'serv-5',
            name: 'Robert Fox',
        },
        {
            id: 'serv-6',
            name: 'Wade Warren',
        },
        {
            id: 'serv-7',
            name: 'Albert Flores',
        },
    ]

    const [checkedServices, setCheckedServices] = useState([]);
    const [checkedClinics, setCheckedClinics] = useState([]);

    return <>
        <Modal onBackClick={onClose} className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalTitle}>
                    <h2>New card</h2>
                </div>
                <div className={styles.modalInputs}>
                    <Input 
                        label="Name card type" 
                        className={styles.modalInput} 
                        placeholder='Enter name...' 
                    />
                    <Input 
                        label="Price" 
                        className={styles.modalInput} 
                        placeholder='Enter surname...' 
                    />
                    <Select 
                        label="Card type"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <Select 
                        label="Promotion"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <div className={styles.buffer}>
                        <h2>Buffer</h2>
                        <div>
                            <Select 
                                label="Days"
                                labelStyle="inside"
                                className={styles.modalInput}
                                options={[
                                    {
                                        label: "Status 1",
                                        value: "1",
                                    },
                                    { label: "Status 2", value: "2" },
                                    ]}
                            />
                            <Select 
                                label="Hours"
                                labelStyle="inside"
                                className={styles.modalInput}
                                options={[
                                    {
                                        label: "Status 1",
                                        value: "1",
                                    },
                                    { label: "Status 2", value: "2" },
                                    ]}
                            />
                            <Select 
                                label="Minutes"
                                labelStyle="inside"
                                className={styles.modalInput}
                                options={[
                                    {
                                        label: "Status 1",
                                        value: "1",
                                    },
                                    { label: "Status 2", value: "2" },
                                    ]}
                            />
                        </div>
                    </div>
                    <Select 
                        label="Expiration date"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                    <SelectWithCheckbox 
                        label="Clinic"
                        labelStyle="outside"
                        className={styles.checkboxes}
                        searchForm={false}
                        options={clinicData}
                        checkboxBodyStyle={styles.checkboxBody}
                        values={checkedClinics}
                        checkboxChilds={[
                            {id:'child-1', parentId: 1, title:'child 1'},
                            {id:'child-3', parentId: 1, title:'child 2'},
                            {id:'child-2', parentId: 2, title:'child 3'}
                        ]}
                        changeValue={(value)=> setCheckedClinics(value)}
                    />
                    <SelectWithCheckbox 
                        label="Services"
                        labelStyle="outside"
                        className={styles.modalInput}
                        searchForm={false}
                        options={servicesData}
                        checkboxBodyStyle={styles.checkboxBodySingle}
                        values={checkedServices}
                        changeValue={(value)=> setCheckedServices(value)}
                    />
                    <Select 
                        label="Branch"
                        labelStyle="outside"
                        className={styles.modalInput}
                        options={[
                            {
                                label: "Status 1",
                                value: "1",
                            },
                            { label: "Status 2", value: "2" },
                            ]}
                    />
                </div>
                <div className={styles.modalBtns}>
                    <Button
                        label="Cancel"
                        size="large"
                        variant='outline'
                    />
                    <Button
                        label="Save"
                        size="large"
                        variant='fill'
                    />
                </div>
            </div>
        </Modal>
    </>
}