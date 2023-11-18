import './PersonalAccountPage.scss';
import OpenEyeIcon from '../../components/OpenEyeIcon';
import CloseEyeIcon from '../../components/CloseEyeIcon';
import { useState, useEffect } from 'react';

export default function PersonalAccountPage ({email, imageCounter, tagsCounter, password}) {

    /*for password inputs */
    const [passwordValue, setPasswordValue] = useState("");
const handleChangePassword = (event) => {
  setPasswordValue(event.target.value);
}
    const [open, setOpen] = useState(true);
    const [hidden, setHidden] = useState(true);
    const selectIcon = () => {
        setOpen(!open);
        setHidden(!hidden);
    }
/*88888888888888888888888*/
const [passwordVerValue, setPasswordVerValue] = useState("");
const handleChangeVerPassword = (event) => {
  setPasswordVerValue(event.target.value);
}
const [isClose, setIsClose] = useState(true);
const [isHidden, setIsHidden] = useState(true);
const selectIconTwo = () => {
  setIsClose(!isClose);
  setIsHidden(!isHidden);
}

const [errorMessage, setErrorMessage] = useState("");
const [errorVerMessage, setErrorVerMessage] = useState("");

useEffect(() => {

    if (passwordValue === password) {
        setErrorMessage("Новый пароль не может совпадать со старым!");
    };
    if (passwordVerValue !== passwordValue) {
        setErrorVerMessage("Пароли не равны!");
    };
    if (passwordValue === password && passwordVerValue === passwordValue) {
        setErrorMessage("Новый пароль не может совпадать со старым!");
    }
    if (passwordValue !== password && passwordVerValue === passwordValue) {
        setErrorMessage("");
        setErrorVerMessage("");
    }
  }, [passwordValue, passwordVerValue, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage === "" && errorVerMessage === "" && passwordValue && passwordVerValue) {
        console.log("success NEW password ", passwordValue);
        console.log("success NEW verify password ", passwordVerValue);
        console.log("success change password");
    }
  }

    return(<section className='account'>
        <h2 className='account__title'>
            Аккаунт 
        </h2>
<div className='account__wrapper'>
    <section className='account__wrapper__leftSide'>
        <h3 className='account__wrapper__leftSide__title'>
        Персональная информация
        </h3>

        <span className="input__wrapper">
      <label className="input__label" htmlFor="personalAcc_email">
     Email аккаунта
        <input
          className="input__auth"
          type="email"
          id="personalAcc_email"
          defaultValue={email}
          readOnly
        />
      </label>

      <p className='input__error'>
      Внимание: email не подлежит изменению.
            </p>
    </span>

    <h4 className='account__wrapper__leftSide__text'>
        Общее количество картинок: {imageCounter ? imageCounter : 0}
    </h4>

    <h4 className='account__wrapper__leftSide__text'>
        Общее количество тегов: {tagsCounter ? tagsCounter : 0}
    </h4>
    </section>

    <section className='account__wrapper__rightSide'>
    <h3 className='account__wrapper__leftSide__title'>
    Смена пароля
        </h3>

        <form className='account__wrapper__rightSide__form'
        onSubmit={handleSubmit}
        >

            {/* password input */}
            <span className="input__wrapper2">
      <label className="input__label" htmlFor="personalAcc_password"></label>
      Новый пароль
       <span className="icon__wrapper">
        <input
          className="input__auth password"
          type={hidden ? "password" : "text"}
          id="personalAcc_password"
          onChange={handleChangePassword}
          placeholder="Введите новый пароль"
          value={passwordValue}
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
                {errorMessage}
            </p>
    </span>

      {/* REPEAT password input */}      
      <span className="input__wrapper2">
      <label className="input__label" htmlFor="personalAcc_passwordVerify"></label>
      Повторите новый пароль
       <span className="icon__wrapper">
        <input
          className="input__auth password"
          type={isHidden ? "password" : "text"}
          id="personalAcc_passwordVerify"
          onChange={handleChangeVerPassword}
          placeholder="Введите новый пароль ещё раз"
          value={passwordVerValue}
        />
        {/*пока открыт глаз - пароль не видно */}
       {
        isClose ?
        (
        <span className="iconOpen" onClick={selectIconTwo}>
            <OpenEyeIcon />
        </span>) :
        (
            <span className="iconClose" onClick={selectIconTwo}>
                <CloseEyeIcon />
            </span> 
        )
       }
        </span>
            <p className='input__error'>
                {errorVerMessage}
            </p>
    </span>

    <button type="submit" className={"singup__section__body__submitBtn"}
    //onClick={}
         >
          Сохранить изменения
        </button>

        </form>
    </section>
</div>
<button className='account__wrapper__logoutBtn'
    //onClick={}
    >
    Выйти из аккаунта
    </button>
        </section> )
}