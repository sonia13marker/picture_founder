import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useDispatch } from "react-redux";
import { getImages } from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";

export default function MainPage() {


  const id = useSelector(state => state.user.UserId);
  console.log("ID IN MAIN PAGE", id);

  const userToken = useSelector(state => state.user.userToken);
  console.log("TOKEN IN MAIN PAGE", userToken); 

  const dispatch = useDispatch();

 // const images = useSelector((state) => state.user.images);

  const [imagesFromServ, setImagesFromServ] = useState([]);

  //useEffect при помощи promise then
  useEffect(() => {
    dispatch(getImages({ id: id, token: userToken }))
    .then(unwrapResult)
    .then((result) => {
      setImagesFromServ(result);
      console.log("originalPromiseResult", result.images);
    })
  }, [dispatch, id, userToken]);
  console.log( "imagesFromServ", imagesFromServ)

  return (
    <section className="wrapper_layout">
      {imagesFromServ.length !== 0 ? imagesFromServ?.images.map((image) =>  <ImageCard key={image._id} name={image.imageSetName} tags={image.imageTags} image={image.imageHash} idImage={image._id} />
      ) : <EmptyTextComponent
      image={empty_icon}
      text="Тут ещё нет картинок. Пора бы их добавить"
    /> }
      
    </section>
  );
}
