import classNames from "classnames";
import { Button, Card, DatePicker, Input, Select } from "components";
import SideBarLayout from "layouts/SideBarLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useState } from "react";
import styles from "styles/pages/addDoctor.module.scss";
import pageStyles from "styles/pages/page.module.scss";

export default function addDoctor() {
  const [gender, setGender] = useState("");
  const [clinic, setClinic] = useState("");
  const [type, setType] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [branch, setBranch] = useState("");

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
              <Input label="Name" />
              <Input label="Surname" />
              <div className={styles.row}>
                <DatePicker 
                label="Date of burth"
                mode="single"
                className={styles.halfw}
                />
                <Select
                  label="Gender"
                  labelStyle="outside"
                  className={styles.halfw}
                  options={[
                    { label: "Male", value: "1" },
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
              </div>
            </div>
            <div className={styles.columnRight}>
              <span className={styles.label}>photo</span>
              <img
                src="/images/doctors/doctor.png"
                className={styles.doctorImage}
              />
              <Button label="Change" size="large" variant="fill" />
            </div>
          </div>
        </Card>
        <Card cardTitle="Contacts">
          <div className={styles.row}>
            <div className={styles.columnLeft}>
              <Input label="E-mail" />
              <Input label="Phone Number" />
            </div>
          </div>
        </Card>
        <Card cardTitle="Job information">
          <div className={styles.row}>
            <div className={styles.smallColumnLeft}>
              <Select
                label="Type"
                labelStyle="outside"
                options={[
                  { label: "freelancer", value: "1" },
                  { label: "Another type", value: "2" },
                ]}
                onChange={(value) => {
                  setType(value);
                }}
                value={type}
              />
              <Select
                label="Clinic"
                labelStyle="outside"
                options={[
                  { label: "Medical house", value: "1" },
                  { label: "Another clinic", value: "2" },
                ]}
                value={clinic}
                onChange={(value) => {
                  setClinic(value);
                }}
              />
              <Input label="ID" />
            </div>
            <div className={classNames(styles.columnRight, styles.inputColumn)}>
              <Select
                label="Job title"
                labelStyle="outside"
                options={[
                  { label: "Job title", value: "1" },
                  { label: "Another job title", value: "2" },
                ]}
                onChange={(value) => {
                  setJobTitle(value);
                }}
                value={jobTitle}
              />
              <Select
                label="Branch"
                labelStyle="outside"
                options={[
                  {
                    label: "4140 Parker Rd. Allentown, New Mexico 31134",
                    value: "1",
                  },
                  { label: "Another Branch", value: "2" },
                ]}
                onChange={(value) => {
                  setBranch(value);
                }}
                value={branch}
              />
              <Input label="IBAN" />
            </div>
          </div>
          <Input
            label="About me"
            type="text"
            multiline
            className={styles.aboutMe}
          />
        </Card>
        <div className={styles.buttons}>
          <Button label="Cancel" size="large" variant="outline" />
          <Button label="Add" size="large" variant="fill" />
        </div>
      </div>
    </div>
  );
}

addDoctor.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
