import { Link } from "react-router-dom";
import "./SingUpPage.scss";
import { useReducer, useRef, useState } from "react";
import Userfront from "@userfront/core";
import CustomInput from "../../components/CustomInput/CustomInput";
import CloseEyeIcon from "../../components/CloseEyeIcon";
import OpenEyeIcon from "../../components/OpenEyeIcon";

export default function SingUpPage() {

/* for checkbox */
const [checked, checkedFunc] = useReducer(checked => !checked, false)
    // Sample: how to use Userfront.signup()
// Userfront.init("demo1234");
// Userfront.signup({
//   method: "password",
//   email: "jane@example.com",
//   password: "testmodepassword",
//   password_verify: "testmodepassword"
// });

let passwordRef = useRef();

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
let hell = document.getElementById("signupForm");
console.log(hell);
// const handleSubmit = (event) => {
//   event.preventDefault();
// let form = event.target;
// const passwordValue = form.singUp_password.value;
// console.log(passwordValue);
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
      // onSubmit={handleSubmit}
      >
        {/* <div id="alert"></div> */}

        <CustomInput inputId="singUp_email" placeholder="Введите эл. почту"
        inputType="email" labelName="Электронная почта" />

        <CustomInput inputType="password" labelName="Пароль" inputId="singUp_password" placeholder="Введите пароль"
        inputRef={passwordRef}
        // passwordValue={passwordValue}
        />
        
        <CustomInput inputType="password" labelName="Повторите пароль" inputId="singUp_passwordVerify" placeholder="Введите пароль ещё раз"
        inputRef={passwordRef}
        // passwordValue={passwordValue}
        />

        <span className="singup__section__body__checkboxWrapper">
        <input type="checkbox" className="singup__section__body__checkboxWrapper__checkbox" 
        onChange={checkedFunc}
        id="singUp_Checkbox"
       />
          <label
            htmlFor="singUp_Checkbox"
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
