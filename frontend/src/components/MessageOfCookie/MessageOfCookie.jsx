import { useEffect, useState } from 'react';
import './MessageOfCookie.scss';

export default function MessageOfCookie () {

    const [isShow, setIsShow] = useState(true);
    const [isTop, setIsTop] = useState(false);

    const [isClosed, setIsClosed] = useState(false);

  const setClosedTheMessage = () => {
    //закрываем окно
    setIsShow(!isShow);
    console.log("isShow", isShow)
    //вызываем функцию с добавлением переменной в 
    //локальное хранилище
    // messageToLocalStorage();
  }

    useEffect(() => {
      if (isShow === false) {
         //ставим true, так как окно было закрыто
    setIsClosed(true); 
    console.log("isClosed", isClosed)

    localStorage.setItem("closedMessageAboutCoockie", isClosed);
    // const clickedTheWindow = localStorage.getItem("closedMessageAboutCoockie");
    // console.log("closedMessageAboutCoockie", clickedTheWindow);
      }
  }, [isClosed, isShow])

  const clickedTheWindow = localStorage?.getItem("closedMessageAboutCoockie");
  console.log("closedMessageAboutCoockie", clickedTheWindow);
    
//для поднятия сообщения вверх от футера
    const windowWidth = window.innerWidth;

    useEffect(() => {   
        const handleScrollVisibility = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            if (scrollY + windowHeight >= scrollHeight) {
                setIsTop(true);
                console.log("its top", scrollY, windowHeight, scrollHeight)
              }
              else {
                setIsTop(false);
              }
            };
            window.addEventListener('scroll', handleScrollVisibility);

            return () => {
              window.removeEventListener('scroll', handleScrollVisibility);
            };
    }, [])

    return (
      <>
      {isShow && clickedTheWindow  ?
        (<div className={isShow ? 'message' : 'message close'} style={{ bottom: isTop ? ( windowWidth < 768 ? "70px" : "100px" )  : ( windowWidth < 768 ? "70px" : "0") }}>
            <span className='message__wrapper'>
                <span className='message__wrapper__img'></span>
                <h3 className='message__wrapper__text'>
                Pic2re использует куки для хранения данных
                </h3>
            </span>

            <span
            className="message__close"
            // onClick={() => setIsShow(!isShow)}
            onClick={setClosedTheMessage}
            ></span>
        </div>) : <></>
      }
        </>
    )
}