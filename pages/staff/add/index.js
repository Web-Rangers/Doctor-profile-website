import { useState } from "react";
import SideBarLayout from "layouts/SideBarLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import {
  Card,
  Input,
  DatePicker,
  Select,
  Button,
  AddCardModal,
} from "components";
import Radio from "components/inputs/radio";
import styles from "styles/pages/addStuff.module.scss";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

export default function AddStaff() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <AddCardModal
          onCancel={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          onSave={() => setModalOpen(false)}
        />
      )}
      <div className={styles.addStuffContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.headerTitle}>
            <h2>Add staff</h2>
          </div>
          <div className={styles.headerBreadcrumbs}>
            <Breadcrumbs
              omitRootLabel={true}
              listClassName={styles.breadcrumbs}
              replaceCharacterList={[{ from: "_", to: " " }]}
            />
          </div>
        </div>

        <Card cardTitle="General information">
          <Input
            label="Name"
            className={styles.stuffInput}
            placeholder="Enter name..."
          />
          <Input
            label="Surname"
            className={styles.stuffInput}
            placeholder="Enter surmane..."
          />
          <DatePicker
            label="Date of birth"
            mode="single"
            className={styles.stuffInput}
          />
          <div className={classNames(styles.stuffInput, styles.radio)}>
            <div className={styles.genderLabel}>Gender</div>
            <div className={styles.radioOptions}>
              <Radio name="gender" label="Male" id="male" />
              <Radio name="gender" label="Female" id="female" />
            </div>
          </div>
        </Card>
        <Card cardTitle="Contacts">
          <Input
            label="E-mail"
            className={styles.stuffInput}
            placeholder="Enter email..."
          />
          <Input
            label="Phone Number"
            className={styles.stuffInput}
            placeholder="Enter phone number..."
          />
        </Card>
        <Card
          cardTitle="Additional Information"
          className={styles.additionalInfo}
          cardActions={
            <Button
              label="Patient card"
              size="large"
              variant="fill"
              className={styles.cardBtn}
              onClick={() => setModalOpen(true)}
            />
          }
        >
          <Input
            label="Staff Id"
            className={styles.stuffInput}
            placeholder="Staff id..."
          />
          <Input
            label="Personal number"
            className={styles.stuffInput}
            placeholder="Personal number..."
          />
          <Select
            label="Card type"
            labelStyle="outside"
            className={styles.stuffInput}
            onChange={() => {}}
            options={[]}
          />
          <Select
            label="Status"
            labelStyle="outside"
            className={styles.stuffInput}
            onChange={() => {}}
            options={[]}
          />
        </Card>
        <div className={styles.addStaffBtns}>
          <Button label="Cancel" size="large" variant="outline" />
          <Button label="Save" size="large" variant="fill" />
        </div>
      </div>
    </>
  );
}

AddStaff.getLayout = (page) => {
  return <SideBarLayout>{page}</SideBarLayout>;
};
