import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {

    const date = new Date().getFullYear();
    return (
        <div className="footer">
            <span className='footer__bg'>
                <span className='footer__fg'>
                <p className='footer__fg__text'>
                &copy; pic2, {date} г.
                </p>
                <Link to="#" className='footer__fg__text__link'>
                Политика конфиденциальности
                </Link>
                </span>
            </span>
        </div>
    )
}