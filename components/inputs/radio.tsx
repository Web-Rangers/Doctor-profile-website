import classNames from 'classnames';
import { useState } from 'react';
import styles from 'styles/components/Inputs/Radio.module.scss';

interface RadioProps {
    className?: string;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    name?: string;
    onChange?: (checked: boolean) => void;
    id?: string;
}

export default function Radio({
    className,
    label,
    id,
    defaultChecked,
    name,
}: RadioProps) {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <>
            <input
                id={id}
                type={'radio'}
                className={classNames([styles.radio, className])}
                name={name}
            />
            <label htmlFor={id} className={styles.radioLabel}>
                {label}
            </label>
        </>
    );
}
