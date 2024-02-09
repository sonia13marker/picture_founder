import { Link } from "react-router-dom";
import DevCardComp from "../../components/DevCardComp/DevCardComp";
import "./DevelopersPage.scss";
import { APP_VERSION } from "../../data/constants";

export default function DevelopersPage () {
    return <div className="dev__wrapper">

        <span className="dev__wrapper__cards">
            <DevCardComp 
            name="Софья Маркер"
            position="Дизайн, фронтенд"
            link="https://t.me/username_marker" />

            <DevCardComp 
            name="Влад Москвитин"
            position="Бэкенд"
            link="https://t.me/WaterMelonyF" />
        </span>

        <span className="dev__wrapper__info">
            <MailTo mailto="mailto:info@pic2re.ru"/>

            <p className="dev__wrapper__info__version">
                {`Версия ${APP_VERSION}`}
            </p>
        </span>
    </div>
}

const MailTo = ({mailto}) => {
    return (
        <Link to="#" className="dev__wrapper__info__btn"
        onClick={(e) => {
            window.location.href = mailto;
            e.preventDefault();
        }}
        >
        Сообщить об ошибке
        </Link>
    )
}