import { useSelector } from "react-redux";
import "./CustomNotifications.scss";
import { notificationNmae } from "../../store/slices/userSlice";
import { useEffect } from "react";

export default function CustomNotifications() {
  const notificationName = useSelector(notificationNmae);

  console.log("notificationName is", notificationName);

  useEffect(() => {
    const timer = setTimeout(() => {
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {
        notificationName !== "" ? (
          <span className="notif__wrapper">
            <p className="notif__wrapper__title">{notificationName}</p>
          </span>
        ) : (
          <></>
        )
      }
    </>
  );
}
