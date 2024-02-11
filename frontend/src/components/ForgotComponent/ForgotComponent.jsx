import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './ForgotComponent.scss';
import Logo from "../../icons/Logo";
import { sendForgotEmail, setError, setMessage } from "../../store/slices/userSlice";

export default function ForgotComponent ({isLogo, title, text, input, buttonName}) {
    /*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [email, setEmail] = useState("");
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    console.log("invalid email");
  }

}, [email]);

let navigate = useNavigate();
const dispatch = useDispatch();
const getError = useSelector(state => state.user.error);
const getMessage = useSelector(state => state.user.message);

const nextPage = useCallback((() => {
  navigate('/forgot_password-success', {replace: true});
}), [navigate]);

const loginPage = () => {
    navigate('/login', {replace: true});
}

const [errEmail, setErrEmail] = useState("");

useEffect(() => {
  if (getError && getError === 101 && email !== "") {
    setErrorMessageEmail("Такого акканута еще нет!");
    setErrEmail(email);
  } 
}, [getError, dispatch, email, errEmail]);
useEffect(() => {
  if (errEmail && errEmail !== email) {
    console.log('AAAAAAA', errEmail, email, errEmail !== email)
    setErrorMessageEmail("");
    dispatch(setError(null));
  }
},[ dispatch, email, errEmail])
console.log("errEmail", errEmail);

useEffect(() => {
  if (getMessage === "successfull. See email") {
    nextPage();
    dispatch(setMessage(null));
  }
}, [dispatch, getMessage, nextPage, email]);

/* for submit button */
const sendEmail = (email) => {
  console.log(getError, getMessage, errorMessageEmail, email)
  if (errorMessageEmail === '' && email) {
    dispatch(sendForgotEmail({userEmail: email}));
  }
}

/* for small width to logo */
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

    return (
        <div className="singup__section">
      <span className="singup__section__header forgorPass">
      {
                isLogo ? 
                (
                  windowWidth <= 768 ? <Logo newWidth="156" newHeight="59"/> :
                  <Logo newWidth="220" newHeight="84"/>
                 ) : ""
            }
        
        <h2 className="singup__section__header__text">{title}</h2>

        <p className="forgorPass__text">
            {text}
        </p>
      </span>

      {
        input ? <>
        <div id="forgotPasswordForm" className="singup__section__body"
       //onSubmit={sendEmail(email)}
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
     onClick={() => sendEmail(email)}
        >
         {buttonName}
       </button>
      </div> 
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