import './Layout.scss';
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SortDropdown from "../SortDropdown/SortDropdown";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Header />
            {/* общий контейнер с поиском и сортировкой,
      который имеет отступы 55рх вместе с содержимым */}
      <div className="main__section">
        <div className="main__section__wrapper">
          <label htmlFor="searchInput" className="main__section__label">
            <input
              type="search"
              name="searchInput"
              id="searchInput"
              className="main__section__input"
              placeholder="Поиск"
            />
            <span className="main__section__label__img"></span>
          </label>
          <SortDropdown />
        </div>
        {/* вот тут находится все содержимое роутов,
        а вокруг них будут шапка и подвал */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
