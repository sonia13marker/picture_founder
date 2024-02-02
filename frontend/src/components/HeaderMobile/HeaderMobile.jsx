import { NavLink } from "react-router-dom";
import "./HeaderMobile.scss";
import AddIcon from "../../icons/AddIcon";
import { useState } from "react";
import AddImageModal from "../AddImageModal/AddImageModal";

export default function HeaderMobile() {
    /* for AddImageModal */
    const [modalActive, setModalActive] = useState(false);
  return (<>
    <div className="headerMobile__wrapper">
      <nav>
        <ul className="headerMobile__wrapper__ul">
          <li className="headerMobile__wrapper__ul__li">
            <NavLink
              to="/"
              className={({ isActive }) =>
              isActive ? 'headerMobile__wrapper__ul__li__link iconHomeActive' : 'headerMobile__wrapper__ul__li__link'}
            >
            </NavLink>
          </li>
          <li className="headerMobile__wrapper__ul__li">
            <button className='headerMobile__wrapper__ul__li__btn'
                    onClick={() => setModalActive(!modalActive)}
            >
              <AddIcon />
            </button>
          </li>
          <li className="headerMobile__wrapper__ul__li">
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
              isActive ? 'headerMobile__wrapper__ul__li__link iconStarActive' : 'headerMobile__wrapper__ul__li__link iconStar'}
            >
            </NavLink>
          </li>

        </ul>
      </nav>
    </div>
    <AddImageModal 
        active={modalActive} 
        setActive={setModalActive}
        />
        </>  );
}
