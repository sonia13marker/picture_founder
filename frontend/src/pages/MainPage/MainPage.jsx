import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useDispatch } from "react-redux";
import { getImages } from "../../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

export default function MainPage() {


  const id = useSelector(state => state.user.UserId);
  console.log("ID IN MAIN PAGE", id);

  const userToken = useSelector(state => state.user.userToken);
  console.log("TOKEN IN MAIN PAGE", userToken); 

  const images = useSelector((state) => state.user.images.images);

  const dispatch = useDispatch();
  
  const fetchImages = (id, userToken) => {
    console.log("token in img ", userToken);

    dispatch(getImages({ id: id, token: userToken }));
  };
  
  // useEffect(() => {
  //   fetchImages(id, userToken);
  //   // console.log("IMAGES IN MAIN PAGE", images);
  // }, [id, images, userToken]);
  useEffect(() => {
    fetchImages(id, userToken);
  }, [id, userToken]);

  // Вывод в консоль только после загрузки данных
useEffect(() => {
  // if (images.length > 0) {
  //   console.log("IMAGES IN MAIN PAGE", images);
  // }
  console.log("IMAGES IN MAIN PAGE", images);
}, [images]);
  

  // if (images.length === 0)
  //   return (
  //     <EmptyTextComponent
  //       image={empty_icon}
  //       text="Тут ещё нет картинок. Пора бы их добавить"
  //     />
  //   );
  return (
    <section className="wrapper_layout">
      {/* {images.map(image => (
  <ImageCard
    key={image._id}
    name={image.imageOrgName}
    tags={image.imageTags}
    image={image.imageHash}
    idImage={image._id}
  />
))} */}

      
        {/* {images.map((image) => {(
          
          // <ImageCard key={image.imageHash}
          // name={image.imageSetName}
          // tags={image.imageTags}
          // image={image.imageHash}
          // idImage = {image.imageHash}
          // />
          console.log("image in image map: name", image, image.imageSetName, "tags: ", image.imageTags, "image: ", image.imageHash)

        )})} */}
{/* {images} */}
            {/* console.log("image in image map", image)
          console.log("image in image map: name", image, image.imageSetName, "tags: ", image.imageTags, "image: ", image.imageHash) */}


    </section>
  );
}
