import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useDispatch } from "react-redux";
import images from '../../data/first-data.json'
// import { getImages } from "../../store/slices/imagesSlice";
import { getImages, selectUserID } from "../../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

/*тут мы отображаем либо компонент с сеткой из всех картинок,
либо пустой компонент, если картинок еще нет */
export default function MainPage({ favorites, setFavorites, favor, setFavor, inFavorite, setInFavorite, 

}) {

// const dispatch = useDispatch();
  // const addToFavorite = (id) => {
  //   // поиск элемента из массива и добавление его в список избранных
  //   let selectedElement = images.find((item) => item.id === id);
  //   if (favor.includes(selectedElement)) {
  //     return null
  //   } else {
  //     setInFavorite(!inFavorite);
  //   }
  //   setFavor((prevFavor) => [...prevFavor, selectedElement]);
  // }
  // console.log(favor);
  // const UserID = useSelector(selectUserID);
  const images = useSelector((state) => state.user.images);
  //
  //
  // const fetchImages = () => {
  //   dispatch(getImages({ id: UserID }));
  // };
  // useEffect(() => {
  //   fetchImages();
  // }, []);
// console.log(images)



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
