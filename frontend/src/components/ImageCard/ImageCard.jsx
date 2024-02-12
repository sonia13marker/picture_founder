import "./ImageCard.scss";
import { useEffect, useState } from "react";
import ActionCircle from "../ActionCircle/ActionCircle";
import { useDispatch } from "react-redux";
import { changeUserImage } from "../../store/slices/userSlice";
import FavorFillIcon from "../../icons/FavorFillIcon";
import FavorOutlineIcon from "../../icons/FavorOutlineIcon";
import { PATH_TO_SERVER_GETimg } from "../../data/constants";
import he from "he";

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
      tag = tag.replaceAll(" ", "_").replace(/\n+/g, ' #');
      tag = tag + " ";
      return he.unescape(tag);
    })
  }
  const newName = he.unescape(imageName);
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

  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (isFavorite === true) {
      setFav(false)
    }  else if (isFavorite === false) {
      setFav(true)
    }
  }, [isFavorite])

      /* добавить в избранное */
      const handleToggleFavorite = (itemData) => {
        

        if (fav !== isFavorite) {
          console.log("ЗНАЧЕНИЕ СМЕНИЛОСЬ", fav, isFavorite);
          dispatch(changeUserImage({ ...itemData, isFavor: !isFavorite, favor: "yes" }));
        } else {
          console.log("bad", fav, isFavorite)
        }
        
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
        isHover={isHover} imageExt={imageExt} userId={userId} />
      </div>
      <div className="layout__card">
        <span className="layout__card__titleWrap">
          <h3 className="layout__card__titleWrap__title">{newName}</h3>
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
