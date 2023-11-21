import ForgotComponent from "../../components/ForgotComponent/ForgotComponent";
import '../../style.scss';

export default function ForgotPasswordSuccessPage () {
    return (
        <div className="forgotPassWrapper">
        <ForgotComponent 
        title="Получилось!"
        text="Данные для восстановления отправлены на почту."
        buttonName="Вернуться на страницу входа"
        />
        </div>
    )
}