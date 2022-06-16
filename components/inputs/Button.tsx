import styles from 'styles/components/inputs/Button.module.scss';
import classNames from 'classnames';

export interface ButtonProps {
    label?: string;
    variant?: 'fill' | 'outline' | 'text';
    rounded?: boolean;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    className?: string;
    width?: string | number;
}

const Button = ({
    label,
    onClick = () => {},
    rounded = false,
    size = 'small',
    variant = 'fill',
    disabled = false,
    className
}: ButtonProps) => {
    return (
        <button
            className={classNames(styles.btn, styles[variant], styles[size], {
                [styles.rounded]: rounded,
            }, className)}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
