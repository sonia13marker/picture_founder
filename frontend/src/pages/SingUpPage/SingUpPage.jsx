import { Link } from "react-router-dom";
import "./SingUpPage.scss";
import { useState } from "react";
import Userfront from "@userfront/core";
import CustomInput from "../../components/CustomInput/CustomInput";
import CloseEyeIcon from "../../components/CloseEyeIcon";
import OpenEyeIcon from "../../components/OpenEyeIcon";

export default function SingUpPage() {
    const [checked, setChecked] = useState(false);
    const getTheChecked = () => {
        setChecked(!checked)
    }

    // Sample: how to use Userfront.signup()
Userfront.init("demo1234");
Userfront.signup({
  method: "password",
  email: "jane@example.com",
  password: "testmodepassword",
  password_verify: "testmodepassword"
});

// Userfront.signup()
// .catch(function(error) {
//   setAlert(error.message);
// });

// const setAlert = (error) => {
//   alert(error);
// }

// var password = password.value;
// var passwordVerify = passwordVerify.value;
// if (password !== passwordVerify) {
//   return setAlert("Password verification must match.");
// }
  return (
    <div className="singup__section">
      <span className="singup__section__header">
        <h1 className="singup__section__header__logo">
          Pic<span className="singup__section__header__logo__span">2</span>
        </h1>
        <h2 className="singup__section__header__text">Регистрация</h2>
      </span>

      <form id="signupForm" className="singup__section__body"
      autoComplete="off"
      >
        {/* <div id="alert"></div> */}

        <CustomInput inputId="singUp_email" placeholder="Введите эл. почту"
        inputType="email" labelName="Электронная почта" />
        {/*cursor: pointer */}
        <CloseEyeIcon />
        <OpenEyeIcon />

        {/* <label htmlFor="email" className="singup__section__body__label">
          Электронная почта
        
        <input
          type="email"
          id="singUp_email"
          placeholder="Введите эл. почту"
          className="singup__section__body__input"
        />
        </label> */}
        {/* 
  <label htmlFor="account-name">Account name (custom field)</label>
  <input type="text" id="account-name" /> */}

        <label htmlFor="password" className="singup__section__body__label">
          Пароль
        
        <input
          type="password"
          id="password"
          placeholder="Введите пароль"
          className="singup__section__body__input password_input"
        />
        </label>

        <label htmlFor="passwordVerify" className="singup__section__body__label">
          Повторите пароль
        
        <input
          type="password"
          id="passwordVerify"
          placeholder="Введите пароль ещё раз"
          className="singup__section__body__input password_input"
        />
        </label>
        <span className="singup__section__body__checkboxWrapper">
        <input type="checkbox" className="singup__section__body__checkboxWrapper__checkbox" 
        onClick={getTheChecked}
        id="inputCheckbox"
       />
          <label
            htmlFor="password-checkbox"
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
