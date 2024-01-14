import './LoginPage.scss';
// import useAuth from '../hooks/useAuth';
import { useState, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenEyeIcon from '../../components/OpenEyeIcon';
import CloseEyeIcon from '../../components/CloseEyeIcon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/userSlice';
import Logo from '../../components/Logo';

export default function LoginPage () {
    const navigate = useNavigate();
    const location = useLocation();

    const id = useSelector(state => state.user.UserId);

  console.log("ID from login page", id);



    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        /* чтобы форма не отправлялась */
        event.preventDefault();

        /* for local storage */
      if (checked) { 
        localStorage.setItem("username", LoginEmail);
        localStorage.setItem("password", LoginPassword);

        const username = localStorage.getItem("username");
           const password = localStorage.getItem("password");

        if (username && password) {
          
          console.log("Данные пользователя найдены:", username, password);
        } else console.log("Данные пользователя не найдены");
      }

        if (LoginEmail && LoginPassword && errorMessageEmail === "" && errorMessagePassword === "") {
          goToMainPage();
        }

        dispatch(loginUser({LoginEmail, LoginPassword}));
        console.log("DATA FROM LOGIN PAGE:", LoginEmail, LoginPassword)
    }
const goToMainPage = () => {
  navigate('/main');
}
    /*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [LoginEmail, setLoginEmail] = useState("");
const handleChangeEmail = (event) => {
  setLoginEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (LoginEmail.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    console.log("invalid email");
  };
}, [LoginEmail]);

/*for password input */
const [LoginPassword, setPassword] = useState("");
const [errorMessagePassword, setErrorMessagePassword] = useState("");
const handleChangePassword = (event) => {
  setPassword(event.target.value);
}
useEffect(() => {
  //сделать проверку на пароль, чтобы он совпадал с тем, 
  //который был записан при регистрации
  // if (LoginPassword !== LoginPassword) {
  //   setErrorMessagePassword("Введён неверный пароль!")
  // }

  //проверка на наличие пароля
  if (LoginPassword === "") {
    setErrorMessagePassword("Пароль не введён!")
  } else {
    setErrorMessagePassword("")
  }
}, [LoginPassword])
const [open, setOpen] = useState(true);
const [hidden, setHidden] = useState(true);
const selectIcon = () => {
    setOpen(!open);
    setHidden(!hidden);
}
/* for checkbox */
const [checked, checkedFunc] = useReducer(checked => !checked, false);

/*go to singup page */
const goToSingupPage = () => {
  navigate('/singup');
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
        <span className="singup__section__header">
          {
            windowWidth <= 768 ? <Logo newWidth="156" newHeight="59"/> :
            <Logo newWidth="220" newHeight="84"/>
          }
          
        <h2 className="singup__section__header__text">Вход в аккаунт</h2>
      </span>

      <form id="loginForm" className="singup__section__body" onSubmit={handleSubmit}>
          {/* email input */}
  <span className="input__wrapper">
      <label className="input__label" htmlFor="login_email">
      Электронная почта
        <input
          className="input__auth"
          type="email"
          id="login_email"
          name='login_email'
          placeholder="Введите электронную почту"
          value={LoginEmail}
          onChange={handleChangeEmail}
        />
      </label>

      <p className='input__error'>
                {errorMessageEmail}
            </p>
    </span>

    {/* password input */}
    <span className="input__wrapper2">
      <label className="input__label" htmlFor="login_password"></label>
      Пароль
       <span className="icon__wrapper">
        <input
          className="input__auth password"
          type={hidden ? "password" : "text"}
          id="login_password"
          name='login_password'
          onChange={handleChangePassword}
          placeholder="Введите пароль"
          value={LoginPassword}
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
                {errorMessagePassword}
            </p>
    </span>

    <span className='login__lineWrapper'>
    <span className="singup__section__body__checkboxWrapper login__wrapper gap">
        <input type="checkbox" 
        onChange={checkedFunc}
        id="login_checkbox"
        name="login_checkbox"
       />
          <label
            htmlFor="login_checkbox"
            className="singup__section__body__checkboxWrapper__label login__wrapper__label"
          >
            Запомнить меня
            </label>
        </span>

        <Link to="/forgot_password" className='login__lineWrapper__link'>
        Забыли пароль?
        </Link>
    </span>

{/* <button onClick={() => singOut(() => navigate('/', {replace: true}))} >
Logout
</button> */}
<span className='login__button'>
    <button type="submit" className="singup__section__body__submitBtn"
    onClick={handleSubmit}
    >
              Войти в аккаунт
            </button>
            <span className='login__button__container'>
            Ещё не авторизованы? <span className='login__lineWrapper__link boldLink' 
            onClick={goToSingupPage}
            > Зарегистрироваться</span>
            </span>
        </span>
</form>
      </div>

    )
}