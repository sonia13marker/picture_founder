import Header from '../../components/Header/Header';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import './style.scss';


export default function MainPage () {
    return (
        <>
        <Header/>
        <div className='main__section'>

            <label htmlFor='searchInput' className='main__section__label'>
                <input type='search' name="searchInput" id="searchInput" className='main__section__input' placeholder='Поиск'>
                </input>

                <span className='main__section__label__img'>
                </span>
            </label>

            <SortDropdown />
        </div>
        </>
    )
}