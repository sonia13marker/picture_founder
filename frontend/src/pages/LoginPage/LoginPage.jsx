import './LoginPage.scss';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenEyeIcon from '../../icons/OpenEyeIcon';
import CloseEyeIcon from '../../icons/CloseEyeIcon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setCurrentUser, setError } from '../../store/slices/userSlice';
import Logo from '../../icons/Logo';
import { useCookies } from 'react-cookie';

export default function LoginPage ({ checkAuth }) {
    const navigate = useNavigate();
    const id = useSelector(state => state.user.UserId);
    console.log("ID from login page", id);

    const currMes = useSelector(state=> state.user.currentUser.message);
    console.log("HAPPY", currMes, currMes === "login success");

    

    let location = useLocation();

    console.log(location);

    const token = useSelector(state => state.user.userToken);
    console.log("TOKEN from login page", token);
     const [fff, setFFF] = useState(false);

    useEffect(() => {
      if (token !== null && id !== null) {
        console.log("red", token, fff);
      }
    }, [token, fff, id])

        //запись в куки
        const [cookies2, setCookie2] = useCookies(["token"]);
        const [cookies3, setCookie3] = useCookies(["idFromLogin"]);

        useEffect(() => {
          if (id !== null) {
            setCookie2("idFromLogin", id);
          }
        }, [id, setCookie2]);
        
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
        if (LoginEmail && LoginPassword && errorMessageEmail === "" && errorMessagePassword === "" && getError === null) {
          const res = dispatch(loginUser({LoginEmail, LoginPassword}));

          console.log("res", res, res.arg.LoginPassword, res.arg.LoginEmail);
          // if (res && res.arg.LoginEmail
          //   !== null && res.arg.userId !== null && res.arg.token !== null) {
          //   goToMainPage();
          // }
          // if (!res.arg.LoginPassword && !res.arg.LoginEmail) {
          //   goToMainPage();
          // }
          console.log("token, id", token, id);
          if (currMes === "login success") {
            
            goToMainPage();
          }
        }

        // dispatch(loginUser({LoginEmail, LoginPassword}));
        console.log("DATA FROM LOGIN PAGE:", LoginEmail, LoginPassword)
    }
const goToMainPage = () => {
  navigate('/');
}

    /*for email */
const [errorMessageEmail, setErrorMessageEmail] = useState("");
const [LoginEmail, setLoginEmail] = useState("");
const [nonExistEmail, setNonExistEmail] = useState("");
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

//проверка на ответ от сервера, если ошибка, то записать ее под инпутом
//и также запись в новую переменную текущего эмейла
useEffect(() => {
  if (getError && (getError === 404)) {
    setErrorMessageEmail("Вы еще не зарегистрированы!");
    setNonExistEmail(LoginEmail);
    console.log("getError in red", getError, nonExistEmail, LoginEmail);
  } 
  // if (LoginEmail !== nonExistEmail) {
  //   console.log(LoginEmail, nonExistEmail, LoginEmail !== nonExistEmail)
  //   setErrorMessageEmail("");
  //   dispatch(setError(null));
  //   dispatch(setCurrentUser(null));
  //   setNonExistEmail("");
  // }
  console.log("404 exist email", nonExistEmail);
  console.log("404 email", LoginEmail)
}, [getError, LoginEmail, nonExistEmail])

//очистка ошибок и переход на страницу
useEffect(() => {
  if (LoginEmail !== nonExistEmail) {
    console.log(LoginEmail, nonExistEmail, LoginEmail !== nonExistEmail)
    setErrorMessageEmail("");
    dispatch(setError(null));
    dispatch(setCurrentUser(null));
    setNonExistEmail("");
  }
  // if (id !== null) {
  //   console.log("fuch", id);
  //   goToMainPage();
  // }

}, [LoginEmail, dispatch, nonExistEmail]);

useEffect(() => {
  if (currMes === "login success") {     
    goToMainPage();
  }
}, [currMes])

//for checkbox
const [checked, setChecked] = useState(false);

    //запись в куки
    const [cookies, setCookie] = useCookies(["chekedFromLoginPage"]);

    //получаем id, который уже был записан в куки из MainPage
    //const cookieID = cookies.idFromMainPage;
    //console.log("cookieID", cookieID);

    //проверяем - если галочка стоит, то добавляем в куки
    useEffect(() => {
      if (checked) {
        setCookie("chekedFromLoginPage", checked);
      }
    },[checked, setCookie]);

    //если в куки есть значения, то ставим галочку в true
    // useEffect(() => {
    //     if (cookies.chekedFromLoginPage === true && cookieID) { 
    //       setChecked(true);
    //       console.log("checked from loginPage", checked);
    //     }
    // }, [checked, cookieID, cookies.chekedFromLoginPage]);

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
        onClick={() => setChecked(!checked)}
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