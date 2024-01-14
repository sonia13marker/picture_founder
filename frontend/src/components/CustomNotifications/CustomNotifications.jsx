import { useDispatch, useSelector } from 'react-redux';
import './CustomNotifications.scss';
import { showNotification } from '../../store/slices/userSlice';
import { useEffect, useState } from 'react';

export default function CustomNotifications ({title, show}) {

    //const suc = useSelector(state => state.user.error);
    const notName = useSelector(state => state.user.notificationName);
    const dispatch = useDispatch();
    console.log("notName is", notName)

    const [showNotification, setShowNotification] = useState(true);

    
    // setTimeout(dispatch(showNotification("")), 10000)
    // useEffect(()=> {
    //     setTimeout(dispatch(showNotification("")), 10000)
    // }, [dispatch]);
   // console.log("title", title, "status state", suc);
    //let content;

//     if (suc === 200) {
//         setTimeout(
// content = <span className='notif__wrapper-show'>
// <p className='notif__wrapper__title'>
//     {title}
// </p>
// </span>
//         , 3000)
//     }

//=--------------------
//  if (notName !== "") {
//     content = setTimeout(<span className='notif__wrapper-show' id="notif">
//     <p className='notif__wrapper__title'>
//         {notName}
//     </p>
//     </span>, 3000)
//  } else {
//     content = <><span className='notif__wrapper' id="notif">
//     <p className='notif__wrapper__title'>
//         {notName}
//     </p>
//     </span> </>
//  }
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