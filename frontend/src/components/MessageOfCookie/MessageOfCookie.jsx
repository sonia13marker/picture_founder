import { useEffect, useState } from "react";
import "./MessageOfCookie.scss";
import { useCookies } from "react-cookie";

export default function MessageOfCookie() {
  //для показывания или нет уведомления
  const [isShow, setIsShow] = useState(true);
  //для перемещения вверх при футере
  const [isTop, setIsTop] = useState(false);
  //для проверки, закрыто или нет, чтобы записать в куки
  const [isClosed, setIsClosed] = useState(false);
  //запись в куки
  const [cookies, setCookie] = useCookies(["closedMessageAboutCoockie"]);

  const setClosedTheMessage = () => {
    //закрываем окно
    setIsShow(!isShow);
    console.log("isShow", isShow);
  };

  //добавление переменной, сообщающей о закрытии окна в локальное хранилище
  useEffect(() => {
    if (isShow === false) {
      //ставим true, так как окно было закрыто
      setIsClosed(true);
      setCookie("closedMessageAboutCoockie", isClosed);
      console.log("isClosed", isClosed);
    }
  }, [isClosed, isShow, setCookie]);

  console.log(
    "closedMessageAboutCoockie",
    cookies.closedMessageAboutCoockie,
    cookies.closedMessageAboutCoockie !== true
  );

  //для поднятия сообщения вверх от футера
  const windowWidth = window.innerWidth;
  useEffect(() => {
    const handleScrollVisibility = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= scrollHeight) {
        setIsTop(true);
        console.log("its top", scrollY, windowHeight, scrollHeight);
      } else {
        setIsTop(false);
      }
    };
    window.addEventListener("scroll", handleScrollVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollVisibility);
    };
  }, []);

  return (
    <>
      {isShow && cookies.closedMessageAboutCoockie !== true ? (
        <div
          className={isShow ? "message" : "message close"}
          style={{
            bottom: isTop
              ? windowWidth < 768
                ? "70px"
                : "100px"
              : windowWidth < 768
              ? "70px"
              : "0",
          }}
        >
          <span className="message__wrapper">
            <span className="message__wrapper__img"></span>
            <h3 className="message__wrapper__text">
              Pic2re использует куки для хранения данных
            </h3>
          </span>

          <span className="message__close" onClick={setClosedTheMessage}></span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
