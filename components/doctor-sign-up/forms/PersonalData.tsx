import { Button, Input, Select, Card, DatePicker } from 'components';
import Radio from 'components/inputs/radio';
import { useState, useRef, createRef, useEffect } from 'react';
import styles from 'styles/pages/signup.module.scss';
import AvatarPicker from 'components/doctor-sign-up/AvatarPicker';
import axios from 'axios';
import CertificateForm from 'components/doctor-sign-up/forms/CertificateForm';
import EducationForm from 'components/doctor-sign-up/forms/EducationForm';

export default function PersonalData({setStep}) {
    const [educationForms, setEducationForms] = useState([{}])
    const educationFormsRef = useRef(educationForms.map(() => createRef<HTMLFormElement>()));
    const [certificateForms, setCertificateForms] = useState([{}])
    const certificateFormsRef = useRef(certificateForms.map(() => createRef<HTMLFormElement>()));
    const doctorRef = useRef<HTMLFormElement>()

    const sendDoctor = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const { 
            firstName, 
            lastName, 
            dateOfBirth, 
            gender, 
            email, 
            phone, 
            iban,
            personalId, 
            aboutMe, 
            pictureFile 
        } = Object.fromEntries(
            new FormData(e.target)
        );
        axios.post(`/asclepius/v1/api/doctors/freelancers`, {
            firstName, 
            lastName, 
            dateOfBirth, 
            gender, 
            email, 
            phone, 
            iban, 
            personalId, 
            aboutMe, 
            pictureFile,
            professionId: 1,
            isActive: true
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(function (response) {
            educationFormsRef.current.forEach(formRef => {                
                const formData = new FormData(formRef.current)
                formData.delete('files')
                formData.append('doctorId', response.data.id)
                formRef.current.images.forEach(img => formData.append('files', img))
                sendDoctorEducation(formData)
            })
            certificateFormsRef.current.forEach(formRef => {
                const formData = new FormData(formRef.current)
                formData.delete('files')
                formData.append('doctorId', response.data.id)
                formRef.current.images.forEach(img => formData.append('files', img))
                sendDoctorCertificate(formData)
            }) 
        })
        .finally(() => {
            // setStep((origin) => origin + 1)
        })            
    }

    const sendDoctorEducation = (body) => {
        axios.post(`/asclepius/v1/api/doctors/${body.doctorId || body.get('doctorId')}/educations`, body,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }
    const sendDoctorCertificate = (body) => {
        axios.post(`/asclepius/v1/api/doctors/${body.doctorId || body.get('doctorId')}/certificates`, body,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    return (
        <div className={styles.column}>
            <Card cardTitle="General information" className={styles.card}>
                <form onSubmit={sendDoctor} ref={doctorRef} className={styles.cardBody}>
                    <AvatarPicker name="pictureFile" />
                    <div className={styles.editRow}>
                        <Input
                            type="text"
                            label="Name"
                            name='firstName'
                            placeholder="Enter name..."
                        ></Input>
                        <Input
                            type="text"
                            label="Surname"
                            name='lastName'
                            placeholder="Enter surname..."
                        ></Input>
                    </div>
                    <div className={styles.editRow}>
                        {/* <Select
                            options={jobTitles}
                            onChange={onJobTitleChange}
                            label="Job Title"
                            labelStyle="outside"
                            value={selectedTitle}
                        /> */}
                        <div className={styles.editRow}>
                            <DatePicker
                                label="Date of birth"
                                mode="single"
                                name="dateOfBirth"
                            />
                            <div className={styles.inputContainer}>
                                <div className={styles.editTitle}>
                                    Gender
                                </div>
                                <div className={styles.editRow}>
                                    <Radio
                                        label="Male"
                                        name="gender"
                                        id="gender-1"
                                        value='m'
                                    />
                                    <Radio
                                        label="Female"
                                        name="gender"
                                        id="gender-2"
                                        value='f'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editRow}>
                        <Input
                            name='email'
                            type="text"
                            label="E-mail"
                            placeholder="Enter e-mail..."
                        ></Input>
                        <Input
                            name='phone'
                            type="text"
                            label="Phone number"
                            placeholder="Enter phone number..."
                        ></Input>
                    </div>
                    <div className={styles.editRow}>
                        <div className={styles.editColumn}>
                            <Input
                                type="text"
                                label="IBAN"
                                name="iban"
                                placeholder="Enter IBAN..."
                            ></Input>
                            <Input
                                type="text"
                                label="Id"
                                name="personalId"
                                placeholder="Enter personal number..."
                            ></Input>
                        </div>
                        <Input
                            type="text"
                            multiline
                            label="About"
                            name='aboutMe'
                            placeholder="Tell about yourself"
                            style={{ height: '180px', resize: "none" }}
                        />
                    </div>
                </form>
            </Card>
            <Card cardTitle="Education information" className={styles.card}>
                {educationForms.map((item, index) => (
                    <EducationForm 
                        key={`ed-form-${index}`}
                        refObject={educationFormsRef.current[index]}
                        stateIndex={index}
                        setStateArray={setEducationForms}
                        defaultInfo={educationForms[index]}
                    />
                ))}                    
                <div className={styles.actions}>
                    <Button
                        className={styles.add}
                        variant="text"
                        label="+Add one more education"
                        size="large"
                        onClick={() => {
                            educationFormsRef.current = [...educationForms,{}].map(() => createRef())
                            setEducationForms([...educationForms,{}])
                        }}
                    />
                </div>
            </Card>
            <Card cardTitle="Certificates" className={styles.card}>
                {certificateForms.map((item, index) => (
                    <CertificateForm 
                        key={`cer-form-${index}`}
                        refObject={certificateFormsRef.current[index]}
                        stateIndex={index}
                        setStateArray={setCertificateForms}
                        defaultInfo={certificateForms[index]}
                    />
                ))}
                <div className={styles.actions}>
                    <Button
                        className={styles.add}
                        variant="text"
                        label="+Add one more certificate"
                        size="large"
                        onClick={() => {
                            certificateFormsRef.current = [...certificateForms,{}].map(() => createRef())
                            setCertificateForms([...certificateForms,{}])
                        }}
                    />
                </div>
            </Card>
            <div className={styles.moveContainer}>
                <Button
                    label="Back"
                    size="large"
                    variant="outline"
                    onClick={() => {
                        setStep((origin) => origin - 1);
                    }}
                />
                <Button
                    label="Next"
                    size="large"
                    variant="fill"
                    onClick={() => {
                        doctorRef?.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
                    }}
                />
            </div>
        </div>
    );
};