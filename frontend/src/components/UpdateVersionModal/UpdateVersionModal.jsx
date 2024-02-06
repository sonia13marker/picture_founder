import { useState } from 'react';
import './UpdateVersionModal.scss';
import { APP_VERSION } from '../../data/constants';

export default function UpdateVersionModal () {
    //написать логику, что если патч, то ставим его, а если обнова - 
    //то ставим название обновы + версию

    //по умолчанию - true
    const [active, setActive] = useState(false);

    //показывать только если нет недавней даты захода и active === true
    return (
        <div className={active ? "shareModal activeModal" : "shareModal"}>
            <div className="shareModal__content versionModal">
            <span className="modal__content__head newHead">
                <span className='newHeading'>
                    <h3 className="message__body__head__h3">Обновление версии</h3>
                    <h5 className='message__body__head__h5'>{`Патч ${APP_VERSION}`}</h5>
                </span>
                <span
                    className="modal__content__head__img"
                    onClick={() => setActive(false)}
                ></span>
            </span> 

            <hr/>

            <span className="message__body__content versionModal__content">
                <p>
                    Исправили ошибки при входе - теперь сообщения приходят всем на почту. Изменили их внешний вид.
                </p>
                <p>
                    Также порешали проблемы с безопасностью. Живите спокойно.
                </p>
            </span>

            </div>
        </div>
    )
}