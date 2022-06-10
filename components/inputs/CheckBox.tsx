import classNames from 'classnames';
import styles from 'styles/components/inputs/CheckBox.module.scss';

interface CheckBoxProps {
    className?: string;
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    id?: string;
}

export default function CheckBox({
    className,
    label,
    checked,
    onChange,
    id,
    ...props
}: CheckBoxProps) {
    return (
        <>
            <input
                id={id}
                type={'checkbox'}
                className={classNames([styles.checkBox, className])}
                checked={checked}
                onChange={() => onChange && onChange(!checked)}
            />
            <label htmlFor={id} className={styles.checkBoxLabel}>
                {label}
            </label>
        </>
    );
}
