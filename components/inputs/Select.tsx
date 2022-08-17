import classNames from "classnames";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "styles/components/Inputs/Select.module.scss";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  label: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  labelStyle?: "inside" | "outside";
}

export default function Select({
  options,
  onChange,
  label,
  value,
  className,
  labelStyle = "inside",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((option) => option.value === value)
  );

  useEffect(() => {
    setSelected(options.find((option) => option.value === value));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={classNames(styles.container, className)}>
      {labelStyle === "outside" && <div className={styles.label}><span>{label}</span></div>}
      <div className={classNames(styles.select)}>
        <div
          className={styles.body}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className={classNames(styles.label, {
              [styles.selectedLabel]: value,
            })}
          >
            <span>{selected?.label || (labelStyle === "inside" && label)}</span>
          </div>
          <ReactSVG
            src={"/images/icons/inputs/select.svg"}
            className={classNames(styles.arrow, { [styles.up]: isOpen })}
          />
        </div>
        <div
          className={classNames(styles.wrapper, { [styles.active]: isOpen })}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames(styles.option, {
                [styles.active]: option === selected,
              })}
              onClick={() => {
                onChange(option.value);
                setSelected(option);
                setIsOpen(!isOpen);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
