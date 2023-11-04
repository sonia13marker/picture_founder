import { Link } from "react-router-dom";
import "./SingUpPage.scss";
import { useReducer, useRef, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";

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

const [passwordValue, setPasswordValue] = useState("");
const handleChangePassword = (event) => {
  setPasswordValue(event.target.value);
  console.log(passwordValue);
}

const [passwordVerValue, setPasswordVerValue] = useState("");
const handleChangeVerPassword = (event) => {
  setPasswordVerValue(event.target.value);
  console.log(passwordVerValue);
}

const handleSubmit = (event) => {

  console.log(passwordValue);
  console.log(passwordVerValue);

  event.preventDefault();

  if(passwordVerValue !==  passwordValue) {
    alert("NOOOOO YOU ARE WRONG")
  } else {
    alert("ok")
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
        <CustomInput inputId="singUp_email" placeholder="Введите эл. почту"
        inputType="email" labelName="Электронная почта" />
  {/* password input */}
        <CustomInput inputType="password" labelName="Пароль" inputId="singUp_password" placeholder="Введите пароль"
        value={passwordValue} onChange={handleChangePassword}
        />  
  {/* repeat password input */}      
        <CustomInput inputType="password" labelName="Повторите пароль" inputId="singUp_passwordVerify" placeholder="Введите пароль ещё раз"
        value={passwordVerValue}
        onChange={handleChangeVerPassword}
        />

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
