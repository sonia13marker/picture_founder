import ForgotComponent from "../../components/ForgotComponent/ForgotComponent";
import '../../style.scss';

export default function ForgotPasswordPage () {
    return (
        <div className="forgotPassWrapper">
        <ForgotComponent 
        isLogo="true"
        title="Забыли пароль?"
        text="Введите свой e-mail и мы вышлем на него данные для восстановления."
        input="true"
        buttonName="Отправить"
        />
   </div> )
}