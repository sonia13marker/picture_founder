import './LoginPage.scss';
// import useAuth from '../hooks/useAuth';
import { useState, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenEyeIcon from '../../components/OpenEyeIcon';
import CloseEyeIcon from '../../components/CloseEyeIcon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/userSlice';

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
        localStorage.setItem("username", UserEmail);
        localStorage.setItem("password", UserPassword);

        const username = localStorage.getItem("username");
           const password = localStorage.getItem("password");

        if (username && password) {
          
          console.log("Данные пользователя найдены:", username, password);
        } else console.log("Данные пользователя не найдены");
      }

        if (UserEmail && UserPassword && errorMessageEmail === "" && errorMessagePassword === "") {
          goToMainPage();
        }

        dispatch(loginUser({UserEmail, UserPassword}));
        console.log("DATA FROM LOGIN PAGE:", UserEmail, UserPassword)
    }
const goToMainPage = () => {
  navigate('/main');
}
    /*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [UserEmail, setLoginEmail] = useState("");
const handleChangeEmail = (event) => {
  setLoginEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (UserEmail.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    console.log("invalid email");
  };
}, [UserEmail]);

/*for password input */
const [UserPassword, setPassword] = useState("");
const [errorMessagePassword, setErrorMessagePassword] = useState("");
const handleChangePassword = (event) => {
  setPassword(event.target.value);
}
useEffect(() => {
  //сделать проверку на пароль, чтобы он совпадал с тем, 
  //который был записан при регистрации
  // if (UserPassword !== UserPassword) {
  //   setErrorMessagePassword("Введён неверный пароль!")
  // }

  //проверка на наличие пароля
  if (UserPassword === "") {
    setErrorMessagePassword("Пароль не введён!")
  } else {
    setErrorMessagePassword("")
  }
}, [UserPassword])
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

    return (
      <div className="singup__section">
        <span className="singup__section__header">
        <h1 className="singup__section__header__logo">
          Pic<span className="singup__section__header__logo__span">2</span>
        </h1>
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
          placeholder="Введите электронную почту"
          value={UserEmail}
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
          onChange={handleChangePassword}
          placeholder="Введите пароль"
          value={UserPassword}
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