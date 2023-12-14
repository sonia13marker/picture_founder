import { useSelector } from "react-redux";
import ForgotComponent from "../../components/ForgotComponent/ForgotComponent";


export default function NotFoundPage () {

    const errorCode = useSelector(state => state.user.error);
    console.log("errorCode", errorCode);
    return (
        <div className="forgotPassWrapper">
        <ForgotComponent
        title="Упс! Что-то сломалось..."
        text={`Произошла ошибка ${errorCode || 404}. Вернитесь на главную или перезагрузите страницу.`}
        buttonName="Вернуться на страницу входа"
        />
        </div>
    )
}