import FavorFillIcon from '../FavorFillIcon';
import FavorOutlineIcon from '../FavorOutlineIcon';
import './FavoriteComponent.scss';

export default function FavoriteComponent ({inFavorite}) {
    return(<>
        {/* {
            addFavorite ? <FavorFillIcon /> : <FavorOutlineIcon />
        } */}
        {
            inFavorite ? <span className='favorite_icon__fill' /> : <span className='favorite_icon__outline' /> 
        }
        

        
        
        
    </>)
}