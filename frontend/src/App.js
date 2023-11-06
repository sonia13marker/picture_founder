import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import DevelopersPage from './pages/DevelopersPage/DevelopersPage';
import data from '../package.json';
import { useState, useContext, createContext,  Navigate,
  Outlet,
  useLocation,
  useNavigate, Link } from 'react';
import imagesData from './data/first-data.json';
import SingUpPage from './pages/SingUpPage/SingUpPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout/Layout';

import LoginPage from './pages/LoginPage/LoginPage';


function App() {
/*список-состояние массива картинок*/
const [images] = useState(imagesData);

/*добавление в избранное */
const [favorites, setFavorites] = useState([]);
const [inFavorite, setInFavorite] = useState(false);


const addToFavorites = (id) => {
  // поиск элемента из массива и добавление его в список избранных
  const selectedElement = images.find((item) => item.id === id);
  if (selectedElement) {
    setFavorites([...favorites, selectedElement]);
  };
  
};

  return (
        <div className="App">
      <BrowserRouter>
      <Routes>
        
            <Route path='/singup' element={<SingUpPage />} />
            <Route path='/login' element={<LoginPage />} />
        </Routes>
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
          {/* <Route element={<PrivateRoute />}> */}
            {/* <Route path="/" element={<Layout />}> */}
            <Route element={<Layout/>}>
              <Route path='/main' element={<MainPage images={images} favorites={favorites} setFavorites={setFavorites} addToFavorites={addToFavorites} inFavorite={inFavorite} setInFavorite={setInFavorite}/>}/>
              <Route path='/favorite' element={
              // <PrivateRoute>
                <FavoritePage favorites={favorites} />
              // </PrivateRoute>
              }/>
              <Route path='/developers' element={<DevelopersPage  numberVersion={data.version}/>}/>
              {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Route>
            {/* </Route> */}
          {/* </Route> */}
        </Routes>


      </BrowserRouter>
    </div>
    
  );
}


const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <Link to="/">Go to Main Page</Link>
    </>
  )
}

export default App;
