import { useEffect, useState } from 'react';
import '../Layout/Layout.scss';
import he from "he";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { searchImages } from '../../store/slices/userSlice';

export default function SearchInput () {
    const dispatch = useDispatch();
    
    const [cookies2, ] = useCookies(["token"]);
    const cookieToken = cookies2.token;
    const [cookies3, ] = useCookies(["idFromLogin"]);
    const cookieId = cookies3.idFromLogin;

    const [query, setQuery] = useState("");

    const handleChangeSearch = (e) => {
        const escapeQuery = he.escape(e.target.value);
        setQuery(escapeQuery);
        console.log("query", escapeQuery)
    }

    useEffect(() => {
        if (query !== "") {
            dispatch(searchImages({userId: cookieId, userToken: cookieToken, searchQuery: query}));
        }
    }, [cookieId, cookieToken, dispatch, query]);

    const UnQuery = he.unescape(query);

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