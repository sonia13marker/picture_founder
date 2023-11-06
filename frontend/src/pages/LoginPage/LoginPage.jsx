import './LoginPage.scss';
// import useAuth from '../hooks/useAuth';
import { useState, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import OpenEyeIcon from '../../components/OpenEyeIcon';
import CloseEyeIcon from '../../components/CloseEyeIcon';
import { Link } from 'react-router-dom';

export default function LoginPage () {
  /*replace: true не оставляет возможности вернуться назад */
    // const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {singIn} = useAuth();

    /* проверка пути, откуда пришел пользователь на стр логина. 
    тут идет проверка на передачу у location стейта, у которого 
    должны присутствовать след. значения. 
    если их нет, передаем, что юзер пришел с главной страницы.*/
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        /* чтобы форма не отправлялась */
        event.preventDefault();

        /* получаем форму */
        const form = event.target;
        /* проверка что там не пусто ?.*/
        const user = form.username.value;

        singIn(user, () => navigate(from, { replace: true }));
    }

    /*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [loginEmail, setLoginEmail] = useState("");
const handleChangeEmail = (event) => {
  setLoginEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[^s@]+@[^s@]+\.[a-zA-Z]{2,}$/;

  if (loginEmail.match(emailRegex)) {
    setErrorMessageEmail("");
  } else {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    console.log("invalid email");
  };
}, [loginEmail]);

/*for password input */
const [password, setPassword] = useState("");
const handleChangePassword = (event) => {
  setPassword(event.target.value);
}
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
      <label className="input__label" htmlFor="singUp_email">
      Электронная почта
        <input
          className="input__auth"
          type="email"
          id="singUp_email"
          placeholder="Введите электронную почту"
          value={loginEmail}
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
          value={password}
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

    <span className='login__lineWrapper'>
    <span className="singup__section__body__checkboxWrapper login__wrapper">
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

        <Link to="#" className='login__lineWrapper__link'>
        Забыли пароль?
        </Link>
    </span>

{/* <button onClick={() => singOut(() => navigate('/', {replace: true}))} >
Logout
</button> */}
<span className='login__button'>
    <button type="submit" className="singup__section__body__submitBtn">
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