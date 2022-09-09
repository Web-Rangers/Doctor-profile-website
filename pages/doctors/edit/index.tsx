import classNames from "classnames";
import { Button, Card, Input, Select, encodeImageFileAsURL } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useState, useEffect } from "react";
import styles from "styles/pages/addDoctor.module.scss";
import pageStyles from "styles/pages/page.module.scss";
import { useClinicsData } from "components/useClinicsData";
import axios from "axios";
import { ReactSVG } from "react-svg";
import StuffModal from "../../../components/modals/StuffModal";
import { getFreelancerDoctor } from "components/useDoctorsData";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

export default function EditDoctor() {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [uploadStaticPhoto, setUploadPhoto] = useState(``);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const id = router.query.id ?? null;

  var { data, refetch } = useQuery(["key", "doctorDetailed"], () => {
    return getFreelancerDoctor(id);
  });

  if (router.isReady) {
    refetch();
  }

  const [updateBody, setUpdateBody] = useState({
    firstName: data?.firstName,
    lastName: data?.lastName,
    phone: null,
    email: null,
    professionId: "1",
    personalId: data?.idNumber,
    gender: data?.gender,
    dateOfBirth: data?.dateOfBirth,
    iban: data?.iban,
    aboutMe: data?.aboutMe,
    clinicBranchIds: data?.clinicBranchIds,
    doctorType: data?.doctorType,
    branch: null,
    pictureFile: data?.pictureUrl,
  });

  useEffect(() => {
    data?.contactInfos.filter((e) =>
      e?.type.value === "mobile"
        ? setUpdateBody((prev) => ({ ...prev, phone: e.value }))
        : setUpdateBody((prev) => ({ ...prev, email: e.value }))
    );
  }, [data]);

  const [optionLists, setOptionLists] = useState({
    doctorType: [],
    job: [],
    clinic: [],
    branch: [],
  });

  const clinics = useClinicsData();

  console.log("update phone", updateBody?.phone);

  const makeListItems = (data) => {
    const list = data?.data?.map((item) => ({
      value: item.id,
      label: item.displayName,
    }));

    return list;
  };

  const requestFormData = () => {
    let formData = new FormData();

    for (const [key, value] of Object.entries(updateBody)) {
      formData.append(key, value);
    }

    return axios
      .put(
        updateBody.doctorType === "FREELANCER"
          ? `https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers/${id}`
          : `/asclepius/v1/api/clinics/${updateBody.clinicBranchIds}/doctors/${id}`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        router.push("/doctors");
      })
      .catch((error) =>
        setError((prev) => ({ ...prev, isError: true, errorMessage: error }))
      );
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.pageHeaderLeft}>
          <h3>Edit doctor</h3>
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
                value={updateBody?.firstName}
                onChange={(e) =>
                  setUpdateBody((prev) => ({ ...prev, firstName: e }))
                }
              />
              <Input
                label="Surname"
                value={updateBody?.lastName}
                onChange={(e) =>
                  setUpdateBody((prev) => ({ ...prev, lastName: e }))
                }
              />
              <div className={styles.row}>
                <Input
                  label="Date of birth"
                  type="date"
                  className={styles.halfw}
                  value={updateBody?.dateOfBirth}
                  onChange={(value) =>
                    setUpdateBody((prev) => ({ ...prev, dateOfBirth: value }))
                  }
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
                    setUpdateBody((prev) => ({ ...prev, gender: value }));
                  }}
                  value={updateBody?.gender}
                />
              </div>
            </div>
            <div className={styles.columnRight}>
              <span className={styles.label}>
                photo
                {isModalOpen && (
                  <StuffModal
                    onClose={() => setIsModalOpen(false)}
                    onAccept={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                  />
                )}
                {uploadStaticPhoto ? (
                  <ReactSVG
                    src="/images/icons/table/delete.svg"
                    className={styles.iconContainer}
                    onClick={() => setUploadPhoto("")}
                  />
                ) : null}
              </span>
              <img
                alt=""
                src={
                  updateBody?.pictureFile !== ""
                    ? uploadStaticPhoto || "/images/doctors/doctor.png"
                    : updateBody?.pictureFile
                }
                className={styles.doctorImage}
              />
              <input
                type="file"
                className={styles.upload}
                id="upload"
                onChange={(e) => {
                  setUpdateBody((prev) => ({
                    ...prev,
                    pictureFile: e.target.files[0],
                  }));
                  encodeImageFileAsURL(e.target, setUploadPhoto);
                }}
              />
              <label className={styles.upBtn} htmlFor="upload">
                Change photo
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
                value={updateBody?.email}
                onChange={(e) =>
                  setUpdateBody((prev) => ({ ...prev, email: e }))
                }
              />
              <Input
                type="number"
                label="Phone Number"
                value={updateBody?.phone}
                onChange={(e) =>
                  setUpdateBody((prev) => ({ ...prev, phone: e }))
                }
              />
            </div>
          </div>
        </Card>
        <Card cardTitle="Job information">
          <div className={styles.row}>
            <div className={styles.smallColumnLeft}>
              <Input
                label="Type"
                disabled={true}
                value={
                  updateBody?.doctorType === "FREELANCER"
                    ? "freelancer"
                    : "clinic doctor"
                }
              />
              <Select
                disabled={
                  updateBody?.doctorType === "FREELANCER" ? true : false
                }
                label="Clinic"
                labelStyle="outside"
                options={optionLists.clinic}
                value={updateBody?.clinicBranchIds}
                onChange={(value) => {
                  setUpdateBody((prev) => ({
                    ...prev,
                    clinicBranchIds: value,
                  }));
                }}
              />
              <Input
                label="ID"
                type="number"
                value={updateBody?.personalId}
                onChange={(value) =>
                  setUpdateBody((prev) => ({ ...prev, personalId: value }))
                }
              />
            </div>
            <div className={classNames(styles.columnRight, styles.inputColumn)}>
              <Select
                label="Job title"
                labelStyle="outside"
                options={optionLists.job}
                onChange={(value) => {
                  setUpdateBody((prev) => ({ ...prev, professionId: value }));
                }}
                value={updateBody?.professionId}
              />
              <Select
                disabled={
                  updateBody?.doctorType === "FREELANCER" ? true : false
                }
                label="Branch"
                labelStyle="outside"
                options={optionLists.branch}
                onChange={(value) => {
                  setUpdateBody((prev) => ({ ...prev, branch: value }));
                }}
                value={data?.branch}
              />
              <Input
                disabled={
                  updateBody?.doctorType === "FREELANCER" ? false : true
                }
                label="IBAN"
                value={updateBody?.iban}
                onChange={(value) => {
                  setUpdateBody((prev) => ({ ...prev, iban: value }));
                }}
              />
            </div>
          </div>
          <Input
            label="About me"
            type="text"
            multiline
            value={updateBody?.aboutMe}
            className={styles.aboutMe}
            onChange={(e) => setUpdateBody((prev) => ({ ...prev, aboutMe: e }))}
          />
        </Card>
        <div className={styles.buttons}>
          <Button
            label="Cancel"
            size="large"
            variant="outline"
            onClick={() => router.push("/doctors")}
          />
          <Button
            label="Save changes"
            size="large"
            variant="fill"
            onClick={() => requestFormData()}
          />
        </div>
      </div>
    </div>
  );
}

EditDoctor.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
