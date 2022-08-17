import styles from "styles/components/Tabs/AboutDoctorTab.module.scss";
import { Card, Button, Modal, Input, Select, DatePicker } from "components";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import Image from 'next/image';

interface Media {
    src: string;
    alt?: string;
}

interface Doctor {
    dateOfBirth?: string;
    id?: string;
    clinicAddress?: string;
    clinic?: string;
    iban?: string;
    gender?: "Male" | "Female";
    aboutMe?: string;
    media?: Media[];
}

interface AboutDoctorTabProps {
    className?: string;
    doctor?: Doctor;
}

interface ActionProps {
    icon?: string;
    onClick?: () => void;
}

const EditAction = ({ onClick, icon }: ActionProps) => (
    <ReactSVG src={icon} onClick={onClick}></ReactSVG>
);

export default function AboutDoctorTab({ doctor = {} }: AboutDoctorTabProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [gender, setGender] = useState<string>("");
    const [clinic, setClinic] = useState<string>("");
    const [birthDate, setBirthDate] = useState("");
    return (
        <>
            {isEditing && (
                <Modal
                    onBackClick={() => {
                        setIsEditing(false);
                    }}
                >
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalTitle}>Edit information</div>
                            <div className={styles.modalClose}>
                                <ReactSVG
                                    src={"/images/icons/inputs/x.svg"}
                                    onClick={() => {
                                        setIsEditing(false);
                                    }}
                                    className={styles.close}
                                />
                            </div>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.editRow}>
                                <div className={styles.editColumn}>
                                    <Input label="ID" />
                                    <Input label="IBAN" />
                                    <Input label="Branch" />
                                </div>
                                <div className={styles.editColumn}>
                                    <DatePicker label="Date of birth" mode="single" />
                                    <Select
                                        label="Gender"
                                        labelStyle="outside"
                                        options={[
                                            {
                                                label: "Male",
                                                value: "1",
                                            },
                                            {
                                                label: "Female",
                                                value: "2",
                                            },
                                        ]}
                                        onChange={(value) => {
                                            setGender(value);
                                        }}
                                        value={gender}
                                    />
                                    <Select
                                        label="Clinic"
                                        labelStyle="outside"
                                        options={[
                                            {
                                                label: "Clinic 1",
                                                value: "1",
                                            },
                                            {
                                                label: "Clinic 2",
                                                value: "2",
                                            },
                                        ]}
                                        onChange={(value) => {
                                            setClinic(value);
                                        }}
                                        value={clinic}
                                    />
                                </div>
                            </div>
                            <Input label="About me" type="text" multiline />
                        </div>
                        <div className={styles.modalFooter}>
                            <Button
                                label="Cancel"
                                size="large"
                                variant="outline"
                                onClick={() => {
                                    setIsEditing(false);
                                }}
                            />
                            <Button
                                label="Save"
                                size="large"
                                variant="fill"
                                onClick={() => {
                                    setIsEditing(false);
                                }}
                            />
                        </div>
                    </div>
                </Modal>
            )}
            <Card
                cardTitle="Info"
                cardActions={
                    <EditAction
                        icon="/images/icons/inputs/edit.svg"
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    />
                }
            >
                <div className={styles.container}>
                    <div className={styles.info}>
                        <div className={styles.subInfo}>
                            <div className={styles.infoTitle}>Date of birth</div>
                            <div className={styles.infoText}>{doctor.dateOfBirth}</div>
                        </div>
                        <div className={styles.subInfo}>
                            <div className={styles.infoTitle}>ID</div>
                            <div className={styles.infoText}>{doctor.id}</div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.subInfo}>
                            <div className={styles.infoTitle}>Clinic</div>
                            <div className={styles.infoText}>{doctor.clinicAddress}</div>
                        </div>
                        <div className={styles.subInfo}>
                            <div className={styles.infoTitle}>Clinic</div>
                            <div className={styles.infoText}>{doctor.clinic}</div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.subInfo}>
                            <div className={styles.infoTitle}>IBAN</div>
                            <div className={styles.infoText}>{doctor.iban}</div>
                        </div>
                        <div className={styles.subInfo}>
                            <div className={styles.infoTitle}>Gender</div>
                            <div className={styles.infoText}>{doctor.gender}</div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.infoTitle}>About me</div>
                        <div className={styles.infoText}>{doctor.aboutMe}</div>
                    </div>
                </div>
            </Card>
            <Card
                cardTitle="Media files"
                cardActions={
                    <Button
                        label={"Add certificate"}
                        size="large"
                        variant="fill"
                        onClick={() => { }}
                    />
                }
            >
                <div className={styles.mediaContainer}>
                    {doctor.media?.map((media, index) => (
                        <div key={index} className={styles.mediaItem}>
                            <Image src={media.src} alt={media.alt} />
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}
