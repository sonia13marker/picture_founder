import "./ImageCard.scss";
import { useEffect, useState } from "react";
import ActionCircle from "../ActionCircle/ActionCircle";
import {useDispatch, useSelector} from "react-redux";
import {getSrcImage, toggleFavorites} from "../../store/slices/userSlice";
import FavorFillIcon from "../FavorFillIcon";
import FavorOutlineIcon from "../FavorOutlineIcon";
import { unwrapResult } from "@reduxjs/toolkit";
// import { addImageToFavorite } from "../../store/slices/userSlice";

export default function ImageCard({ idImage, name, tags, image, 
  UserId, token
}) {
  /*функция для преобразования тегов 
  .trim() для удаления пробелов до и после слова*/
  let newTagList = tags
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

   const itemData = { idImage, name, tags, image };
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.user.favorite);

  const inFavorite = favorite.some((item) => item.id === idImage);


  const addToFavorite = () => {
    dispatch(toggleFavorites({...itemData}));
  }

  //const hello = useSelector(())
  const [imageSRC, setImageSRC]  = useState("");
  useEffect(() => {
    const fetchImageSRC = async () => {
      try {
      const resultAction = await dispatch(getSrcImage({id: UserId, imageId: idImage, token: token}));
      const originalPromiseResult = unwrapResult(resultAction);
      console.log("result src image\e", originalPromiseResult);
      } catch (err) {
        console.error(err);
      }
    }
    fetchImageSRC();
    //dispatch(getSrcImage({id: UserId, imageId: idImage, token: token}))
    // .then(unwrapResult)
    // .then((result) => {
    //   console.log("result src image", result);
    // })
  },[UserId, dispatch, idImage, token]);
  
  return (
    <span
      className="layout__card__wrapper"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseDown}
    >
      <div className="layout__card__wrapper__actions">
        <ActionCircle 
        id={idImage} name={name} tags={tags} image={image}
        isHover={isHover}/>
      </div>
      <div className="layout__card">
        <span className="layout__card__titleWrap">
          <h3 className="layout__card__titleWrap__title">{name}</h3>
          <span 
          onClick={() => addToFavorite(itemData)} 
          className="layout__card__titleWrap__icon">
            {
              inFavorite ? <FavorFillIcon /> : <FavorOutlineIcon />
            }
          </span>
        </span>

        <img src={image} alt={tags} className="layout__card__image" />
        <p className="layout__card__tagList">
          {newTagList}
          </p>
      </div>
    </span>
    // <></>
  );
}
