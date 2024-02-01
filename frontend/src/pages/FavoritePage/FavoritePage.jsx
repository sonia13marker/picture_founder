import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import '../MainPage/MainPage.scss';
import empty from '../../images/empty_favorite.svg';
import ImageCard from '../../components/ImageCard/ImageCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getImages } from '../../store/slices/userSlice';
import { useCookies } from 'react-cookie';
import Loader from '../../components/Loader/Loader';

export default function FavoritePage () {
  //получение избранных
  const favoriteImages = useSelector(state => state.user.favorite);
  console.log(favoriteImages); 

  const imagesStatus = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);

  const dispatch = useDispatch();
  //куки
  const [cookies2, ] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, ] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  const isFavorite = true;

  //получение избранных - запрос
  useEffect(() => {
    dispatch(getImages({ userId: cookieId, userToken: cookieToken, isFavorite: isFavorite}));
  }, [cookieId, cookieToken, dispatch, isFavorite])

  let content; 

  if (imagesStatus === 'loading') {
    content = <Loader />
  } else if (imagesStatus === 'succeeded') {
    content = (favoriteImages && favoriteImages.length !== 0) ? favoriteImages.map((item) => (
      <ImageCard key={item.imageId} {...item} />
    )) : <EmptyTextComponent
    image={empty}
    text="Тут ещё нет картинок. Пора бы их добавить"
  /> } else if (imagesStatus === 'failed') {
    content = <p>Кажется, что-то пошло не так... Перезагрузите страницу.
      <br />
      {error}</p>
  }

    return ( 
    <section className="wrapper_layout">
    {content}
      </section>)
}