import styles from "styles/components/tabs/AboutDoctorTab.module.scss";
import { Card, Button } from "components";
import { ReactSVG } from "react-svg";

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
  return (
    <>
      <Card
        cardTitle="Info"
        cardActions={
          <EditAction icon="/images/icons/inputs/edit.svg" onClick={() => {}} />
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
            onClick={() => {}}
          />
        }
      >
        <div className={styles.mediaContainer}>
          {doctor.media?.map((media, index) => (
            <div key={index} className={styles.mediaItem}>
              <img src={media.src} alt={media.alt} />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
