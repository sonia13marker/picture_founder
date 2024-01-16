import { useDispatch, useSelector } from 'react-redux';
import './CustomNotifications.scss';
import { showNotification } from '../../store/slices/userSlice';
import { useEffect, useState } from 'react';

export default function CustomNotifications () {

    const notName = useSelector(state => state.user.notificationName);
    console.log("notName is", notName)

    const [showNotification, setShowNotification] = useState(true);

useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [showNotification]);
  
    return(<>
    {
        //className='notif__wrapper-show'
        showNotification && notName !== "" ? <span className='notif__wrapper'>
         <p className='notif__wrapper__title'>
             {notName}
         </p>
         </span> : <></>
    }
        </>
    )
}