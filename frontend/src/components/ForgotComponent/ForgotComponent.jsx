import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ForgotComponent.scss';

export default function ForgotComponent ({isLogo, title, text, input, buttonName}) {
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

let navigate = useNavigate();
const nextPage = () => {
  navigate('/forgot_password-success', {replace: true});
}
const loginPage = () => {
    navigate('/login', {replace: true});
}

/* for submit button */
const handleSubmit = (event) => {
    event.preventDefault();
    if (errorMessageEmail === "") {
      nextPage();
    }
}
    return (
        <div className="singup__section">
      <span className="singup__section__header forgorPass">
      {
                isLogo ? 
                <h1 className="singup__section__header__logo">
          Pic<span className="singup__section__header__logo__span">2</span>
        </h1> : ""
            }
        
        <h2 className="singup__section__header__text">{title}</h2>

        <p className="forgorPass__text">
            {text}
        </p>
      </span>

      {
        input ? <>
        <form id="forgotPasswordForm" className="singup__section__body"
      onSubmit={handleSubmit}
      >
                {/* email input */}
  <span className="input__wrapper">
      <label className="input__label" htmlFor="forgotPassword_email">
      Электронная почта
        <input
          className="input__auth"
          type="email"
          id="forgotPassword_email"
          placeholder="Введите эл. почту"
          value={email}
          onChange={handleChangeEmail}
        />
      </label>

      <p className='input__error'>
                {errorMessageEmail}
            </p>
    </span>
    <button type="submit" className={"singup__section__body__submitBtn"}
        >
         {buttonName}
       </button>
      </form> 
        </> :
        <button className={"singup__section__body__submitBtn"}
        onClick={loginPage}
        >
         {buttonName}
       </button>
      }

      </div>
    )
}