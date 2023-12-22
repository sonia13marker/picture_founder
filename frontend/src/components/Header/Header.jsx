import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import AddImgBtn from '../AddImgBtn/AddImgBtn';
import Logo from '../Logo';


export default function Header () {

    return (
        <div className='header'>
            <Link to={"/"} className='header__link'>
                <Logo />
            </Link>

            <nav className='header__nav'>
                <ul className='header__nav__ul'>
                    <li className='header__nav__ul__li'>
                        <NavLink to="/" className="header__nav__ul__li__link">
                        Главная
                        </NavLink>
                        </li>
                        <li className='header__nav__ul__li'>
                        <NavLink to="/favorite" className="header__nav__ul__li__link">
                        Избранное
                        </NavLink>
                        </li>
                        <li className='header__nav__ul__li'>
                        <NavLink to="/developers" className="header__nav__ul__li__link">
                        Разработчики
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <span className='header__btns'>
                    <AddImgBtn></AddImgBtn>
                    <NavLink to="/account" 
                    className={({isActive}) => isActive ? "loginBtnActive": "header__btns__login"}
                    ></NavLink>
                </span>

        </div>
    )
}