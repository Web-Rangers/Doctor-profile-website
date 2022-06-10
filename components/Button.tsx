import styles from '../styles/components/Button.module.scss';
import classNames from 'classnames';

export interface ButtonProps {
    label?: string;
    variant?: 'fill' | 'outline' | 'text';
    rounded?: boolean;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    width?: string | number;
}

const Button = ({
    label,
    onClick = () => {},
    rounded = false,
    size = 'small',
    variant = 'fill',
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            className={classNames(styles.btn, styles[variant], styles[size], {
                [styles.rounded]: rounded,
            })}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
