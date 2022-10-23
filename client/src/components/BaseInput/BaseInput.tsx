import b_ from "b_";
import cx from "classnames";

import "./BaseInput.scss";

export const b = b_.with("base-input");

interface BaseInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export const BaseInput = ({
  name,
  placeholder,
  value,
  className,
  onChange,
}: BaseInputProps) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      className={cx(b(), className)}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
