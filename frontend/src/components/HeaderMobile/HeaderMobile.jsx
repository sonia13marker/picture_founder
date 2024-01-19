import { NavLink } from "react-router-dom";
import "./HeaderMobile.scss";
import HomeIcon from "../../icons/HomeIcon";
import FavoriteIcon from "../../icons/FavoriteIcon";
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
              className="headerMobile__wrapper__ul__li__link"
            >
              <HomeIcon />
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
              className="headerMobile__wrapper__ul__li__link"
            >
              <FavoriteIcon />
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
