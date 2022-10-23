import b_ from "b_";
import { FC } from "react";
import cx from "classnames";

import "./BaseButton.scss";

export const b = b_.with("base-button");

interface BaseButtonProps {
  onClick?: () => void;
  className?: string;
}

export const BaseButton: FC<BaseButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button className={cx(b(), className)} onClick={onClick}>
      {children}
    </button>
  );
};
