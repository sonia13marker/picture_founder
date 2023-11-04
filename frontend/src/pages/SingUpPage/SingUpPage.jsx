import { Link } from "react-router-dom";
import "./SingUpPage.scss";
import { useReducer, useRef, useState } from "react";
import Userfront from "@userfront/core";
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

/* useRef не подходит для считывания пароля из input type="text",
приходит такой результат в консоль: 
{current: input#singUp_password.input__auth.password} */
// let passwordRef = useRef();
// console.log(passwordRef);

// let passworVerifydRef = useRef();
// console.log(passworVerifydRef);

// if (passworVerifydRef !== passwordRef ) {
//   alert("Пароли не равны!")
// } else {
//   alert("ok")
// }

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


// let hell = document.getElementById("signupForm");
// console.log(hell);
// let passwordValue = hell?.singUp_password?.value;
// console.log(passwordValue);
const [passwordValue, setPasswordValue] = useState("");
let passwordRef = useRef();


const handleChangeForPassword = (event) => {
  const newPassVer = event.target.value.replace(/./g, "#");
  setPasswordValue(newPassVer);
}
const [passwordVerValue, setPasswordVerValue] = useState("");

const handleChangeForVerPassword = (event) => {
  const newPassVer = event.target.value.replace(/./g, "#");
 setPasswordVerValue(newPassVer);
 console.log(passwordVerValue);
}


const handleSubmit = (event) => {
  alert("sending password" + setPasswordValue);

  event.preventDefault();

  if(passwordVerValue !==  passwordValue) {
    alert("NOOOOO YOU WRONG")
  } else {
    alert("ok")
  }
  // let str = String(passwordRef);
  // event.preventDefault();
  // setPasswordValue(str);
// let form = event.target;
// const passwordValue = form?.singUp_password?.value;
// console.log(passwordValue);
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

        <CustomInput inputId="singUp_email" placeholder="Введите эл. почту"
        inputType="email" labelName="Электронная почта" />

        {/* <CustomInput inputType="password" labelName="Пароль" inputId="singUp_password" placeholder="Введите пароль"
        // value={value} onChange={handleChange}
        // inputRef={passwordRef}
        // passwordValue={passwordValue}
        /> */}
<label>
Введите пароль
</label>
        <input type="text" value={passwordValue} onChange={handleChangeForPassword}>

        </input>

        <label>
Введите пароль еще раз
</label>
        <input type="text" value={passwordVerValue} onChange={handleChangeForVerPassword}>

        </input>
        
        <CustomInput inputType="password" labelName="Повторите пароль" inputId="singUp_passwordVerify" placeholder="Введите пароль ещё раз"
        // inputRef={passworVerifydRef}
        // passwordValue={passwordValue}
        />

        <span className="singup__section__body__checkboxWrapper">
        <input type="checkbox" 
        // onChange={checkedFunc}
        onClick={checkedFunc}
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
