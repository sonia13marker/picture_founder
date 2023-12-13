import { Link, useNavigate } from "react-router-dom";
import "./SingUpPage.scss";
import { useEffect, useState, useReducer } from "react";
// import "../../components/CustomInput/CustomInput.scss";
import OpenEyeIcon from "../../components/OpenEyeIcon";
import CloseEyeIcon from "../../components/CloseEyeIcon";
import { useDispatch, useSelector } from "react-redux";
import { createUser, createUserAction } from "../../store/slices/userSlice";

export default function SingUpPage() {

const [checked, checkedFunc] = useReducer(checked => !checked, false);

let navigate = useNavigate();
const nextPage = () => {
  navigate('/login', {replace: true});
}

/*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [UserEmail, setEmail] = useState("");
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (UserEmail.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    // console.log("invalid email");
  };
}, [UserEmail]);

/*for first password input */
const [UserPassword, setPasswordValue] = useState("");
const handleChangePassword = (event) => {
  setPasswordValue(event.target.value);
}
const [open, setOpen] = useState(true);
const [hidden, setHidden] = useState(true);
const selectIcon = () => {
    setOpen(!open);
    setHidden(!hidden);
}

/*for second password input - verify*/
const [passwordVerValue, setPasswordVerValue] = useState("");
const handleChangeVerPassword = (event) => {
  setPasswordVerValue(event.target.value);
}
const [isClose, setIsClose] = useState(true);
const [isHidden, setIsHidden] = useState(true);
const selectIconTwo = () => {
  setIsClose(!isClose);
  setIsHidden(!isHidden);
}
useEffect(() => {
  if (passwordVerValue !== UserPassword) {
    setErrorVerMessage("Пароли не равны!");
  } else if (passwordVerValue === UserPassword) {
    setErrorVerMessage("");
    // console.log("success singup");
  };
  if (UserPassword.length < 8) {
    setErrorMessage("Минимальная длиная пароля - 8 символов!");
  } else setErrorMessage("");
}, [UserPassword, passwordVerValue])
const [errorMessage, setErrorMessage] = useState("");
const [errorVerMessage, setErrorVerMessage] = useState("");


/* for submit button */
const dispatch = useDispatch();
//const currentUser = useSelector(state => state.user.currentUser);

const getError = useSelector(state => state.user.error);
console.log("getError", getError);

const handleSubmit = (event) => {
  event.preventDefault();


  if (checked === true && errorVerMessage === "" && errorMessage === "" && errorMessageEmail === "" && UserPassword && passwordVerValue) {
    dispatch(createUser({UserEmail, UserPassword}));

    if (getError !== null) {
      setErrorMessageEmail("Пользователь с этой почтой уже зарегистрирован!");
    } else {
      nextPage();
    }
  }

}
  return (
    <div className="singup__section">
      <span className="singup__section__header">
        <h1 className="singup__section__header__logo">
          Pic<span className="singup__section__header__logo__span">2</span>
        </h1>
        <h2 className="singup__section__header__text">Регистрация</h2>
      </span>

      <form id="signupForm" className="singup__section__body"
      // autoComplete="off"
      onSubmit={handleSubmit}
      >
  {/* email input */}
  <span className="input__wrapper">
      <label className="input__label" htmlFor="singUp_email">
      Электронная почта
        <input
          className="input__auth"
          type="email"
          id="singUp_email"
          placeholder="Введите эл. почту"
          value={UserEmail}
          onChange={handleChangeEmail}
          required
        />
      </label>

      <p className='input__error'>
                {errorMessageEmail}
            </p>
    </span>

  {/* password input */}
                    <span className="input__wrapper2">
      <label className="input__label" htmlFor="singUp_password"></label>
      Пароль
       <span className="icon__wrapper">
        <input
          className="input__auth password"
          type={hidden ? "password" : "text"}
          id="singUp_password"
          onChange={handleChangePassword}
          placeholder="Введите пароль"
          value={UserPassword}
          required
        />
        {/*пока открыт глаз - пароль не видно */}
       {
        open ?
        (
        <span className="iconOpen" onClick={selectIcon}>
            <OpenEyeIcon />
        </span>) :
        (
            <span className="iconClose" onClick={selectIcon}>
                <CloseEyeIcon />
            </span> 
        )
       }
        </span>
        <p className='input__error'>
                {errorMessage}
            </p>
    </span>
  {/* REPEAT password input */}      
            <span className="input__wrapper2">
      <label className="input__label" htmlFor="singUp_passwordVerify"></label>
      Повторите пароль
       <span className="icon__wrapper">
        <input
          className="input__auth password"
          type={isHidden ? "password" : "text"}
          id="singUp_passwordVerify"
          onChange={handleChangeVerPassword}
          placeholder="Введите пароль ещё раз"
          value={passwordVerValue}
          required
        />
        {/*пока открыт глаз - пароль не видно */}
       {
        isClose ?
        (
        <span className="iconOpen" onClick={selectIconTwo}>
            <OpenEyeIcon />
        </span>) :
        (
            <span className="iconClose" onClick={selectIconTwo}>
                <CloseEyeIcon />
            </span> 
        )
       }
        </span>
            <p className='input__error'>
                {errorVerMessage}
            </p>
    </span>

        <span className="singup__section__body__checkboxWrapper">
        <input type="checkbox" 
        onChange={checkedFunc}
        id="singUp_checkbox"
       />
          <label
            htmlFor="singUp_checkbox"
            className="singup__section__body__checkboxWrapper__label"
          >
            Я ознакомлен и согласен с условиями обработки моих персональных
            данных и <Link to="#" className="singup__section__body__checkboxWrapper__label__link">Политикой конфиденциальности</Link>.
            </label>
        </span>

        <button type="submit" className={checked ? "singup__section__body__submitBtn" : "singup__section__body__submitBtn unactive"}
         >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
