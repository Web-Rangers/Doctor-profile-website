import classNames from 'classnames';
import { useState } from 'react';
import styles from 'styles/components/Inputs/CheckBox.module.scss';

interface CheckBoxProps {
    className?: string;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    id?: string;
}

export default function CheckBox({
    className,
    label,
    checked,
    onChange,
    id,
    defaultChecked,
    ...props
}: CheckBoxProps) {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <>
            <input
                id={id}
                type={'checkbox'}
                className={classNames([styles.checkBox, className])}
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={() => onChange && onChange(!checked)}
            />
            <label htmlFor={id} className={styles.checkBoxLabel}>
                {label}
            </label>
        </>
    );
}
