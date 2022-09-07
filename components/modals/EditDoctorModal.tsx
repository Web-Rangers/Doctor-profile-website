import { Input, Button, Modal, Select } from "components";
import { encodeImageFileAsURL } from "components";
import { useState, useEffect } from "react";
import styles from "styles/pages/doctors_detailed.module.scss";
import style from "styles/pages/addDoctor.module.scss";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ReactSVG } from "react-svg";

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
  idNumber?: string;
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

  const [uploadPhoto, setUploadPhoto] = useState("");
  const [pictureFile, setPictureFile] = useState<any>(
    `${data?.pictureUrl + `&?${new Date().getTime()}`}`
  );

  const modifyDoctor = async () => {
    let formData = new FormData();
    formData.append("firstName", name);
    formData.append("lastName", surname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("professionId", "3");
    formData.append("personalId", data?.idNumber);
    formData.append("dateOfBirth", data?.dateOfBirth);
    formData.append("gender", data?.gender);
    formData.append("iban", data?.iban);
    formData.append("aboutMe", data?.aboutMe);
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
      });
  };
  const { mutate: doctorUpdate } = useMutation(modifyDoctor);

  useEffect(() => {
    data?.contactInfos.filter((e) =>
      e?.type.value === "mobile" ? setPhone(e.value) : setEmail(e.value)
    );
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
              className={styles.doctorImage}
              src={uploadPhoto !== "" ? uploadPhoto : pictureFile}
              alt=""
            />
            <input
              className={style.upload}
              id="upload"
              type="file"
              onChange={(e) => {
                setPictureFile(e.target.files[0]);
                encodeImageFileAsURL(e.target, setUploadPhoto);
              }}
            />
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
