import { useEffect, useState } from 'react';
import '../Layout/Layout.scss';
import he from "he";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getFavoriteImages, getImages, searchFavoriteImages, searchImages } from '../../store/slices/userSlice';
import { useLocation } from 'react-router-dom';

export default function SearchInput () {
    //если символы начинают вводиться, то отправляется запрос на поиск
    //как только инпут поиска очищается - запрос перестает идти и возвращается главная страница
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("LOC", location, location.pathname === '/favorite', location.pathname === '/');
    
    const [cookies2, ] = useCookies(["token"]);
    const cookieToken = cookies2.token;
    const [cookies3, ] = useCookies(["idFromLogin"]);
    const cookieId = cookies3.idFromLogin;

    const [quer, setQuery] = useState("");
    const [hasQuery, setHasQuery] = useState(false);
    const [searching, setSearching] = useState(false);

    const handleChangeSearch = (e) => {
        const escapeQuery = he.escape(e.target.value);
        setQuery(escapeQuery);
        console.log("query", escapeQuery);
    }

    useEffect(() => {
        if (quer !== "" && location.pathname === '/') {
            setSearching(true);
            setHasQuery(true);
            dispatch(searchImages({userId: cookieId, userToken: cookieToken, searchQuery: quer}))
        } else if (quer !== "" && location.pathname === '/favorite') {
            setSearching(true);
            setHasQuery(true);
            dispatch(searchFavoriteImages({userId: cookieId, userToken: cookieToken, searchQuery: quer}))
        }
        else {
            setSearching(false);
        }
    }, [quer, cookieId, cookieToken, dispatch, location.pathname]);

    useEffect(() => {
        if (hasQuery && !searching && location.pathname === '/') {
          dispatch(getImages({userId: cookieId, userToken: cookieToken}));
        } else if (hasQuery && !searching && location.pathname === '/favorite') {
          dispatch(getFavoriteImages({userId: cookieId, userToken: cookieToken, isFavorite: true}));
        }
      }, [searching, location.pathname, cookieId, cookieToken, dispatch, hasQuery]);

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