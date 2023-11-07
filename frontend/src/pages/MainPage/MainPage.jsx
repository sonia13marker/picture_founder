import "./MainPage.scss";
import empty_icon from "../../images/empty_main.svg";
import EmptyTextComponent from "../../components/EmptyTextComponent/EmptyTextComponent";
import ImageCard from "../../components/ImageCard/ImageCard";
import { useState } from "react";
import FavoriteComponent from "../../components/FavoriteComponent/FavoriteComponent";

/*тут мы отображаем либо компонент с сеткой из всех картинок,
либо пустой компонент, если картинок еще нет */
export default function MainPage({ images = [], favorites, setFavorites, addToFavorites, favor, setFavor, inFavorite, setInFavorite, addToFavorite
  // inFavorite, setInFavorite 
}) {

  // const addToFavorite = (id) => {
  //   if (favor.includes(id)) {
  //     return null
  //   } else {
  //     setInFavorite(!inFavorite);
  //   }
  
  //   setFavor((prevFavor) => [...prevFavor, id]);
  // }
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
          <ImageCard key={image.id} {...image} favorites={favorites} setFavorites={setFavorites} 
          
          icon={
            <FavoriteComponent key={image.id} inFavorite={inFavorite}/>
          }
          addToFavorite={addToFavorite} 
          inFavorite={inFavorite} 
          setInFavorite={setInFavorite}
          />
        ))}
    </section>
  );
}
