import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { Check } from "../Icon/Check";
import { Error } from "../Icon/Error";

import classes from "./Notifications.module.scss";

export function SucessNotification(content: string) {
  toast.success(
    <div className={classes.NotificationContent}>
      <Check className={classes.NotificationIcon} /> {content}
    </div>,
    {
      className: classes.NotificationSuccess,
    }
  );
}

export function ErrorNotification(content: string) {
  toast.error(
    <div className={classes.NotificationContent}>
      <Error className={classes.NotificationIcon} /> {content}
    </div>,
    {
      className: classes.NotificationError,
    }
  );
}
