import "./App.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import DevelopersPage from "./pages/DevelopersPage/DevelopersPage";
import data from "../package.json";
import { Navigate } from "react-router-dom";
import SingUpPage from "./pages/SingUpPage/SingUpPage";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordSuccessPage from "./pages/ForgotPasswordSuccessPage/ForgotPasswordSuccessPage";
import PersonalAccountPage from "./pages/PersonalAccountPage/PersonalAccountPage";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function App() {
  // const id = useSelector((state) => state.user.UserId);
  // console.log("APP USER ID", id);
//проблема в том, что если юзер удален но находился на сайте,
//куки остаются на месте. надо добавить, чтобы при логине ошибка добвялалась в стейт 
//и тут происходила проверка не только на куки, но и на ошибку
  const error = useSelector(state => state.user.error);
  console.log(error);
  
  const message = useSelector(state => state.user.message);
  console.log(message);

  const status = useSelector(state => state.user.status);
  console.log(status);
  const [cookies, setCookie] = useCookies(["token"]);
  const [cookies3, setCookie3] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  //получаем token, который уже был записан в куки из LoginPage
  const cookieToken = cookies.token;
  console.log("cookieToken", cookieToken, cookieId);

  function PrivateOutlet() {
    return (cookieToken !== null) && cookieId ? <Layout><Outlet /></Layout> : <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* ссылки на страницы */}
        <Routes>
          {/* {id ? (
            <Route element={<Layout />}>
              <Route path="/main" element={<Navigate to="/" replace />} />
              <Route path="/" index element={<MainPage />} />
              <Route path="/" element={<Outlet />}>
                {!id ? (
                  <Route path="/" element={<LoginPage />} />
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/" replace />} />
                  </>
                )}
              </Route>
              <Route path="/favorite" element={<FavoritePage />} />
              <Route
                path="/developers"
                element={<DevelopersPage numberVersion={data.version} />}
              />
              <Route path="/account" element={<PersonalAccountPage />} />
            </Route>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/singup" element={<SingUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot_password" element={<ForgotPasswordPage />} />
          <Route
            path="/forgot_password-success"
            element={<ForgotPasswordSuccessPage />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes> */}
            
              {/* {
                cookieId !== null || id ? <Route element={<Layout />}> <Route path="/" index element={<MainPage />} /> </Route> : 
                <Route path="/login" element={<LoginPage />} />
              } */}

              {/* <Route element={<Layout />}> */}
              <Route path="/" element={<PrivateOutlet />}>
                <Route index element={<MainPage />} />
                <Route path="favorite" element={<FavoritePage />} />
                <Route path="developers" element={<DevelopersPage numberVersion={data.version} />} />
                <Route path="account" element={<PersonalAccountPage />} />
              </Route>
              
             {/* </Route> */}
             <Route path="/login-auth" element={<Navigate to="/login" replace />} />
             <Route path="/login" element={<LoginPage />} />
          <Route path="/singup" element={<SingUpPage />} />
          <Route path="/forgot_password" element={<ForgotPasswordPage />} />
          <Route path="/forgot_password-success" element={<ForgotPasswordSuccessPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
