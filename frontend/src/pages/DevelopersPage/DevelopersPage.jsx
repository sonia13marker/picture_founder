import { Link } from "react-router-dom";
import DevCardComp from "../../components/DevCardComp/DevCardComp";
import "./DevelopersPage.scss";

export default function DevelopersPage ({ numberVersion }) {
    return <div className="dev__wrapper">

        <span className="dev__wrapper__cards">
            <DevCardComp 
            name={"Софья Маркер"}
            position={"Дизайн, фронтенд"}
            link={"https://t.me/username_marker"} />

            <DevCardComp 
            name={"Влад Москвитин"}
            position={"Бэкенд"}
            link={"https://t.me/WaterMelonyF"} />
        </span>

        <span className="dev__wrapper__info">
            <Link to="#" className="dev__wrapper__info__btn">
            Сообщить об ошибке
            </Link>

            <p className="dev__wrapper__info__version">
{`Версия ${numberVersion}`}
            </p>
        </span>
    </div>
}