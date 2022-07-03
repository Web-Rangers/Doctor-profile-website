import classNames from 'classnames';
import styles from 'styles/components/inputs/Input.module.scss';
import { ReactSVG } from 'react-svg';

interface daySchedule {
    isWorking: boolean;
    openTime?: string;
    closeTime?: string;
}

function scheduleToString(day: daySchedule) {
    return `${day.openTime} - ${day.closeTime}`;
}

interface Schedule {
    monday?: daySchedule;
    tuesday?: daySchedule;
    wednesday?: daySchedule;
    thursday?: daySchedule;
    friday?: daySchedule;
    saturday?: daySchedule;
    sunday?: daySchedule;
}

interface InputProps {
    className?: string;
    value?: Schedule;
    onChange?: (value: Schedule) => void;
    label?: string;
    style?: React.CSSProperties;
}

function getDisplayValue(value: Schedule) {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
        value;
    if (monday && monday.isWorking) return scheduleToString(monday);
    if (tuesday && tuesday.isWorking) return scheduleToString(monday);
    if (wednesday && wednesday.isWorking) return scheduleToString(monday);
    if (thursday && thursday.isWorking) return scheduleToString(monday);
    if (friday && friday.isWorking) return scheduleToString(monday);
    if (saturday && saturday.isWorking) return scheduleToString(monday);
    if (sunday && sunday.isWorking) return scheduleToString(monday);
    return '';
}

export default function Input({
    className,
    label,
    value,
    onChange,
    style,
    ...props
}: InputProps) {
    return (
        <div className={classNames([styles.inputContainer, className])}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.input}>
                <input value={getDisplayValue(value)} />
                <ReactSVG
                    src={'/images/icons/inputs/clock.svg'}
                    className={classNames(styles.iconContainer)}
                />
            </div>
        </div>
    );
}

const Modal = ({ onChange }) => {
    return <div className={styles.modal}></div>;
};
