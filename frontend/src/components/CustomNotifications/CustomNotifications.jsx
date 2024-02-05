import { useSelector } from "react-redux";
import "./CustomNotifications.scss";
import { notifName } from "../../store/slices/userSlice";
import { memo, useEffect } from "react";

const CustomNotifications = () => {
  const notificationName = useSelector(notifName);
   const status = useSelector(state => state.user.status);

  

    console.log("notificationName is", notificationName, status);


  // useEffect(() => {
  //     if (status === "succeeded") {
  //   const timer = setTimeout(() => {
  //   }, 4000);
  //   return () => clearTimeout(timer);
  //  }
  // }, [status]);

  return (
    <>
      {
        // status === "succeeded"  &&
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
