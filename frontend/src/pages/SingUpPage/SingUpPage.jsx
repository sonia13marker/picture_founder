import { Link } from "react-router-dom";
import "./SingUpPage.scss";
import { useEffect, useRef, useState } from "react";

export default function SingUpPage() {
    const [checked, setChecked] = useState(false);
    const getTheChecked = () => {
        setChecked(!checked)
    }
    // let inputCheckbox = document.querySelector("inputCheckbox");
    // useEffect(() => {
       
    //     if (inputCheckbox !== checked) {
    //         setChecked(false);
    //     }
    //   }, [inputCheckbox]);
    // const checkTheChanges = useEffect((

    // ), [input-checkbox])
    // let  = useRef();
    let checkTheChanges = useRef();
  return (
    <section className="singup__section">
      <span className="singup__section__header">
        <h1 className="singup__section__header__logo">
          Pic<span className="singup__section__header__logo__span">2</span>
        </h1>
        <h2 className="singup__section__header__text">Регистрация</h2>
      </span>

      <form id="signup-form" className="singup__section__body">
        <div id="alert"></div>

        <label for="email" className="singup__section__body__label">
          Электронная почта
        
        <input
          type="email"
          id="email"
          placeholder="Введите эл. почту"
          className="singup__section__body__input"
        />
        </label>
        {/* 
  <label for="account-name">Account name (custom field)</label>
  <input type="text" id="account-name" /> */}

        <label for="password" className="singup__section__body__label">
          Пароль
        
        <input
          type="password"
          id="password"
          placeholder="Введите пароль"
          className="singup__section__body__input password_input"
        />
        </label>

        <label for="password-verify" className="singup__section__body__label">
          Повторите пароль
        
        <input
          type="password"
          id="password-verify"
          placeholder="Введите пароль ещё раз"
          className="singup__section__body__input password_input"
        />
        </label>
        <span className="singup__section__body__checkboxWrapper">
        <input type="checkbox" className="singup__section__body__checkboxWrapper__checkbox" 
        onClick={() => setChecked(!checked)}
        id="inputCheckbox"
       />
          <label
            for="password-checkbox"
            className="singup__section__body__checkboxWrapper__label"
          >
            Я ознакомлен и согласен с условиями обработки моих персональных
            данных и <Link to="#" className="singup__section__body__checkboxWrapper__label__link">Политикой конфиденциальности</Link>.
            </label>
        </span>

        <button type="submit" className={checked ? "singup__section__body__submitBtn" : "singup__section__body__submitBtn unactive"}
         ref={checkTheChanges}>
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
}
