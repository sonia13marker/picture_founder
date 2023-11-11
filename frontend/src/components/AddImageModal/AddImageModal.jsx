import "./AddImageModal.scss";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Dropzone from "../Dropzone/Dropzone";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";

export default function AddImageModal({ active, setActive, addImage = f => f }) {
  
/*-------------------------*/
const [file, setFile] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);
/*-------------------------*/ 

    /* for cancel btn */
  const cancelBtnClick = () => {
    setActive(false);
    setConfirmModalActive(!confirmModalActive);
  };

  /* для текстовых блоков */
  let nameImage = useRef();
  let tagsImage = useRef();

  /* для отправки картинки на сервер */
  const submitInfoImage = e => {
    e.preventDefault();
    const name = nameImage.current.value;
    const tags = tagsImage.current.value;
    // const image = {selectedImage};

    /*функция добавления картинки на страницу */
    addImage(name, tags);

    // console.log(`name of img: ${name}, tags image: ${tags}, ${image}`);
    nameImage.current.value = "";
    tagsImage.current.value = "";
    setFile(null);
    setSelectedImage(null);
    setActive(!active);
  }
  /* для модальных окон-подтверждений */
  const [confirmModalActive, setConfirmModalActive] = useState(false);


  return (<>
    <div className={active ? "modal activeModal" : "modal"}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <span className="modal__content__head">
          <h3 className="modal__content__head__h3">Добавить картинку</h3>
          {/* тут идет обычкновенное закрытие текущего окна
          с сохранением картинки*/}
          <span
            className="modal__content__head__img"
            onClick={() => setActive(!active)}
          ></span>
        </span>

        <span className="modal__content__body">
{/* добавление картинки в компоненте */}
<Dropzone file={file} setFile={setFile} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>

          {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
          <form 
          className="modal__content__body__infoBlock"
          onSubmit={submitInfoImage}
          >

{/* отображения инпута с названием картинки */}
<span className="input__wrapper">
       <label className="input__label" htmlFor="nameImg">
       Название картинки

         <input
           className="input"
           type="text"
           id="nameImg"
           ref={nameImage}
           placeholder="Введите название картинки"
         />
     </label>
     </span>

{/* отображения инпута textarea с тегами картинки */}
<label className="input__label" htmlFor="tagsImg">
Теги картинки (через запятую)

      <textarea
        className="input__textarea"
        id="tagsImg"
        ref={tagsImage}
        placeholder="Введите теги для картинки, например: тег, тег2, тег три"
      ></textarea>
    </label>
            <span className="modal__content__body__infoBlock__wrapper">
              <button
                className="modal__content__body__infoBlock__wrapper__outlineBtn"
                // onClick={cancelBtnClick}
                onClick={() => setConfirmModalActive(!confirmModalActive)}
              >
                Отмена 
              </button>
              

              <button className="modal__content__body__infoBlock__wrapper__fillBtn">
                Добавить
              </button>
            </span>
          </form>
        </span>
        
      </div>
      {/* {
        active &&  */}
    
   
{/*   
        }   */}
        
    </div>

    <ConfirmModalComponent
     confirmModalActive={confirmModalActive} setConfirmModalActive={setConfirmModalActive} 
     nameOfModal="Сохранение изменений" bodyText="Если Вы выйдете сейчас, изменения не будут сохранены." leftBtnName="Отмена изменений" rightBtnName="Сохранить изменения"
     leftBtnAction={cancelBtnClick} 
     // будущее сохранение картинки, которое переходит к закрыванию окна?? rightBtnAction={""}
      /> 
     
 </> );
}
