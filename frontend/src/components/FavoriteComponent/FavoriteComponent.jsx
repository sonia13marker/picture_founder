import FavorFillIcon from '../FavorFillIcon';
import FavorOutlineIcon from '../FavorOutlineIcon';
import './FavoriteComponent.scss';

export default function FavoriteComponent ({addFavorite, setAddFavorite}) {
    return(<>
        {
            addFavorite ? <FavorFillIcon /> : <FavorOutlineIcon />
        }
        
        
    </>)
}