import { NavLink } from "react-router-dom";
import "./HeaderMobile.scss";
import HomeIcon from "../HomeIcon";
import FavoriteIcon from "../FavoriteIcon";
import DevelopersIcon from "../DevelopersIcon";
import LoginIcon from "../LoginIcon";
import AddIcon from "../AddIcon";
import { useState } from "react";
import AddImageModal from "../AddImageModal/AddImageModal";

export default function HeaderMobile() {
    /* for AddImageModal */
    const [modalActive, setModalActive] = useState(false);
  return (
    <div className="headerMobile__wrapper">
      <nav>
        <ul className="headerMobile__wrapper__ul">
          <li className="headerMobile__wrapper__ul__li">
            <NavLink
              to="/"
            >
              <HomeIcon />
            </NavLink>
          </li>

          <li className="headerMobile__wrapper__ul__li">
            <NavLink
              to="/favorite"
            >
              <FavoriteIcon />
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
              to="/developers"
            >
              <DevelopersIcon />
            </NavLink>
          </li>

          <li className="headerMobile__wrapper__ul__li">
            <NavLink
              to="/login"
            >
              <LoginIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
      <AddImageModal 
        active={modalActive} 
        setActive={setModalActive}
        // addImage={(name, tags, image) => }
        />
    </div>
  );
}
