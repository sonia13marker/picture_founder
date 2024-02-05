import "./PersonalAccountPage.scss";
import OpenEyeIcon from "../../icons/OpenEyeIcon";
import CloseEyeIcon from "../../icons/CloseEyeIcon";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModalComponent from "../../components/ConfirmModalComponent/ConfirmModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAboutUser, setAllUserData, setError, setStatus, setUserID, setUserToken, updatePasswordUser } from "../../store/slices/userSlice";
import { useCookies } from "react-cookie";
import { useCheckThePassword } from "../../hooks/useChechThePassword";
import { useNotification } from "../../hooks/useNotification";
import CustomNotifications from "../../components/CustomNotifications/CustomNotifications";

export default function PersonalAccountPage() {

  const dispatch = useDispatch();

  /* get info of current user */
  const allUserData = useSelector(state => state.user.allUserData);
  const userEmal = allUserData.userEmail;
  const imageCounter = allUserData.imageCount;
  const tagsCounter = allUserData.tagsCount;
  console.log("allUserData", allUserData);

  const userId = useSelector(state => state.user.UserId);
  const userToken = useSelector(state => state.user.userToken);
  const getError = useSelector(state => state.user.error);
  const message = useSelector(state => state.user.message);

  //вызов для использования кастомного хука
  const { showNotify } = useNotification();

  const [cookies2, setCookies2, removeCookie2] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, setCookies3, removeCookie3] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;
useMemo(() => {
  if (allUserData.length === 0) {
    dispatch(getInfoAboutUser({ userId: cookieId, userToken: cookieToken}));
    console.log("useMemo in PERSONAL ACC PAGE")
  }
}, [cookieId, cookieToken, dispatch])
  
  /*for password inputs */
  const [passwordAccValue, setPasswordValue] = useState("");
  const handleChangePassword = (event) => {
    setPasswordValue(event.target.value);
  };
  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState(true);
  const selectIcon = () => {
    setOpen(!open);
    setHidden(!hidden);
  };
  /*88888888888888888888888*/
  const [passwordVerValue, setPasswordVerValue] = useState("");
  const handleChangeVerPassword = (event) => {
    setPasswordVerValue(event.target.value);
  };
  const [isClose, setIsClose] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const selectIconTwo = () => {
    setIsClose(!isClose);
    setIsHidden(!isHidden);
  };
  //проверки паролей на 8 символов и соответствие между собой
  const { errorMessage, errorVerMessage, setErrorMessage } = useCheckThePassword({pass: passwordAccValue, passVerify: passwordVerValue});

  const [errPass, setErrPass] = useState("");
  //проверка на совпадение паролей
  useEffect(() => {
    if (getError && (getError === 200)) {
      setErrPass(passwordAccValue);
      setErrorMessage("Новый пароль не может совпадать со старым!");
    } 
  }, [getError, dispatch, setErrorMessage, passwordAccValue]);

  useEffect(() => {
    if (errPass && errPass !== passwordAccValue) {
      setErrorMessage("");
      dispatch(setError(null));
      setErrPass(null);
    }
  }, [dispatch, errPass, passwordAccValue, setErrorMessage])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errorMessage === "" &&
      errorVerMessage === "" &&
      passwordAccValue &&
      passwordVerValue
    ) {
      console.log("success NEW password ", passwordAccValue);
      console.log("success NEW verify password ", passwordVerValue);
      console.log("success change password");
      dispatch(updatePasswordUser({userId: cookieId, userToken: cookieToken, UserPassword: passwordAccValue}));
    }
    
    setChangePassModalActive(!changePassModalActive);
  };
  
