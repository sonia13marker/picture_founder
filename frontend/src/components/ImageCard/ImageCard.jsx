import "./ImageCard.scss";
import { useState } from "react";
import ActionCircle from "../ActionCircle/ActionCircle";
import FavorFillIcon from "../FavorFillIcon";
import FavorOutlineIcon from "../FavorOutlineIcon";
import FavoriteComponent from "../FavoriteComponent/FavoriteComponent";

export default function ImageCard({ id, name, tags, image, addToFavorites, inFavorite, setInFavorite }) {
  /*функция для преобразования тегов */
  let newTagList = tags
    .split(", ")
    .map((tag) => "#" + tag)
    .join(" ");

  /*для проверки наведения на карточку */
  const [isHover, setIsHover] = useState(false);

  const handleMouseHover = () => {
    setIsHover(true);
  };
  const handleMouseDown = () => {
    setIsHover(false);
  };


  return (
    <span
      className="layout__card__wrapper"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseDown}
    >
      <div className="layout__card__wrapper__actions">
        <ActionCircle isHover={isHover} setIsHover={setIsHover} />
      </div>
      <div className="layout__card">
        <span className="layout__card__titleWrap">
          <h3 className="layout__card__titleWrap__title">{name}</h3>
          <span onClick={() => addToFavorites(id)}>
            {/* <FavorFillIcon />  <FavorOutlineIcon /> */}
            <FavoriteComponent inFavorite={inFavorite} setInFavorite={setInFavorite}/>
          </span>
        </span>

        <img src={image} alt={name} className="layout__card__image" />
        <p className="layout__card__tagList">{newTagList}</p>
      </div>
    </span>
  );
}
