import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import '../MainPage/MainPage.scss';
import empty from '../../images/empty_favorite.svg';
import ImageCard from '../../components/ImageCard/ImageCard';
import { useSelector } from 'react-redux';

export default function FavoritePage () {
  const favoriteImages = useSelector(state => state.user.favorite);
  console.log(favoriteImages); 

  if (!favoriteImages.length)
    return (
      <EmptyTextComponent
        image={empty}
        text="Тут ещё нет картинок. Пора бы их добавить"
      /> 
    );
    return ( 
    <section className="wrapper_layout">
    {favoriteImages.map((item) => (
        <ImageCard key={item.imageId} {...item} />
      ))}
      </section>)
}