//показ уведомления об успехе
  useEffect(() => {
    if (message === 'user password updated' && passwordAccValue !== errPass) {
      console.log("message", message)
      console.log("IM GAY2", errPass, "passwordAccValue", passwordAccValue);
      setErrPass(passwordAccValue);
      showNotify("Пароль успешно сменен");
    }
  }, [message, showNotify, errPass, passwordAccValue])

  const checkTheChangePassword =
    errorMessage !== "" ||
    errorVerMessage !== "" ||
    (passwordAccValue === "" && passwordVerValue === "");

  /* for confirm modals */
  const [changePassModalActive, setChangePassModalActive] = useState(false);
  const cancelChangePassModal = () => {
    setPasswordVerValue("");
    setPasswordValue("");
    setChangePassModalActive(!changePassModalActive);
  };

  const [logOutModalActive, setLogOutModalActive] = useState(false);
  const canselLogoutModal = () => {
    setLogOutModalActive(!logOutModalActive);
  };

  const id = useSelector(state => state.user.UserId);
  console.log("ID FROM PERSONAL ACC PAGE", id);

  // действие выхода из акка
  const navigate = useNavigate();
  const goToLogin = () => {
    if (userId !== null) {
      dispatch(setUserID(null));
    }
    if (userToken !== null) {
      dispatch(setUserToken(null));
    }
    dispatch(setStatus('idle'));
    dispatch(setAllUserData([]));
    //обнуление куки
    removeCookie2("token");
    removeCookie3("idFromLogin");
    navigate("/login", { replace: true });
  };


  return (
    <>
      <section className="account">
        <h2 className="account__title">Аккаунт</h2>
        <div className="account__wrapper">
          <section className="account__wrapper__leftSide">
            <h3 className="account__wrapper__leftSide__title">
              Персональная информация
            </h3>

            <span className="input__wrapper">
              <label className="input__label" htmlFor="personalAcc_email">
                Email аккаунта
                <input
                  className="input__auth"
                  type="email"
                  id="personalAcc_email"
                  name="personalAcc_email"
                  defaultValue={ userEmal || ""}
                  readOnly
                />
              </label>

              <p className="input__error">
                Внимание: email не подлежит изменению.
              </p>
            </span>

            <h4 className="account__wrapper__leftSide__text">
              Общее количество картинок:{" "}
              <span className="fontWeight">
                {imageCounter ? imageCounter : 0}
              </span>
            </h4>

            <h4 className="account__wrapper__leftSide__text">
              Общее количество тегов:{" "}
              <span className="fontWeight">
                {tagsCounter ? tagsCounter : 0}
              </span>
            </h4>
          </section>

          <section className="account__wrapper__rightSide">
            <h3 className="account__wrapper__leftSide__title">Смена пароля</h3>

            <div
              className="account__wrapper__rightSide__form"
              // onSubmit={handleSubmit}
            >
              {/* password input */}
              <span className="input__wrapper2">
                <label
                  className="input__label"
                  htmlFor="personalAcc_password"
                ></label>
                Новый пароль
                <span className="icon__wrapper">
                  <input
                    className="input__auth password"
                    type={hidden ? "password" : "text"}
                    id="personalAcc_password"
                    name="personalAcc_password"
                    autoComplete="new-password"
                    onChange={handleChangePassword}
                    placeholder="Введите новый пароль"
                    value={passwordAccValue}
                  />
                  {/*пока открыт глаз - пароль не видно */}
                  {open ? (
                    <span className="iconOpen" onClick={selectIcon}>
                      <OpenEyeIcon />
                    </span>
                  ) : (
                    <span className="iconClose" onClick={selectIcon}>
                      <CloseEyeIcon />
                    </span>
                  )}
                </span>
                <p className="input__error">{errorMessage}</p>
              </span>

              {/* REPEAT password input */}
              <span className="input__wrapper2">
                <label
                  className="input__label"
                  htmlFor="personalAcc_passwordVerify"
                ></label>
                Повторите новый пароль
                <span className="icon__wrapper">
                  <input
                    className="input__auth password"
                    type={isHidden ? "password" : "text"}
                    id="personalAcc_passwordVerify"
                    name="personalAcc_passwordVerify"
                    onChange={handleChangeVerPassword}
                    placeholder="Введите новый пароль ещё раз"
                    value={passwordVerValue}
                  />
                  {/*пока открыт глаз - пароль не видно */}
                  {isClose ? (
                    <span className="iconOpen" onClick={selectIconTwo}>
                      <OpenEyeIcon />
                    </span>
                  ) : (
                    <span className="iconClose" onClick={selectIconTwo}>
                      <CloseEyeIcon />
                    </span>
                  )}
                </span>
                <p className="input__error">{errorVerMessage}</p>
              </span>

              <button
                type="submit"
                className={
                  checkTheChangePassword
                    ? "singup__section__body__submitBtn unactive"
                    : "singup__section__body__submitBtn"
                }
                onClick={
                  checkTheChangePassword
                    ? null
                    : () => setChangePassModalActive(!changePassModalActive)
                }
              >
                Сохранить изменения
              </button>
            </div>
          </section>
        </div>
        <button
          className="account__wrapper__logoutBtn"
          onClick={() => setLogOutModalActive(!logOutModalActive)}
        >
          Выйти из аккаунта
        </button>
      </section>


      <ConfirmModalComponent
        confirmModalActive={changePassModalActive}
        setConfirmModalActive={setChangePassModalActive}
        nameOfModal="Смена пароля"
        bodyText="Вы уверены, что хотите сменить пароль?"
        leftBtnName="Отмена"
        rightBtnName="Да, сменить"
        leftBtnAction={cancelChangePassModal}
        //действие для смены пароля
      rightBtnAction={handleSubmit}
      />

      <ConfirmModalComponent
        confirmModalActive={logOutModalActive}
        setConfirmModalActive={setLogOutModalActive}
        nameOfModal="Выход из аккаунта"
        bodyText="Вы уверены, что хотите выйти?"
        leftBtnName="Отмена"
        rightBtnName="Да, выйти"
        leftBtnAction={canselLogoutModal}
        rightBtnAction={goToLogin}
      />

      <CustomNotifications />
    </>
  );
}
