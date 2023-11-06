import { Link, useNavigate } from "react-router-dom";
import "./SingUpPage.scss";
import { useEffect, useState } from "react";
// import "../../components/CustomInput/CustomInput.scss";
import OpenEyeIcon from "../../components/OpenEyeIcon";
import CloseEyeIcon from "../../components/CloseEyeIcon";

export default function SingUpPage() {

/* for checkbox 
мы используем функцию-редьюсер потому что она всегда
будет выдавать одни и те же результаты. это аналог 
испол-я функции useState, но более простой*/
// const [checked, checkedFunc] = useReducer(checked => !checked, false)
const [checked, setChecked] = useState(false);

const checkedFunc = () => {
  setChecked(!checked);
}
    // Sample: how to use Userfront.signup()
// Userfront.init("demo1234");
// Userfront.signup({
//   method: "password",
//   email: "jane@example.com",
//   password: "testmodepassword",
//   password_verify: "testmodepassword"
// });




// Userfront.signup()
// .catch(function(error) {
//   setAlert(error.message);
// });
let navigate = useNavigate();
const nextPage = () => {
  navigate('/', {replace: true});
}
/*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [email, setEmail] = useState("");
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[^s@]+@[^s@]+\.[a-zA-Z]{2,}$/;

  if (email.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    console.log("invalid email");
  };
}, [email]);

/*for first password input */
const [passwordValue, setPasswordValue] = useState("");
const handleChangePassword = (event) => {
  setPasswordValue(event.target.value);
}
const [open, setOpen] = useState(true);
const [hidden, setHidden] = useState(true);
const selectIcon = () => {
    setOpen(!open);
    setHidden(!hidden);
}

/*for secon password input - verify*/
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
  if (passwordVerValue !== passwordValue) {
    setErrorMessage("Пароли не равны!");
  } else if (passwordVerValue === passwordValue) {
    setErrorMessage("");
    console.log("success singup");
  }
}, [passwordValue, passwordVerValue])
const [errorMessage, setErrorMessage] = useState("");
/* for submit button */
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("success password ", passwordValue);
  console.log("success verify password ", passwordVerValue);

  if (checked === true) {
    nextPage();
  }
  /* сделать проверку на зарегистрированного пользователя,
  и если true, вывести ошибку "Пользователь с этой почтой уже зарегистрирован!" */

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
          value={email}
          onChange={handleChangeEmail}
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
          value={passwordValue}
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
                {errorMessage}
            </p>
    </span>

        <span className="singup__section__body__checkboxWrapper">
        <input type="checkbox" 
        // onChange={checkedFunc}
        onClick={checkedFunc}
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
