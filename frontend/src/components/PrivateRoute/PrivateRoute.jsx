import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute () {
    const { isAuth } = useAuth();
     // Получаем текущий маршрут из хука useLocation
    const location = useLocation();


    return (
        // Если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
        isAuth === true ? <Outlet /> 
        // Если пользователь не авторизован, то перенаправляем его на маршрут /login с помощью компонента Navigate.
         // Свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться обратно, используя кнопку "назад" в браузере.
        : <Navigate to="/login" state={{ from: location }} replace />
    )
}