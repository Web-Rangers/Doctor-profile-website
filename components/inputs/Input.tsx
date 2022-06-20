import classNames from 'classnames';
import styles from 'styles/components/inputs/Input.module.scss';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

interface InputProps {
    children?: React.ReactNode;
    className?: string;
    type?: 'text' | 'time' | 'email' | 'date' | 'password';
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    multiline?: boolean;
    placeholder?: string;
}

export default function Input({
    children,
    className,
    label,
    value,
    placeholder,
    type,
    multiline,
    onChange,
    ...props
}: InputProps) {
    if (type === 'text' && multiline) {
        return (
            <div className={classNames([styles.inputContainer, className])}>
                {label && <span className={styles.label}>{label}</span>}
                <div className={styles.input}>
                    <textarea
                        value={value}
                        placeholder={placeholder}
                        onChange={(event) =>
                            onchange?.call(null, event.target.value)
                        }
                    />
                </div>
            </div>
        );
    }
    return (
        <div className={classNames([styles.inputContainer, className])}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.input}>
                <input
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    onChange={(event) =>
                        onChange?.call(null, event.target.value)
                    }
                />
                {type === 'time' && (
                    <ReactSVG
                        src={'/images/icons/inputs/clock.svg'}
                        className={classNames(styles.iconContainer)}
                    />
                )}
                {type === 'password' && (
                    <ReactSVG
                        src={'/images/icons/inputs/eye-off.svg'}
                        className={classNames(styles.iconContainer)}
                    />
                )}
            </div>
        </div>
    );
}
