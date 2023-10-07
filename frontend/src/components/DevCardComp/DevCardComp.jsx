import './DevCardComp.scss';
import tg_icon from '../../images/tg_icon.svg';

export default function DevCardComp ({name, link, position}) {
    return <div className="card_wrapper">
        <span className='card_wrapper__first'>
        <h2 className='card_wrapper__first__name'>{name}</h2>

        <a href={link}>
            <img src={tg_icon} alt="" />
        </a>
        </span>
        <span className='card_wrapper__second'>
            <p className='card_wrapper__second__position'>
                {position}
            </p>
        </span>
    </div>
}