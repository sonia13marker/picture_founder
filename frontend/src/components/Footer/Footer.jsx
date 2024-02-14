import { Link } from 'react-router-dom';
import './Footer.scss';
import { useEffect, useState } from 'react';

export default function Footer() {

    /* для отступа в мобильной версии */
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const date = new Date().getFullYear();
    return (
        <div className={ windowWidth <= 768 ? "footer forMobile" :"footer"}>
            <span className='footer__bg'>
                <span className='footer__fg'>
                <p className='footer__fg__text'>
                &copy; Pic2re, {date} г.
                </p>
                <Link to="/privacy" target="_blank" className='footer__fg__text__link'>
                Политика конфиденциальности
                </Link>
                </span>
            </span>
        </div>
    )
}