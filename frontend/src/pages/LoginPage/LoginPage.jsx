import './LoginPage.scss';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenEyeIcon from '../../icons/OpenEyeIcon';
import CloseEyeIcon from '../../icons/CloseEyeIcon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setError, setMessage } from '../../store/slices/userSlice';
import Logo from '../../icons/Logo';
import { useCookies } from 'react-cookie';
import { useCheckThePassword } from '../../hooks/useCheckThePassword';

export default function LoginPage () {
    const navigate = useNavigate();
    const id = useSelector(state => state.user.UserId);
    console.log("ID from login page", id);

    const message = useSelector(state => state.user.message);
    console.log("HAPPY", message, message === "login success");


    const token = useSelector(state => state.user.userToken);
    console.log("TOKEN from login page", token);

    useEffect(() => {
      if (token !== null && id !== null) {
        console.log("red", token);
      }
    }, [token, id])

        //запись в куки
        const [cookies2, setCookie2] = useCookies(["token"]);
        const [cookies3, setCookie3] = useCookies(["idFromLogin"]);

        useEffect(() => {
          if (id !== null) {
            setCookie3("idFromLogin", id);
          }
        }, [id, setCookie3]);
        
        useEffect(() => {
          if (token !== null) {
            setCookie2("token", token);
          }
        }, [token, setCookie2]);

    const getError = useSelector(state => state.user.error);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
      
        event.preventDefault();

        //внутренние проверки на заполнение значений и отсутствие ошибок
        if (userEmail && userPassword && errorMessageEmail === "" && errorMessagePassword === "" && getError === null) {
          dispatch(loginUser({userEmail, userPassword}));
        }
        console.log("DATA FROM LOGIN PAGE:", userEmail, userPassword)
    }
const goToMainPage = useCallback(() => {
  navigate('/');
}, [navigate]);

    /*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [userEmail, setLoginEmail] = useState("");
const [nonExistEmail, setNonExistEmail] = useState("");
const handleChangeEmail = (event) => {
  setLoginEmail(event.target.value);
}
useEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (userEmail.match(emailRegex)) {
    setErrorMessageEmail("");
  } else if (userEmail !== "") {
    setErrorMessageEmail("Введён неверный адрес эл.почты!");
    console.log("invalid email");
  };
}, [userEmail]);

//проверка на ответ от сервера, если ошибка, то записать ее под инпутом
//и также запись в новую переменную текущего эмейла
useEffect(() => {
  if (getError && (getError === 101)) {
    setErrorMessageEmail("Вы еще не зарегистрированы!");
    setNonExistEmail(userEmail);
    console.log("getError in red", getError, nonExistEmail, userEmail);
  } 
  console.log("404 exist email", nonExistEmail);
  console.log("404 email", userEmail)
}, [getError, userEmail, nonExistEmail])

//очистка ошибок и переход на страницу
useEffect(() => {
  if ((userEmail && nonExistEmail) && userEmail !== nonExistEmail) {
    console.log(userEmail, nonExistEmail, userEmail !== nonExistEmail)
    setErrorMessageEmail("");
    dispatch(setError(null));
    setNonExistEmail("");
  }
}, [userEmail, dispatch, nonExistEmail]);

useEffect(() => {
  if (message === "login success") {     
    goToMainPage();
    dispatch(setMessage(null));
  }
}, [message, goToMainPage])

//for checkbox
const [checked, setChecked] = useState(false);

    //запись в куки
    const [cookies, setCookie] = useCookies(["chekedFromLoginPage"]);
    const [cookies1, setCookies1] = useCookies(["helloMessage"]);
    // const checkUpdate = cookies1.helloMessage;

    useEffect(() => {
      if (cookies1.helloMessage !== true) {
        setCookies1("helloMessage", false);
      }
    }, [setCookies1, cookies1.helloMessage])

    //проверка на нажатие и запись значения в куки
    const toggleChecked = () => {
      const newValue = !checked;
      setChecked(newValue);
      setCookie("chekedFromLoginPage", newValue);
    };

    useEffect(() => {
      // Проверка значения из куки
      const cookieValue = cookies.chekedFromLoginPage;
      if (cookieValue !== false) {
        setChecked(true);

        localStorage.setItem("username", userEmail);

        const username = localStorage.getItem("username");
        if (username) {

          console.log("Данные пользователя найдены:", checked === true, username);
        } else {
        console.log("Данные пользователя не найдены");
        }
      } else if (cookieValue === false) {
        localStorage.setItem("username", "");
      }
    }, [cookies.chekedFromLoginPage, checked, userEmail]);

/*for password input */
const [userPassword, setPassword] = useState("");
 const [errorMessagePassword, setErrorMessagePassword] = useState("");
const handleChangePassword = (event) => {
  setPassword(event.target.value);
}

  //проверка пароля на 8 символов
  const { errorMessage } = useCheckThePassword({pass: userPassword});

const [errorPass, setErrorPass] = useState("");

//проверка на правильно введенный пароль
useEffect(() => {
  if (getError && (getError === 103)) {
    setErrorMessagePassword("Введён неверный пароль!");
    setErrorPass(userPassword);
    console.log("checkThePassword", errorPass, "error", getError, userPassword)
  }
}, [errorPass, getError, userPassword])
console.log("after checkThePassword errorPass", errorPass)

const checkThePassword = useCallback(() => {
  if (errorPass && errorPass !== userPassword) {
    setErrorMessagePassword("");
    dispatch(setError(null));
    setErrorPass(null);
  }
}, [errorPass, userPassword, dispatch]);

useEffect(() => {
  checkThePassword();
}, [checkThePassword])

const [open, setOpen] = useState(true);
const [hidden, setHidden] = useState(true);
const selectIcon = () => {
    setOpen(!open);
    setHidden(!hidden);
}

/*go to singup page */
const goToSingupPage = () => {
  navigate('/singup', { replace: true, state: 'from login' });
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
          value={userEmail}
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
          value={userPassword}
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
                {errorMessage || errorMessagePassword}
            </p>
    </span>

    <span className='login__lineWrapper'>
    <span className="singup__section__body__checkboxWrapper login__wrapper gap">
        <input type="checkbox" 
        //onClick={toggleChecked}
        onChange={toggleChecked}
        id="login_checkbox"
        name="login_checkbox"
        checked={checked}
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