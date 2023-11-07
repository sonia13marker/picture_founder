import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import '../MainPage/MainPage.scss';
import empty from '../../images/empty_favorite.svg';
import ImageCard from '../../components/ImageCard/ImageCard';

export default function FavoritePage ({favorites, setFavorites, favor}) {
    return ( !favor ? <EmptyTextComponent image={empty} /> :
    <section className="wrapper_layout">
    {favor.map((item) => (
        <ImageCard key={item.id} {...item} />
      ))}
      </section>)
}