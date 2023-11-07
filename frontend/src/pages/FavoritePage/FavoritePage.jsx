import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import '../MainPage/MainPage.scss';
import empty from '../../images/empty_favorite.svg';
import ImageCard from '../../components/ImageCard/ImageCard';

export default function FavoritePage ({favorites, setFavorites}) {
    if (!favorites) return  <EmptyTextComponent image={empty} />
    return (<section className="wrapper_layout">
    {favorites.map((item) => (
        <ImageCard key={item.id} {...item} />
      ))}
      </section>)
}