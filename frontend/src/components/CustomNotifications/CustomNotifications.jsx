import { useDispatch, useSelector } from "react-redux";
import "./CustomNotifications.scss";
import { notifName, showNotification } from "../../store/slices/userSlice";
import { memo, useEffect } from "react";

const CustomNotifications = () => {
  const notificationName = useSelector(notifName);
   const status = useSelector(state => state.user.status);
  const dispatch = useDispatch();
  

    console.log("notificationName is", notificationName, status);


  useEffect(() => {
       if (notificationName  !== "") {
    const timer = setTimeout(() => {
      dispatch(showNotification(""));
    }, 4000);
    return () => clearTimeout(timer);
   }
  }, [notificationName, dispatch]);

  return (
    <>
      {
         status === "succeeded"  &&
        notificationName !== "" ? (
          <span className={"notif__wrapper"}>
            <p className="notif__wrapper__title">{notificationName}</p>
          </span>
        ) : (
          <></>
        )
        }
    </>
  );
}

export default CustomNotifications;
