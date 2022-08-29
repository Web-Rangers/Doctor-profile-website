import classNames from "classnames";
import {
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  encodeImageFileAsURL,
} from "components";
import { request } from "https";
import SideBarLayout from "layouts/SideBarLayout";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import Image from "next/image";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useState, useEffect } from "react";
import styles from "styles/pages/addDoctor.module.scss";
import pageStyles from "styles/pages/page.module.scss";
import { useClinicsData } from "components/useClinicsData";
import axios from "axios";

export default function AddDoctor() {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const [uploadStaticPhoto, setUploadPhoto] = useState(``);

  const [requestBody, setRequestBody] = useState({
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    professionId: null,
    personalId: null,
    gender: null,
    dateOfBirth: null,
    iban: null,
    aboutMe: null,
    clinicBranchIds: null,
    type: null,
    branch: null,
  });

  const [optionLists, setOptionLists] = useState({
    type: [],
    job: [],
    clinic: [],
    branch: [],
  });

  const clinics = useClinicsData();

  const makeListItems = (data) => {
    const list = data?.data?.map((item) => ({
      value: item.id,
      label: item.displayName,
    }));

    return list;
  };

  const requestFormData = () => {
    let formData = new FormData();

    for (const [key, value] of Object.entries(requestBody)) {
      formData.append(key, value);
      console.log(key, value);
    }

    return axios
      .post(
        `/asclepius/v1/api/clinics/${requestBody.clinicBranchIds}/doctors`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) =>
        setError((prev) => ({ ...prev, isError: true, errorMessage: error }))
      );
  };

  useEffect(() => {
    setOptionLists((prev) => ({
      ...prev,
      type: [
        { label: "freelancer", value: "FREELANCER" },
        { label: "Clinic doctor", value: "CLINIC_DOCTOR" },
      ],
      clinic: clinics?.data ? makeListItems(clinics) : [],
      branch: [
        {
          label: "4140 Parker Rd. Allentown, New Mexico 31134",
          value: "1",
        },
        { label: "Another Branch", value: "2" },
      ],
      job: [
        { label: "Job title", value: "1" },
        { label: "Another job title", value: "2" },
      ],
    }));
  }, [clinics?.isLoading]);

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.pageHeaderLeft}>
          <h3>New doctor</h3>
        </div>
        <Breadcrumbs
          omitRootLabel={true}
          listClassName={pageStyles.breadcrumbs}
          replaceCharacterList={[{ from: "_", to: " " }]}
        />
      </div>
      <div className={pageStyles.pageBody}>
        <Card cardTitle="General information">
          <div className={styles.row}>
            <div className={styles.columnLeft}>
              <Input
                label="Name"
                onChange={(e) =>
                  setRequestBody((prev) => ({ ...prev, firstName: e }))
                }
              />
              <Input
                label="Surname"
                onChange={(e) =>
                  setRequestBody((prev) => ({ ...prev, lastName: e }))
                }
              />
              <div className={styles.row}>
                <DatePicker
                  label="Date of burth"
                  mode="single"
                  className={styles.halfw}
                  onChange={(value) =>
                    setRequestBody((prev) => ({ ...prev, dateOfBirth: value }))
                  }
                  value={requestBody.dateOfBirth}
                />
                <Select
                  label="Gender"
                  labelStyle="outside"
                  className={styles.halfw}
                  options={[
                    { label: "Male", value: "m" },
                    {
                      label: "Female",
                      value: "f",
                    },
                  ]}
                  onChange={(value) => {
                    setRequestBody((prev) => ({ ...prev, gender: value }));
                  }}
                  value={requestBody.gender}
                />
              </div>
            </div>
            <div className={styles.columnRight}>
              <span className={styles.label}>photo</span>
              <img
                alt=""
                src={
                  uploadStaticPhoto !== ""
                    ? uploadStaticPhoto
                    : "/images/doctors/doctor.png"
                }
                className={styles.doctorImage}
              />
              <input
                type="file"
                className={styles.upload}
                id="upload"
                onChange={(e) => {
                  setRequestBody((prev) => ({
                    ...prev,
                    pictureFile: e.target.files[0],
                  }));
                  encodeImageFileAsURL(e.target, setUploadPhoto);
                }}
              />
              <label className={styles.upBtn} htmlFor="upload">
                upload
              </label>
            </div>
          </div>
        </Card>
        <Card cardTitle="Contacts">
          <div className={styles.row}>
            <div className={styles.columnLeft}>
              <Input
                label="E-mail"
                type="email"
                onChange={(e) =>
                  setRequestBody((prev) => ({ ...prev, email: e }))
                }
              />
              <Input
                type="number"
                label="Phone Number"
                onChange={(e) =>
                  setRequestBody((prev) => ({ ...prev, phone: e }))
                }
              />
            </div>
          </div>
        </Card>
        <Card cardTitle="Job information">
          <div className={styles.row}>
            <div className={styles.smallColumnLeft}>
              <Select
                label="Type"
                labelStyle="outside"
                options={optionLists.type}
                onChange={(value) => {
                  setRequestBody((prev) => ({ ...prev, type: value }));
                }}
                value={requestBody.type}
              />
              <Select
                label="Clinic"
                labelStyle="outside"
                options={optionLists.clinic}
                value={requestBody.clinicBranchIds}
                onChange={(value) => {
                  setRequestBody((prev) => ({
                    ...prev,
                    clinicBranchIds: value,
                  }));
                }}
              />
              <Input
                label="ID"
                type="number"
                onChange={(value) =>
                  setRequestBody((prev) => ({ ...prev, personalId: value }))
                }
              />
            </div>
            <div className={classNames(styles.columnRight, styles.inputColumn)}>
              <Select
                label="Job title"
                labelStyle="outside"
                options={optionLists.job}
                onChange={(value) => {
                  setRequestBody((prev) => ({ ...prev, professionId: value }));
                }}
                value={requestBody.professionId}
              />
              <Select
                label="Branch"
                labelStyle="outside"
                options={optionLists.branch}
                onChange={(value) => {
                  setRequestBody((prev) => ({ ...prev, branch: value }));
                }}
                value={requestBody.branch}
              />
              <Input
                label="IBAN"
                onChange={(value) => {
                  setRequestBody((prev) => ({ ...prev, iban: value }));
                }}
              />
            </div>
          </div>
          <Input
            label="About me"
            type="text"
            multiline
            className={styles.aboutMe}
            onChange={(e) =>
              setRequestBody((prev) => ({ ...prev, aboutMe: e }))
            }
          />
        </Card>
        <div className={styles.buttons}>
          <Button label="Cancel" size="large" variant="outline" />
          <Button
            label="Add"
            size="large"
            variant="fill"
            onClick={() => requestFormData()}
          />
        </div>
      </div>
    </div>
  );
}

AddDoctor.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
