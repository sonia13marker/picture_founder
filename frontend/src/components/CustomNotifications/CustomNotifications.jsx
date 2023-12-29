import { useSelector } from 'react-redux';
import './CustomNotifications.scss';

export default function CustomNotifications ({title, show}) {

    const suc = useSelector(state => state.user.error);
    
    console.log("title", title, "status state", suc);
    let content;

    if (suc === 200) {
        setTimeout(
content = <span className='notif__wrapper-show'>
<p className='notif__wrapper__title'>
    {title}
</p>
</span>
        , 3000)
    }
    return(<>
        {/* {content || null} */}
        </>
    )
}