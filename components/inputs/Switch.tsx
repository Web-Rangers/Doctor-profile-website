import classNames from 'classnames';
import { useState } from 'react';
import styles from 'styles/components/inputs/Switch.module.scss';

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
    return (
        <div
            className={classNames(styles.switch, { [styles.acitve]: checked })}
            onClick={() => {
                onChange(!checked);
            }}
        >
            <div className={styles.circle} />
        </div>
    );
}
