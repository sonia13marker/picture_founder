import './App.scss';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import DevelopersPage from './pages/DevelopersPage/DevelopersPage';
import data from '../package.json';
import { Navigate } from 'react-router-dom';
import SingUpPage from './pages/SingUpPage/SingUpPage';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSuccessPage/ForgotPasswordSuccessPage';
import PersonalAccountPage from './pages/PersonalAccountPage/PersonalAccountPage';
import { useSelector } from 'react-redux';


function App() {

  const id = useSelector(state => state.user.UserId);

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
        */}

        {/* ссылки на страницы */}
        <Routes>
          {
            id  ? (
              <Route element={<Layout />}>
            {/*ссылаюсь на уже существующую страницу  */}
          <Route path="/" element={<Navigate to="/main" replace />} />
              <Route path="/main" index element={<MainPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/developers" element={<DevelopersPage numberVersion={data.version} />} />
              <Route path='/account' element={<PersonalAccountPage />} />
              
          </Route>
            ) : (
              <Route path="/" element={<Navigate to="/login" />}/> 
            )
          }
          <Route path="/singup" element={<SingUpPage />} />
          <Route path="/login" element={<LoginPage />}/> 
          <Route path='/forgot_password' element={<ForgotPasswordPage />} />
          <Route path='/forgot_password-success' element={<ForgotPasswordSuccessPage />} />
          

          
  </Routes>
      </BrowserRouter>
    </div>
    
  );
}


export default App;
