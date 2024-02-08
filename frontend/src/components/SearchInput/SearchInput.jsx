import { useEffect, useState } from 'react';
import '../Layout/Layout.scss';
import he from "he";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { searchImages } from '../../store/slices/userSlice';
import { useLocation } from 'react-router-dom';

export default function SearchInput () {
    //если символы начинают вводиться, то отправляется запрос на поиск
    //как только инпут поиска очищается - запрос перестает идти и возвращается главная страница
    //запрос по главной - это когда есть только query, filter=NONE, isFavorite=false;
    //запрос по избранному - это когда query, filter=NONE, isFavorite=true
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("LOC", location, location.pathname === '/favorite', location.pathname === '/');
    
    const [cookies2, ] = useCookies(["token"]);
    const cookieToken = cookies2.token;
    const [cookies3, ] = useCookies(["idFromLogin"]);
    const cookieId = cookies3.idFromLogin;

    const [quer, setQuery] = useState("");

    const handleChangeSearch = (e) => {
        const escapeQuery = he.escape(e.target.value);
        setQuery(escapeQuery);
        console.log("query", escapeQuery);
    }
     const filter = 'NONE';
    useEffect(() => {
        console.log("query", quer)
        if (quer !== "" && location.pathname === '/') {
            dispatch(searchImages({userId: cookieId, userToken: cookieToken, searchQuery: quer, filter: filter, isFavorite: false}));
        } else if (quer !== "" && location.pathname === '/favorite') {
            dispatch(searchImages({userId: cookieId, userToken: cookieToken, searchQuery: quer, filter: filter, isFavorite: true}));
        } else {
            // if (quer === "") {
                setQuery("");
            // }
        }
    }, [cookieId, cookieToken, dispatch, quer, location.pathname]);

    const UnQuery = he.unescape(quer);

    return (
        <label htmlFor="searchInput" className="main__section__label">
            <input
              type="search"
              name="searchInput"
              id="searchInput"
              className="main__section__input"
              placeholder="Поиск"
              value={UnQuery}
              onChange={handleChangeSearch}
            />
            <span className="main__section__label__img"></span>
          </label>
    )
}