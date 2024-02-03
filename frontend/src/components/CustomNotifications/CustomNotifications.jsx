import { useSelector } from "react-redux";
import "./CustomNotifications.scss";
import { notifName } from "../../store/slices/userSlice";
import { memo, useEffect } from "react";

const CustomNotifications = () => {
  const notificationName = useSelector(notifName);

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

export default memo(CustomNotifications);
