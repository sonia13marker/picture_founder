import "./ImageCard.scss";
import { useEffect, useState } from "react";
import ActionCircle from "../ActionCircle/ActionCircle";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorite, changeUserImage, getImages, toggleFavorite2, toggleFavorites} from "../../store/slices/userSlice";
import FavorFillIcon from "../FavorFillIcon";
import FavorOutlineIcon from "../FavorOutlineIcon";
import { PATH_TO_SERVER_GETimg } from "../../data/constants";
import fav__fill from '../../images/favfill.svg';
import fav__out from '../../images/favoutline.svg';
// import { addImageToFavorite } from "../../store/slices/userSlice";

export default function ImageCard({ imageId, imageName, imageTags, image, 
  userId, userToken, isFavotite
}) {
  /*функция для преобразования тегов 
  .trim() для удаления пробелов до и после слова*/
 console.log("tags from new add??", imageTags);
  let newTagList = imageTags
    // .split(",")
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

   const itemData = { userId, imageId, userToken, imageName, imageTags, image };
  const dispatch = useDispatch();
  // const favorite = useSelector((state) => state.user.favorite);

  // const inFavorite = favorite.some((item) => item.id === idImage);

  // const addToFavorite = () => {
  //   dispatch(toggleFavorites({...itemData}));
  // }

      /* add to favorite */
      const handleToggleFavorite = (itemData) => {
        // dispatch(toggleFavorite2(itemData));
        dispatch(changeUserImage({ ...itemData, isFavotite: false }));
         dispatch(getImages({ id: userId, token: userToken }));
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
        isHover={isHover}/>
      </div>
      <div className="layout__card">
        <span className="layout__card__titleWrap">
          <h3 className="layout__card__titleWrap__title">{imageName}</h3>
          <span 
          onClick={() => handleToggleFavorite(itemData)} 
          className="layout__card__titleWrap__icon">
            {
              isFavotite ? <FavorFillIcon /> : <FavorOutlineIcon />
              //isFavotite ? <img src={fav__fill} alt="" /> : <img src={fav__out} alt="" />
            }
          </span>
        </span>

        <img src={`${PATH_TO_SERVER_GETimg}/${userId}/image/${imageId}`} alt={imageName} className="layout__card__image" />
        <p className="layout__card__tagList">
          {newTagList}
          </p>
      </div>
    </span>
    // <></>
  );
}
