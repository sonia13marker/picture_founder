import { useDispatch } from "react-redux";
import { showNotification } from "../store/slices/userSlice";

export const useNotification = () => {
  const dispatch = useDispatch();

  const showNotify = (name, time = 4) => {

  console.log("name of custom hook", name, "time of custom hook", time, "custom time", Number(time) * 1000);

  dispatch(showNotification(name));

  setTimeout(() => {
    dispatch(showNotification(""));
  }, Number(time) * 1000);
}
return { showNotify };
};
