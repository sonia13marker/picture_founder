import { useSelector } from 'react-redux';
import './CustomNotifications.scss';
import { notificationNmae } from '../../store/slices/userSlice';
import { useEffect, useState } from 'react';

export default function CustomNotifications () {

  const notificationName = useSelector(notificationNmae);
     console.log("notificationName is", notificationName)

   // const [showNotif, setShowNotif] = useState(false);

    //для отображения
    // useEffect(() => {
    //   if (notificationName !== "") {
    //     setShowNotif(true);
    //     console.log("notName is in useEffect", notificationName)
    //     console.log("showNotification in useEffect", showNotif);
    //   }
      
    // }, [notificationName, showNotif])
    

useEffect(() => {
  // if (showNotif) {
    const timer = setTimeout(() => {
      // setShowNotif(false);
    }, 4000);

    return () => clearTimeout(timer);
 // }
}, []);

  
return(<>
  {
      //className='notif__wrapper-show'
      //showNotif && 
      notificationName !== "" ? <span className={ 
        //showNotif ? 'notif__wrapper' : 'notif__wrapper noShow'
        'notif__wrapper'
        }>
       <p className='notif__wrapper__title'>
           {notificationName}
       </p>
       </span> : <></>
  }
      </>
  )
}