import { useEffect, useState } from 'react';
import './MessageOfCookie.scss';

export default function MessageOfCookie () {

    const [isShow, setIsShow] = useState(true);
    const [isTop, setIsTop] = useState(false);
    

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
        <div className={isShow ? 'message' : 'message close'} style={{ bottom: isTop ? ( windowWidth < 768 ? "70px" : "100px" )  : ( windowWidth < 768 ? "70px" : "0") }}>
            <span className='message__wrapper'>
                <span className='message__wrapper__img'></span>
                <h3 className='message__wrapper__text'>
                Pic2re использует куки для хранения данных
                </h3>
            </span>

            <span
            className="message__close"
            onClick={() => setIsShow(!isShow)}
            ></span>
        </div>
    )
}