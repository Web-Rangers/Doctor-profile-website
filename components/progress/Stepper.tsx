import classNames from "classnames";
import React, { ReactElement } from "react";
import { ReactSVG } from "react-svg";
import styles from "styles/components/progress/Stepper.module.scss";

interface StepperProps {
    children?: React.ReactElement<StepProps>[];
    currentStep?: number;
    className?: string;
}

interface StepProps {
    title?: string;
    className?: string;
}


export const Step = ({ title, className }: StepProps) => {
    return <div className={classNames(styles.step, className)}>
        <div className={styles.tail}></div>
        <div className={styles.circle}>
            <ReactSVG className={styles.check} src="/images/icons/stepper/check.svg" />
        </div>
        <div className={styles.text}>{title}</div>
    </div>
}

export default function Stepper({ children, currentStep = 0, className }: StepperProps) {
    const configureSteps = (child: ReactElement<StepProps>, index) => {
        if (React.isValidElement(child)) {
            const newProps = {
                className: classNames(child.props.className, { [styles.complete]: currentStep > index, [styles.current]: currentStep === index })
            };
            return React.cloneElement(child, newProps);
        }
        return child;
    }

    const steps = React.Children.map(children, configureSteps);

    return (<div className={classNames(styles.stepper, className)}>
        {steps}
    </div>);
}
