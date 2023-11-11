import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import DevelopersPage from './pages/DevelopersPage/DevelopersPage';
import data from '../package.json';
import { useState, useContext, createContext, Outlet,
  useLocation,
  useNavigate } from 'react';
import { Navigate } from 'react-router-dom';
import imagesData from './data/first-data.json';
import SingUpPage from './pages/SingUpPage/SingUpPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout/Layout';

import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSuccessPage/ForgotPasswordSuccessPage';


function App() {
/*список-состояние массива картинок*/
const [images] = useState(imagesData);

/*добавление в избранное */
const [favor, setFavor] = useState([]);
const [inFavorite, setInFavorite] = useState(false);


  return (
        <div className="App">
      <BrowserRouter basename="/picture_founder">
        {/* <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes> */}

        {/* ВАЖНО!!!! 
        {isAuthenticated ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
        скорее всего добавить этот код при нажатии на иконку профиля,
        либо разместить это там, где будет находиться страница с 
        данными о пользотвателе (стр "профиль")
        


            просто пример, его надо делать на странице аккаунта 
    const {singOut} = useAuth();
        */}

        {/* ссылки на страницы */}
        <Routes>
          <Route path="/singup" element={<SingUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/forgot_password' element={<ForgotPasswordPage />} />
          <Route path='/forgot_password-success' element={<ForgotPasswordSuccessPage />} />

          <Route element={<Layout />}>
            {/*ссылаюсь на уже существующую страницу  */}
          <Route path="/" element={<Navigate to="/main" replace />} />
              <Route path="/main" index element={<MainPage images={images} 
              // favorites={favorites} setFavorites={setFavorites} addToFavorites={addToFavorites} 
              //addToFavorite={addToFavorite}
              favor={favor} setFavor={setFavor}
              inFavorite={inFavorite} setInFavorite={setInFavorite} />} />
              <Route path="/favorite" element={<FavoritePage //favorites={favorites} 
              favor={favor}
              />} />
              <Route path="/developers" element={<DevelopersPage numberVersion={data.version} />} />
          </Route>
  </Routes>
      </BrowserRouter>
    </div>
    
  );
}


export default App;
