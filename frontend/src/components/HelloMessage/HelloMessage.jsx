import { useState } from "react";
import './HelloMessage.scss';
import { useCookies } from "react-cookie";


export default function HelloMessage() {
  //при входе значение в куки автоматически в false,
  //а как только нажимаем на крестик - становится true
  const [cookies, setCookies] = useCookies(["helloMessage"]);
  const checkUpdate = cookies.helloMessage;
  //по умолчанию - true
  const [active, setActive] = useState(true);

  const handleClose = () => {
    setActive(false);
    setCookies("helloMessage", true);
  }
  console.log(active, checkUpdate)
  //показывать только если checkUpdate === false и active === true

  return (
    <>
      <div className={active && checkUpdate === false ? "modal activeModal" : "modal"}>
        <div className="message__body">
        <span className="message__body__head">
          <h3 className="message__body__head__h3">Онбординг Pic2re</h3>
          <span
            className="message__body__head__img"
            onClick={handleClose}
          ></span>
        </span> 

        <span className="message__body__content">
            <span className=''>
            <p className="message__body__content__single">
            Привет! Это команда разработчиков Pic2re. И сейчас мы тебе расскажем, как правильно пользоваться нашим веб-приложением :)
            </p>

            <span className="message__body__content__pair">
                <p className="message__body__content__pair__heading" >
                Где я?
                </p>
                <p className="message__body__content__pair__text">
                Pic2re - это бесплатное и неограниченное хранилище твоих картинок, которое поможет в нужный момент быстро найти их и поделиться. Ограничение только в размере картинки - он не должен превышать 20 МБ.
                </p>
            </span>

            <span className="message__body__content__pair">
                <p className="message__body__content__pair__heading" >
                Что можно хранить?
                </p>
                <p className="message__body__content__pair__text">
                Все, что пожелаешь - мемы, открытки на день рождения бабушки, шпаргалки для экзаменов, идеи для построек в Sims4 или Minecraft, милые картинки котиков... Впрочем, ты и сам знаешь, мы верим в твою мудрость.
                </p>
            </span>

            <p className="message__body__content__single">
            Запомни: аккаунты, не активные 3 месяца и более - <span className="bold">будут удалены</span>.
            </p>

            <span className="message__body__content__pair">
                <p className="message__body__content__pair__heading" >
                Что тут делать?
                </p>
                <p className="message__body__content__pair__text">
                Чтобы закинуть изображение, жмякай на вот эту большую фиолетовую кнопку 'Добавить', загружай свою пикчу и информацию о ней. Картинка и имя - обязательны! Теги можешь опустить и добавить по мере вдохновения позже. 
                </p>
                <p className="message__body__content__pair__text">На главной странице, когда появится карточка с изображением, наведи на неё курсор мыши (или нажми на неё, если используешь телефон), чтобы увидеть доступные действия: редактировать, поделиться, скачать и удалить, а  также - добавить в избранное. 
                Если ты захочешь поделиться картинкой через ссылку, она будет актуальна 7 дней. После этого ссылку придется обновить.
                </p>
            </span>

            <span className="message__body__content__pair">
                <p className="message__body__content__pair__heading" >
                Аккаунт?
                </p>
                <p className="message__body__content__pair__text">
                Тут содержится основная информация - твой email, количество картинок и тегов. Если тебе захотелось сменить пароль, ты сможешь это сделать только здесь. И помни, что <span className="italic">обо всех манипуляциях</span> с твоей <span className="underline">личной информацией</span> мы отправляем тебе письмо на почту, чтобы ты был в курсе всего. Ну а если у тебя несколько аккаунтов, то ты можешь выйти из текущего при нажатии на кнопку 'Выйти из аккаунта', и зайти в другой.
                </p>
            </span>

            <span className="message__body__content__pair">
                <p className="message__body__content__pair__heading" >
                Что по входу и регистрации? 
                </p>
                <p className="message__body__content__pair__text">
                Зарегистрироваться по одному эмейлу несколько раз не получится, допустимо иметь только один аккаунт по одному почтовому адресу. А также ты должен быть ознакомлен с нашей политикой конфиденциальности. Но если ты читаешь это сейчас, то все в порядке ;) Остальные подсказки ищи в ошибках. Ну а если ты забыл свой пароль, то перейди по соответствующей ссылке и проследуй пошаговым инструкциям.
                </p>
            </span>

            <p className="message__body__content__single">
            Вот такие основы. Спасибо за прочтение, надеемся у тебя все получится! А если нет - пиши нам на почту <a href="mailto:info@pic2re.ru" className="purple">info@pic2re.ru</a> или нажимай на кнопку 'Сообщить об ошибке' на странице 'Разработчики' (только в десктопной версии). Веселись!
            </p>
          </span>
          </span>
        </div>
      </div>
    </>
  );
}
