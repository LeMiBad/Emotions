import b_ from "b_";
import cx from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

import "./NavLink.scss";

export const b = b_.with("nav-link");

interface NavLinkProps {
  to: string;
  className?: string;
}

export const NavLink: FC<NavLinkProps> = ({ to, className, children }) => {
  return (
    <Link className={cx(b(), className)} to={to}>
      {children}
    </Link>
  );
};
