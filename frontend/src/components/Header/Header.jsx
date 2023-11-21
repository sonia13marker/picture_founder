import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import AddImgBtn from '../AddImgBtn/AddImgBtn';


export default function Header () {

    return (
        <div className='header'>
            <Link to={"/main"} className='header__link'>
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
                        <NavLink to="/main" className="header__nav__ul__li__link">
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
{/* потом сделать проверку на авторизацию,
если юзер уже заходил в акк, то
перенаправить на стр. ЛК 

если NavLink to="/account", то срабатывают стили на fill иконки*/}
                    <NavLink to="/login" 
                    //className='header__btns__login'
                    className={({isActive}) => isActive ? "loginBtnActive": "header__btns__login"}
                    ></NavLink>
                </span>

        </div>
    )
}