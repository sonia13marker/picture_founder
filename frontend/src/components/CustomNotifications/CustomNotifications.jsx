import './CustomNotifications.scss';

export default function CustomNotifications ({title}) {
    return(
        <span className='notif__wrapper'>
            <p className='notif__wrapper__title'>
                {title}
            </p>
        </span>
    )
}