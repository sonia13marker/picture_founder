import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useDispatch } from "react-redux";
import { getImages } from "../../store/slices/userSlice";
import { useMemo } from "react";
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader/Loader";
import { useCookies } from "react-cookie";
import HelloMessage from "../../components/HelloMessage/HelloMessage";

export default function MainPage() {

  const imagesStatus = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);
  const images = useSelector(state => state.user.images);

  const [cookies2, ] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, ] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  console.log("COOKIES token FROM MAIN PAGE", cookieToken, cookieId)

  const dispatch = useDispatch();

  useMemo(() => {
    if (imagesStatus === 'idle') {
      console.log("await data", cookieId, cookieToken)
      console.log("use memo");
      dispatch(getImages({ userId: cookieId, userToken: cookieToken }));
    }
  }, [imagesStatus, cookieId, cookieToken, dispatch])

  let content;

  if (imagesStatus === 'loading') {
    content = <Loader />
  } else if (imagesStatus === 'succeeded') {
   
    content = (images && images?.length !== 0) ? images.map(
      (image) =>  <ImageCard key={image._id} imageName={image.imageName} imageTags={image.imageTags} image={image.imageHash} imageId={image._id} userId={cookieId} userToken={cookieToken} isFavorite={image.isFavorite} imageExt={image.ext}/>
    ) : <EmptyTextComponent
    image={empty_icon}
    text="Тут ещё нет картинок. Пора бы их добавить"
  />
  } else if (imagesStatus === 'failed') {
    content = <p>Кажется, что-то пошло не так... Перезагрузите страницу.
      <br />
      {error}</p>
  }
 
  return (
    <section className="wrapper_layout">
    {content}
    <HelloMessage />
    </section>
  );
}
