import ForgotComponent from "../../components/ForgotComponent/ForgotComponent";

export default function NotFoundPage () {

    return (<>
            <div className="forgotPassWrapper">
            <ForgotComponent
            title="Упс! Что-то сломалось..."
            text={`Произошла ошибка 404. Вернитесь на главную или перезагрузите страницу.`}
            buttonName="Вернуться на страницу входа"
            />
            </div>
        </> )
}