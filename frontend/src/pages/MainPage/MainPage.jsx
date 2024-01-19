import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useDispatch } from "react-redux";
import { getImages } from "../../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader/Loader";

export default function MainPage() {


  const userId = useSelector(state => state.user.UserId);
  console.log("ID IN MAIN PAGE", userId);

  const userToken = useSelector(state => state.user.userToken);
  console.log("TOKEN IN MAIN PAGE", userToken); 
  const imagesStatus = useSelector(state => state.user.status);

  const images = useSelector(state => state.user.images);

  const dispatch = useDispatch();

  const error = useSelector(state => state.user.error);

  useEffect(() => {
      if ((userId && userToken) && imagesStatus === 'idle') {
     dispatch(getImages({ userId: userId, userToken: userToken })) 
     }
  }, [userId, userToken, dispatch, imagesStatus, images]);

  let content;

  if (imagesStatus === 'loading') {
    content = <Loader />
  } else if (imagesStatus === 'succeeded') {
   
    content = (images && images?.length !== 0) ? images.map(
      (image) =>  <ImageCard key={image._id} imageName={image.imageName} imageTags={image.imageTags} image={image.imageHash} imageId={image._id} userId={userId} userToken={userToken} isFavotite={image.isFavotite}/>
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
      
    </section>
  );
}
