import { Link, useNavigate } from "react-router-dom";
import "./SingUpPage.scss";
import { useEffect, useState, useReducer } from "react";
// import "../../components/CustomInput/CustomInput.scss";
import OpenEyeIcon from "../../components/OpenEyeIcon";
import CloseEyeIcon from "../../components/CloseEyeIcon";
import { useDispatch, useSelector } from "react-redux";
import { createUser, createUserAction } from "../../store/slices/userSlice";
import Logo from "../../components/Logo";
import Loader from "../../components/Loader/Loader";

export default function SingUpPage() {

//const [checked, checkedFunc] = useReducer(checked => !checked, false);
const [checked, setChecked] = useState(false);

let navigate = useNavigate();
const nextPage = () => {
  navigate('/login', {replace: true});
}

/*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [SingupEmail, setEmail] = useState("");
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (SingupEmail.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    // console.log("invalid email");
  };
}, [SingupEmail]);

/*for first password input */
const [SingupPassword, setPasswordValue] = useState("");
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
const [SingUppasswordVerValue, setPasswordVerValue] = useState("");
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
  if (SingUppasswordVerValue !== SingupPassword) {
    setErrorVerMessage("Пароли не равны!");
  } else if (SingUppasswordVerValue === SingupPassword) {
    setErrorVerMessage("");
    // console.log("success singup");
  };
  if (SingupPassword.length < 8) {
    setErrorMessage("Минимальная длиная пароля - 8 символов!");
  } else setErrorMessage("");
}, [SingupPassword, SingUppasswordVerValue])
const [errorMessage, setErrorMessage] = useState("");
const [errorVerMessage, setErrorVerMessage] = useState("");


/* for submit button */
const dispatch = useDispatch();
const getError = useSelector(state => state.user.error);


console.log("getError", getError);
const handleSubmit = (event) => {
  event.preventDefault();

  if (checked === true && errorVerMessage === "" && errorMessage === "" && errorMessageEmail === "" && SingupPassword && SingUppasswordVerValue) {
     dispatch(createUser({SingupEmail, SingupPassword}));
    console.log("chto", getError !== 200, getError)
    if ((getError !== 200) && (getError === null)) {
      setErrorMessageEmail("Пользователь с этой почтой уже зарегистрирован!");
    } else {
      nextPage();

    }
  }

}

const checkTheButton = () => {
  setChecked(!checked);
  console.log("GET ERROR CHECKED", (getError !== 200) && (getError === null) && checked === true)

  // if ((getError !== 200) && (getError === null) && checked === true) {
  //   setChecked(false);
  // }
}

// useEffect(() => {
//   if ((getError !== 200) && (getError === null) && checked === true) {
//     setChecked(!checked);
//   }
// }, [checked, getError])

/* for small width to logo */
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

//----------------------------
//для отображения загрузки или контента

let content;
const currStatus = useSelector(state => state.user.status);

if (currStatus === "loading") {
  content = <Loader />
} else if (currStatus === 'succeeded' || currStatus === 'idle') {
  content = <>
  <div className="singup__section">
      <span className="singup__section__header">
      {
            windowWidth <= 768 ? <Logo newWidth="156" newHeight="59"/> :
            <Logo newWidth="220" newHeight="84"/>
          }
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
          name="singUp_email"
          placeholder="Введите эл. почту"
          value={SingupEmail}
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
          name="singUp_password"
          onChange={handleChangePassword}
          placeholder="Введите пароль"
          value={SingupPassword}
          required
          spellCheck="false"
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
          name="singUp_passwordVerify"
          onChange={handleChangeVerPassword}
          placeholder="Введите пароль ещё раз"
          value={SingUppasswordVerValue}
          required
          spellCheck="false"
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
        //onChange={checkedFunc}
        onClick={checkTheButton}
        //onClick={() => setChecked(!checked)}
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
  </>
}


  return (
    content
  );
}
