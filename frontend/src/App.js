import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import SortDropdown from './components/SortDropdown/SortDropdown';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import DevelopersPage from './pages/DevelopersPage/DevelopersPage';
import data from '../package.json';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import imagesData from './data/first-data.json';


function App() {
/*список-состояние массива картинок*/
const [images] = useState(imagesData);
// const [favoriteArray] = useState([]);
let favoriteArray = [];
  return (
    <div className="App">
      <BrowserRouter>

{/* верхнее меню и навигация */}
      <Header/>

      {/* общий контейнер с поиском и сортировкой,
      который имеет отступы 55рх вместе с содержимым */}
      <div className='main__section'>

        <div className='main__section__wrapper'>

            <label htmlFor='searchInput' className='main__section__label'>
                <input type='search' name="searchInput" id="searchInput" className='main__section__input' placeholder='Поиск'>
                </input>

                <span className='main__section__label__img'>
                </span>
            </label>
            <SortDropdown />
          </div>
        {/* ссылки на страницы */}
        <Routes>
          <Route path="/" element={<MainPage images={images} favoriteArray={favoriteArray}/>}/>
          <Route path='/favorite' element={<FavoritePage favoriteArray={favoriteArray}/>}/>
          <Route path='/developers' element={<DevelopersPage  numberVersion={data.version}/>}/>
        </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
