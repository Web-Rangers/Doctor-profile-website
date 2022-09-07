import {
  encodeImageFileAsURL,
  Input,
  Button,
  Modal,
  CheckBox,
  activeWorkingHours,
  getFirstStartEndHours,
  handleChange,
  dayz,
} from "components";
import { useState, useEffect } from "react";
import styles from "styles/components/Modals/ClinicModal.module.scss";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

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
  parentId: any;
  logoUrl?: string;
}

interface ClinicModalProps {
  onClose?: () => void;
  onSave?: (newData: ClinicData) => void;
  onCancel?: () => void;
  data: ClinicData;
  refetch?: () => void;
}

export default function ClinicModal({
  onClose,
  onSave,
  onCancel,
  data,
  refetch,
}: ClinicModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(data?.address.address);
  const [about, setAbout] = useState(data?.description);
  const [openWorkHours, setOpenWorkHours] = useState(false);
  const [workingHours, setWorkingHours] = useState([
    {
      days: 1,
      endHour: "",
      startHour: "",
      active: false,
    },
    {
      days: 2,
      endHour: "",
      startHour: "",
      active: false,
    },
    {
      days: 3,
      endHour: "",
      startHour: "",
      active: false,
    },
    {
      days: 4,
      endHour: "",
      startHour: "",
      active: false,
    },
    {
      days: 5,
      endHour: "",
      startHour: "",
      active: false,
    },
    {
      days: 6,
      endHour: "",
      startHour: "",
      active: false,
    },
    {
      days: 7,
      endHour: "",
      startHour: "",
      active: false,
    },
  ]);
  const [uploadPhoto, setUploadPhoto] = useState("");
  const [image, setImage] = useState<any>(
    `${data?.logoUrl + `&?${new Date().getTime()}`}`
  );

  const [registrationDate, setRegistrationDate] = useState(
    data?.registrationDate
  );

  const modifyClinic = async () => {
    let formData = new FormData();
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("description", about);
    formData.append("cityId", "80");
    formData.append("email", email);
    formData.append("pictureFile", image);

    for (let i = 0; i < workingHours.length; i++) {
      if (workingHours[i].startHour !== "" && workingHours[i].endHour !== "") {
        formData.append("days", workingHours[i].days.toString());
        formData.append("startHours", workingHours[i].startHour);
        formData.append("endHours", workingHours[i].endHour);
      }
    }

    caches.keys().then((list) => list.map((key) => caches.delete(key)));

    return axios
      .put(`/asclepius/v1/api/clinics/${data?.id}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        refetch();
        onSave?.call(null, {
          email,
          phone,
          address,
          registrationDate,
          about,
        });
      })
      .catch((err) => {
        alert(
          `გადაამოწმე working hourse, 00:00-23:59მდე შუალედში უნდა იყოს ყველა დრო. დანარჩენი ველები არ უნდა იყოს ცარიელი`
        );
      });
  };

  const { mutate: clinicUpdate } = useMutation(modifyClinic);

  useEffect(() => {
    let numbers = data?.contactInfos.filter((e) => e?.type.value === "mobile");

    let emails = data?.contactInfos.filter((e) => e?.type.value === "mail");

    setPhone(numbers[0]?.value);
    setEmail(emails[0]?.value);
  }, [data]);

  useEffect(() => {
    const newWorkingHours = workingHours?.map((item) => {
      const getCurrentDay = data?.workingHours.filter(
        (e) => e.dayId === item.days
      );
      if (getCurrentDay.length > 0) {
        return {
          ...item,
          startHour: getCurrentDay[0]?.startHour,
          endHour: getCurrentDay[0]?.endHour,
          active: true,
        };
      } else {
        return { ...item, active: false };
      }
    });

    setWorkingHours(newWorkingHours);
  }, [data, setWorkingHours]);

<<<<<<< HEAD
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
            <span className={styles.modalTitle}>Edit this clinic</span>
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
                <div className={classNames(styles.modalContentRow, styles.workingHours)}>
                    <h2>Working hours</h2>
                    <input 
                        type="text"
                        readOnly
                        className={styles.workingInp}
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
                    onClick={() =>
                        {
                            if(email.includes('@')){
                                clinicUpdate();
                            }else {
                                alert('write correct email')
=======
  return (
    <>
      {openWorkHours && (
        <>
          <div className={styles.workingHoursModal}>
            <h2>Work schedule</h2>
            <ReactSVG
              className={styles.closeWorkinBtn}
              onClick={() => setOpenWorkHours(false)}
              src="/images/icons/clinics/closeWorkingHours.svg"
            />
            {workingHours?.map((item, i) => {
              return (
                <>
                  <div className={styles.workingHoursInputs}>
                    <div className={styles.dayz}>
                      <CheckBox
                        id={dayz[i]}
                        label={dayz[i]}
                        className={styles.checkbox}
                        defaultChecked={item.active}
                        onChange={() => {
                          activeWorkingHours(i, workingHours, setWorkingHours);
                        }}
                      />
                    </div>
                    <div className={styles.workingActive}>
                      {workingHours[i].active ? (
                        <span>Open</span>
                      ) : (
                        <span>Close</span>
                      )}
                    </div>
                    <div className={styles.workingH}>
                      {workingHours[i].active ? (
                        <>
                          <Input
                            type="time"
                            className={styles.workingInput}
                            value={workingHours[i].startHour}
                            onChange={(e) =>
                              handleChange(
                                i,
                                e,
                                "startHour",
                                workingHours,
                                setWorkingHours
                              )
>>>>>>> 8c5cc4e (fixed add doctor and edit doctor)
                            }
                          />
                          <div className={styles.lineImg}>
                            <img src="/images/icons/clinics/line.svg" alt="" />
                          </div>
                          <Input
                            type="time"
                            className={styles.workingInput}
                            value={workingHours[i].endHour}
                            onChange={(e) =>
                              handleChange(
                                i,
                                e,
                                "endHour",
                                workingHours,
                                setWorkingHours
                              )
                            }
                          />
                        </>
                      ) : (
                        "Day off"
                      )}
                    </div>
                  </div>
                </>
              );
            })}

            <Button
              label="Save"
              className={styles.workingSaveBtn}
              onClick={() => setOpenWorkHours(false)}
            />
          </div>
        </>
      )}
      <Modal onBackClick={onClose} className={styles.modal}>
        <span className={styles.modalTitle}>Edit this clinic</span>
        <div className={styles.modalContent}>
          <div className={classNames(styles.modalContentRow, styles.center)}>
            <img
              className={classNames(styles.image)}
              src={uploadPhoto !== "" ? uploadPhoto : image}
              alt=""
            />
            <input
              className={styles.upInput}
              id="uploadPhoto"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                encodeImageFileAsURL(e.target, setUploadPhoto);
              }}
            />
            <label
              htmlFor="uploadPhoto"
              className={classNames(styles.upBtn, {
                [styles.upBtnH]: uploadPhoto !== "",
              })}
            ></label>
          </div>
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
          <div
            className={classNames(styles.modalContentRow, styles.workingHours)}
          >
            <Input
              type="text"
              label="Working hours"
              value={
                getFirstStartEndHours(workingHours)?.startHour &&
                getFirstStartEndHours(workingHours)?.startHour +
                  " - " +
                  getFirstStartEndHours(workingHours)?.endHour
              }
            />
            <ReactSVG
              className={styles.workingIcon}
              onClick={() => setOpenWorkHours(true)}
              src="/images/icons/inputs/clock.svg"
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
              } else {
                alert("write correct email");
              }
            }}
            size="large"
          />
        </div>
      </Modal>
    </>
  );
}
