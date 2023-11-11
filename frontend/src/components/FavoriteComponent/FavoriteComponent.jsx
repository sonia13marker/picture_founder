import FavorFillIcon from '../FavorFillIcon';
import FavorOutlineIcon from '../FavorOutlineIcon';
import './FavoriteComponent.scss';

export default function FavoriteComponent ({inFavorite}) {
    return(<>
        {
            inFavorite ? <FavorFillIcon /> : <FavorOutlineIcon />
        }
    </>)
}