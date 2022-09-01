import { Input, Button, Modal } from "components";
import { useState, useEffect } from "react";
import styles from "styles/components/Modals/ClinicModal.module.scss";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

interface ClinicData {
  email?: string;
  phone?: string;
  address?: any;
  time?: string;
  registrationDate?: string;
  about?: string;
  workingHours?: any;
  id?: Number;
  contactInfos?: any;
  description?: string;
}

interface ClinicModalProps {
  onClose?: () => void;
  onSave?: (newData: ClinicData) => void;
  onCancel?: () => void;
  data: ClinicData;
}

export default function ClinicModal({
  onClose,
  onSave,
  onCancel,
  data,
}: ClinicModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(data?.address.address);
  const [startHours, setStartHours] = useState(data?.workingHours[0].startHour);
  const [endHours, setEndHour] = useState(data?.workingHours[0].endHour);
  const [about, setAbout] = useState(data?.description);

  const [registrationDate, setRegistrationDate] = useState(
    data?.registrationDate
  );

  const modifyClinic = async () => {
    // console.log(email, about);

    let formData = new FormData();
    formData.append("startHours", startHours);
    formData.append("endHours", endHours);
    formData.append("phone", phone);
    formData.append("days", "1");
    formData.append("address", address);
    formData.append("description", about);
    formData.append("cityId", "80");
    formData.append("mail", email);

    return axios
      .put(`/asclepius/v1/api/clinics/${data?.id}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        // console.log("this is response", response);
      });
  };

  const { mutate: clinicUpdate } = useMutation(modifyClinic);

  useEffect(() => {
    let numbers = data?.contactInfos.filter((e) => e?.type.value === "mobile");

    let emails = data?.contactInfos.filter((e) => e?.type.value === "mail");

    setPhone(numbers[0]?.value);
    setEmail(emails[0]?.value);
  }, [data]);

  return (
    <Modal onBackClick={onClose} className={styles.modal}>
      <span className={styles.modalTitle}>Edit this clinic</span>
      <div className={styles.modalContent}>
        <div className={styles.modalContentRow}>
          <Input
            type="email"
            label="E-mail"
            value={email && email}
            onChange={(value: string) => setEmail(value)}
          />
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
            onChange={(value: string) => setEndHour(value)}
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
          label="Save"
          variant="fill"
          onClick={() => {
            if (email.includes("@")) {
              clinicUpdate();
              onSave?.call(null, {
                email,
                phone,
                address,
                startHours,
                registrationDate,
                about,
              });
            } else {
              alert("write correct email");
            }
          }}
          size="large"
        />
      </div>
    </Modal>
  );
}
