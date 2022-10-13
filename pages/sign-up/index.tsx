import { Button, Input, Select, Card, DatePicker } from 'components';
import { Stepper } from 'components/progress';
import { Step } from 'components/progress/Stepper';
import { useState, useRef, createRef, useEffect } from 'react';
import styles from 'styles/pages/signup.module.scss';
import PersonalData from 'components/doctor-sign-up/forms/PersonalData';
import Start from 'components/doctor-sign-up/forms/Start';
import Verification from 'components/doctor-sign-up/forms/Verification';
import Finish from 'components/doctor-sign-up/forms/Finish';

export default function Authorization() {
    const [step, setStep] = useState(0);
    const [jobTitles, setJobTitles] = useState([
        {
            value: '1',
            label: 'Job Title',
        },
        {
            value: '2',
            label: 'Job Title 2',
        },
    ]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const onJobTitleChange = (value) => {
        setSelectedTitle(value);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Stepper currentStep={step} className={styles.stepper}>
                    <Step title="Start" />
                    <Step title="Personal data" />
                    <Step title="Verification" />
                    <Step title="Finish" />
                </Stepper>
                {step === 0 && <Start setStep={setStep} />}
                {step === 1 && <PersonalData setStep={setStep} />}
                {step === 2 && <Verification />}
                {step === 3 && <Finish />}
                {step !== 0 && step !== 3 && step !== 1 && (
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
                                setStep((origin) => origin + 1);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
