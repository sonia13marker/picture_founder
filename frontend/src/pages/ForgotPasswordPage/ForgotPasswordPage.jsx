import ForgotComponent from "../../components/ForgotComponent/ForgotComponent";


export default function ForgotPasswordPage () {
    return (
        <ForgotComponent 
        isLogo="true"
        title="Забыли пароль?"
        text="Введите свой e-mail и мы вышлем на него данные для восстановления."
        input="true"
        buttonName="Отправить"
        />
    )
}