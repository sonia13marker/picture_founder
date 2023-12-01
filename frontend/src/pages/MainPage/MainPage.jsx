import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useDispatch } from "react-redux";
//import images from '../../data/first-data.json'
// import { getImages } from "../../store/slices/imagesSlice";
import { getImages, selectUserID } from "../../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

export default function MainPage({ favorites, setFavorites, favor, setFavor, inFavorite, setInFavorite, 

}) {

  /*
   с бэкенда приходят такие данные о картинке: 
   {
    "imageID": "324knd",
    "imageName": "kjffffffffffff",
    "imageHash": "sdlkjs89u3wq3as",
    "ownerID": "kjsdd322",
    "uploadDate": "21-03-3302T23:43",
    "imageSize": 3238787, //это в битах. Потом подумаю на конвериацией
    "imageTags": ["sjkhd", ....],
    "isFavorite": false
}
   */
  const images = useSelector((state) => state.user.images);
  const id = useSelector(state => state.user.UserId);
  console.log("ID IN MAIN PAGE", id);
  const userToken = useSelector(state => state.user.userToken);
  console.log("TOKEN IN MAIN PAGE", userToken);
  console.log("main page", images);
  const dispatch = useDispatch();

  
  
  const fetchImages = () => {
    dispatch(getImages({ id: id, token: userToken }));
  };
  useEffect(() => {
    fetchImages();
  }, []);
console.log(images)



  if (!images.length)
    return (
      <EmptyTextComponent
        image={empty_icon}
        text="Тут ещё нет картинок. Пора бы их добавить"
      />
    );
  return (
    <section className="wrapper_layout">
        {images.map((image) => (
          <ImageCard key={image.key} {...image} 
          //favorites={favorites} setFavorites={setFavorites} 
          //addToFavorite={addToFavorite} 
          // inFavorite={inFavorite} 
          // setInFavorite={setInFavorite}
          />
        ))}
    </section>
  );
}
