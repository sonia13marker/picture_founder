import { useDispatch } from 'react-redux';
import './SortDropdown.scss';
import { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getImages } from '../../store/slices/userSlice';
import { useLocation } from 'react-router-dom';

export default function SortDropdown () {
    /*for list of sort items*/
    const [selectedSort, setSelectedSort] = useState(-1);

    const sorts = [
        {
            name: "Сначала новые",
        },
        {
            name: "Сначала старые",
        },
        {
            name: "По названию А-Я",
        },
        {
            name: "По названию Я-А",
        }
    ]

    const location = useLocation();
    console.log("LOC sort", location, location.pathname === '/favorite', location.pathname === '/');
    const dispatch = useDispatch();

    const [cookies2, ] = useCookies(["token"]);
    const cookieToken = cookies2.token;
    const [cookies3, ] = useCookies(["idFromLogin"]);
    const cookieId = cookies3.idFromLogin;

    let filter;

    const handleOnClick = (indexSort) => {
        setSelectedSort(indexSort);
        console.log("selectedSort.name", sorts[indexSort].name)
        if (sorts[indexSort].name === "Сначала новые") {
            //сортировка по дате (сначала новые)
            filter = 'NONE';
            dispatch(getImages({userId: cookieId, userToken: cookieToken, filter: filter, sort: "date"}));
        } else if (sorts[indexSort].name === "Сначала старые") {
             //сортировка по дате (сначала старые)
            filter = 'DOWN';
            dispatch(getImages({userId: cookieId, userToken: cookieToken, filter: filter, sort: "date"}));
        } else if (sorts[indexSort].name === "По названию А-Я") {
            //сортировка по имени А-Я
            filter = 'NONE';
            dispatch(getImages({userId: cookieId, userToken: cookieToken, filter: filter, sort: "alph"}));
        } else if (sorts[indexSort].name === "По названию Я-А") {
            //сортировка по имени Я-A
            filter = 'DOWN';
            dispatch(getImages({userId: cookieId, userToken: cookieToken, filter: filter, sort: "alph"}));
        }
    }

    /* for sort btn */
    const [dropdownState, setDropdownState] = useState({ open: false });

    const openDropdown = () =>
    setDropdownState({ open: !dropdownState.open });

    const dropdown = useRef();
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
      
        return () => document.removeEventListener("mousedown",  handleClickOutside);
       }, []);

       const handleClickOutside = (e) => {
        if (dropdown.current && !dropdown.current.contains(e.target)) {
        setDropdownState({ open: false });
        }
        };
    return (
        <div className='dropdown__wrapper' ref={dropdown}>
            <button className={selectedSort !== -1 ? "dropdown__btn_active" : "dropdown__btn" } onClick={openDropdown}>
            Сортировать

            <span className='dropdown__btn__img'></span>
     </button>
     {dropdownState.open && (
        <div className="dropdown">
        <ul className='dropdown__ul'>
           {sorts.map((item,i) => (
               <li className={selectedSort === i ? "dropdown__ul__li_active" : "dropdown__ul__li" } key={i} onClick={() => handleOnClick(i)}>
                   {item.name}
               </li>
           ))
           }
          </ul>
        </div>
     )}
        </div>
    )
}