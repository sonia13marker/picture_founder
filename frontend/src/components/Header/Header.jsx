import { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import AddBtn from '../AddBtn/AddBtn';

export default function Header () {

    /* for active links in nav */
    const [selectedLink, setSelectedLink] = useState(0);

    const links = [
        {
            name: "Главная",
            path: "/"
        },
        {
            name: "Избранное",
            path: "/"
        },
        {
            name: "Разработчики",
            path: "/"
        },
    ]
    const setLinkStyle = (indexLink) => setSelectedLink(indexLink);
    return (
        <div className='header'>
            <span className='header__logo'>
                Pic
                <p className='header__logo__p'>
                    2
                </p>
            </span>

            <nav className='header__nav'>
                <ul className='header__nav__ul'>
                    <li className='header__nav__ul__li'>
                    {links.map((item,index) => (
                        <Link to={item.path} key={item.index}
                        onClick={() => setLinkStyle(index)}
                        className={selectedLink === index ? "header__nav__ul__li__linkSelect" : "header__nav__ul__li__link"}>
                            {item.name}
                        </Link>
                    ))}
                    </li>
                </ul>

            </nav>

            <span className='header__btns'>
                    <AddBtn ></AddBtn>

                    <button className='header__btns__login'></button>
                </span>
        </div>
    )
}