import { Input, Button, Modal } from "components";
import { encodeImageFileAsURL } from "components";
import { useState, useEffect } from "react";
import styles from "styles/pages/doctors_detailed.module.scss";
import style from "styles/pages/addDoctor.module.scss";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ReactSVG } from "react-svg";
import Select from "react-select";

interface DoctorData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  professionId?: 0;
  personalId?: string;
  dateOfBirth?: string;
  gender?: string;
  iban?: string;
  aboutMe?: string;
  pictureUrl?: any;
  contactInfos?: any;
  id?: string;
}

interface DoctorModalProps {
  onSave?: (newData: DoctorData) => void;
  data: DoctorData;
  onClose?: () => void;
  refetch?: () => void;
}

export default function EditDoctorModal({
  onSave,
  onClose,
  data,
  refetch,
}: DoctorModalProps) {
  const [name, setName] = useState(data?.firstName);
  const [surname, setSurname] = useState(data?.lastName);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [professionId, setProfessionId] = useState("1");
  const [pictureFile, setPictureFile] = useState(null);

  const modifyDoctor = async () => {
    let formData = new FormData();
    formData.append("firstName", name);
    formData.append("lastName", surname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("professionId", "1");
    formData.append("personalId", data?.id);
    formData.append("dateOfBirth", "2022-09-01");
    formData.append("gender", "m");
    formData.append("iban", "23232");
    formData.append("aboutMe", "23232");
    formData.append("pictureFile", pictureFile);

    return axios
      .put(
        `https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers/${data?.id}`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((response) => {
        console.log("this is response", response);
        refetch();
      })
      .catch((error) => {
        if (error.response) console.log(error.response);
        if (error.request) console.log(error.request);
        if (error.message) console.log(error.message);
      });
  };
  const { mutate: doctorUpdate } = useMutation(modifyDoctor);

  useEffect(() => {
    let numbers = data?.contactInfos.filter((e) => e?.type.value === "mobile");

    let emails = data?.contactInfos.filter((e) => e?.type.value === "mail");

    setPhone(numbers[0]?.value);
    setEmail(emails[0]?.value);
  }, [data]);

  return (
    <Modal onBackClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>Edit Doctor</div>
          <div className={styles.modalClose}>
            <ReactSVG
              src={"/images/icons/inputs/x.svg"}
              onClick={onClose}
              className={styles.close}
            />
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.photoChange}>
            <img
              src={pictureFile}
              alt="doctor"
              className={styles.doctorImage}
            />
            <input
              type="file"
              className={style.upload}
              id="upload"
              onChange={(e) => {
                // setPictureFile((prev) => ({
                //   ...prev,
                //   pictureFile: e.target.files[0],
                // }));
                // encodeImageFileAsURL(e.target, setPictureFile);
                console.log("sent img", e.target.files[0]);
                setPictureFile(e.target.files[0]);
              }}
            />{" "}
            <label className={style.upBtn} htmlFor="upload">
              Change
            </label>
          </div>
          <div className={styles.editRow}>
            <div className={styles.editColumn}>
              <Input
                label="Name"
                value={name}
                onChange={(value: string) => setName(value)}
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(value: string) => setPhone(value)}
              />
              <Select
                label="Job title"
                labelStyle="outside"
                options={[
                  { label: "Job title", value: "1" },
                  {
                    label: "Another Job title",
                    value: "2",
                  },
                ]}
                value={professionId}
                onChange={(value) => {
                  setProfessionId(value);
                }}
              />
            </div>
            <div className={styles.editColumn}>
              <Input
                label="Surname"
                value={surname}
                onChange={(value: string) => setSurname(value)}
              />
              <Input
                label="E-mail"
                value={email && email}
                onChange={(value: string) => setEmail(value)}
              />
              <div className={styles.whiteSpace} />
              <Button
                label="Save setting"
                size="large"
                variant="fill"
                width={"100%"}
                onClick={() => {
                  if (email.includes("@")) {
                    doctorUpdate();
                    onSave?.call(null, {
                      name,
                      surname,
                      email,
                      phone,
                      professionId,
                      pictureFile,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
