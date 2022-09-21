import classNames from "classnames";
import styles from "styles/components/Cards/StuffCard.module.scss";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import Link from 'next/link';

interface stuffData {
  id?: any;
  icon?: string;
  name?: string;
  description?: string;
  rating?: number;
  clinic?: string;
  address?: string;
  city?: string;
  gender?: "Male" | "Female";
  registrationDate?: string;
  amountOfOrders?: number;
}

interface StuffCardProps {
  children?: React.ReactNode;
  className?: string;
  data: stuffData;
  onEdit?: () => void;
  onDelete?: () => void;
  id?: any;
  branchId?: any;
}

export default function StuffCard({
  children,
  className,
  data,
  onEdit,
  onDelete,
  id,
  branchId,
  ...props
}: StuffCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(data?.id, id)
  return (
    <div className={classNames([styles.cardBody, className])}>
      <div className={styles.cardActions}>
        <ReactSVG
          src="/images/icons/cards/more.svg"
          className={styles.iconContainer}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div
          className={styles.actionsList}
          style={isOpen ? { display: "block" } : {}}
        >
          <Link href={`/doctors/edit?clinic=${id}&doctor=${data?.id}`}>
            <div className={styles.actionItem} onClick={onEdit}>
              <ReactSVG
                src="/images/icons/cards/edit.svg"
                className={styles.iconContainer}
              />
              <span>Edit</span>
            </div>
          </Link>
          <div className={styles.actionItem} onClick={onDelete}>
            <ReactSVG
              src="/images/icons/cards/delete.svg"
              className={styles.iconContainer}
            />
            <span>Delete</span>
          </div>
        </div>
      </div>

      <div className={styles.presonalColumn}>
        <img alt="" src={data.icon} className={styles.icon} />
        <div className={styles.name}>{data.name}</div>
        <div className={styles.description}>{data.description}</div>
        {/* <div className={styles.clinicRating}>
          <StarRatings
            rating={data.rating}
            starRatedColor="#FFC14E"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="2.5px"
            className={styles.rating}
          ></StarRatings>
          <span className={styles.clinicRatingCount}>{data.rating}</span>
          <span className={styles.clinicRatingDelimiter}>/</span>
          <span className={styles.clinicRatingMax}>5</span>
        </div> */}
      </div>
      <div className={styles.cardDescription}>
        <div className={styles.datRow}>
          <div className={styles.datLabel}>Clinic</div>
          <div className={styles.datValue}>{data.clinic}</div>
          <div className={styles.datLabel}>Gender</div>
          <div className={styles.datValue}>{data.gender}</div>
        </div>
        <div className={styles.datRow}>
          <div className={styles.datLabel}>Address</div>
          <div className={styles.datValue}>{data.address}</div>
          <div className={styles.datLabel}>Registration date</div>
          <div className={styles.datValue}>{data.registrationDate}</div>
        </div>
        <div className={styles.datRow}>
          <div className={styles.datLabel}>City</div>
          <div className={styles.datValue}>{data.city}</div>
          <div className={styles.datLabel}>Amount of orders</div>
          <div className={styles.datValue}>{data.amountOfOrders}</div>
        </div>
      </div>
    </div>
  );
}
