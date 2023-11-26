import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
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


function App() {

const currentEmail = 'privet12345_hello@seelssocute.ru';
const currentPassword = '12345';
const imageCounter = 10; 
const tagsCounter = 29;


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
          <Route path="/singup" element={<SingUpPage />} />
          <Route exact path="/login" element={<LoginPage />}/> 
          <Route path='/forgot_password' element={<ForgotPasswordPage />} />
          <Route path='/forgot_password-success' element={<ForgotPasswordSuccessPage />} />
          <Route path='/account' element={<PersonalAccountPage email={currentEmail} password={currentPassword} imageCounter={imageCounter} tagsCounter={tagsCounter}/>} />

          <Route element={<Layout />}>
            {/*ссылаюсь на уже существующую страницу  */}
          <Route path="/" element={<Navigate to="/main" replace />} />
              <Route path="/main" index element={<MainPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/developers" element={<DevelopersPage numberVersion={data.version} />} />
              
          </Route>
  </Routes>
      </BrowserRouter>
    </div>
    
  );
}


export default App;
