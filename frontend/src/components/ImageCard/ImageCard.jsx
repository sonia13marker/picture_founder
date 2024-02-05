import "./ImageCard.scss";
import { useEffect, useState } from "react";
import ActionCircle from "../ActionCircle/ActionCircle";
import {useDispatch, useSelector} from "react-redux";
import { changeUserImage } from "../../store/slices/userSlice";
import FavorFillIcon from "../../icons/FavorFillIcon";
import FavorOutlineIcon from "../../icons/FavorOutlineIcon";
import { PATH_TO_SERVER_GETimg } from "../../data/constants";
import { useCookies } from "react-cookie";
// import { addImageToFavorite } from "../../store/slices/userSlice";

export default function ImageCard({ imageId, imageName, imageTags, image, 
  userId, userToken, isFavorite, imageExt
}) {
  /*функция для преобразования тегов 
  .trim() для удаления пробелов до и после слова*/
  let newTagList;
  if (imageTags[0] !== null) {
    newTagList = imageTags 
    ?.map((tag) => {
      tag = tag.split(" ").filter(Boolean).join(" ");
      tag = "#" + tag;
      tag = tag.replaceAll(" ", "_");
      tag = tag + " ";
      return tag;
    })
  }
  /*для проверки наведения на карточку */
  const [isHover, setIsHover] = useState(false);

  const handleMouseHover = () => {
    setIsHover(true);
  };
  const handleMouseDown = () => {
    setIsHover(false);
  };

  const itemData = { userId, userToken, imageId, imageName, imageTags, image };
  const dispatch = useDispatch();

      /* добавить в избранное */
      const handleToggleFavorite = (itemData) => {
        dispatch(changeUserImage({ ...itemData, isFavor: !isFavorite }));
      };

  return (
    <span
      className="layout__card__wrapper"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseDown}
    >
      <div className="layout__card__wrapper__actions">
        <ActionCircle 
        id={imageId} name={imageName} tags={imageTags} image={image}
        isHover={isHover} imageExt={imageExt} userId={userId}/>
      </div>
      <div className="layout__card">
        <span className="layout__card__titleWrap">
          <h3 className="layout__card__titleWrap__title">{imageName}</h3>
          <span 
          onClick={() => handleToggleFavorite(itemData)} 
          className="layout__card__titleWrap__icon">
            {
              isFavorite ? <FavorFillIcon /> : <FavorOutlineIcon />
            }
          </span>
        </span>

        <img src={`${PATH_TO_SERVER_GETimg}/${userId}/image/${imageId}`} alt={imageName} className="layout__card__image" />
        <p className="layout__card__tagList">
          {newTagList}
          </p>
      </div>
    </span>
  );
}
