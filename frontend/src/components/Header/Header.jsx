import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import AddImgBtn from '../AddImgBtn/AddImgBtn';


export default function Header () {

    return (
        <div className='header'>
            <Link to={"/"} className='header__link'>
            <span className='header__logo'>
                Pic
                <p className='header__logo__p'>
                    2
                </p>
            </span>
            </Link>

            <nav className='header__nav'>
                <ul className='header__nav__ul'>
                    <li className='header__nav__ul__li'>
                        <NavLink to="/" className="header__nav__ul__li__link">
                        Главная
                        </NavLink>
                        <NavLink to="/favorite" className="header__nav__ul__li__link">
                        Избранное
                        </NavLink>
                        <NavLink to="/developers" className="header__nav__ul__li__link">
                        Разработчики
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <span className='header__btns'>
                    <AddImgBtn></AddImgBtn>

                    <button className='header__btns__login'></button>
                </span>

        </div>
    )
}