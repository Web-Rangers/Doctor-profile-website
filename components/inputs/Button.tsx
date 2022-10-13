import styles from 'styles/components/Inputs/Button.module.scss';
import classNames from 'classnames';

export interface ButtonProps {
    label?: string;
    variant?: 'fill' | 'outline' | 'text';
    rounded?: boolean;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
    selected?: boolean;
    disabled?: boolean;
    className?: string;
    width?: string | number;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({
    label,
    onClick = () => { },
    rounded = false,
    size = 'small',
    variant = 'fill',
    disabled = false,
    selected,
    className,
    icon,
    type = 'button'
}: ButtonProps) => {
    return (
        <button
            className={classNames(
                styles.btn,
                styles[variant],
                styles[size],
                {
                    [styles.rounded]: rounded,
                    [styles.selected]: selected,
                },
                className
            )}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {label}
            {icon}
        </button>
    );
};

export default Button;
