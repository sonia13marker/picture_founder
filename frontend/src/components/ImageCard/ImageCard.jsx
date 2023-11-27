import "./ImageCard.scss";
import { useState } from "react";
import ActionCircle from "../ActionCircle/ActionCircle";
import {useDispatch, useSelector} from "react-redux";
import {toggleFavorites} from "../../store/slices/userSlice";
import FavorFillIcon from "../FavorFillIcon";
import FavorOutlineIcon from "../FavorOutlineIcon";
// import { addImageToFavorite } from "../../store/slices/userSlice";

export default function ImageCard({ currentUserId, imageName, imageTegs, image, 
}) {

  console.log(currentUserId, imageName, imageTegs, image);
  /*функция для преобразования тегов 
  .trim() для удаления пробелов до и после слова*/
  let newTagList = imageTegs
    .split(",")
    .map((tag) => {
      tag = tag.trim();
      tag = "#" + tag;
      tag = tag.replaceAll(" ", "_");
      tag = tag + " ";
      return tag;
    })

  /*для проверки наведения на карточку */
  const [isHover, setIsHover] = useState(false);

  const handleMouseHover = () => {
    setIsHover(true);
  };
  const handleMouseDown = () => {
    setIsHover(false);
  };

   const itemData = { currentUserId, imageName, imageTegs, image };
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.user.favorite);

  const inFavorite = favorite.some((item) => item.id === currentUserId);


  const addToFavorite = () => {
    dispatch(toggleFavorites({...itemData}));
  }
  return (
    <span
      className="layout__card__wrapper"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseDown}
    >
      <div className="layout__card__wrapper__actions">
        <ActionCircle 
        id={currentUserId} name={imageName} tags={imageTegs} image={image}
        isHover={isHover}/>
      </div>
      <div className="layout__card">
        <span className="layout__card__titleWrap">
          <h3 className="layout__card__titleWrap__title">{imageName}</h3>
          <span onClick={() => addToFavorite(itemData)} className="layout__card__titleWrap__icon">
            {
              inFavorite ? <FavorFillIcon /> : <FavorOutlineIcon />
            }
          </span>
        </span>

        <img src={image.file} alt={imageName} className="layout__card__image" />
        <p className="layout__card__tagList">{newTagList}</p>
      </div>
    </span>
  );
}
