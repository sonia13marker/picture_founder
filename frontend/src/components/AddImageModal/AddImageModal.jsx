import "./AddImageModal.scss";
import React, { useState, useRef } from "react";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import UploadImageComponent from "../UploadImageComponent/UploadImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addImageToPage } from "../../store/slices/userSlice";


export default function AddImageModal({
  active,
  setActive,
  addImage = (f) => f,
}) {
  const dispatch = useDispatch();
  const images = useSelector(state => state.user.images);
  console.log("array of images ", images);

  const addToPage = (dataOfImage) => {
    dispatch(addImageToPage(dataOfImage))
  }

  /*-------------------------*/
  const [file, setFile] = useState(null);
  /*-------------------------*/

  /* for cancel btn */
  const cancelBtnClick = (e) => {
    nameImage.current.value = "";
    tagsImage.current.value = "";
    setFile(null);
    setActive(!active);
    setConfirmModalActive(!confirmModalActive);
  };

  /* для текстовых блоков */
  let nameImage = useRef();
  let tagsImage = useRef();

  /* для отправки картинки на сервер */
  const submitInfoImage = (e) => {
    e.preventDefault();
    const name = nameImage.current.value;
    const tags = tagsImage.current.value;
    const image = {file};
    const key = Math.random();

    const dataOfImage = {name, tags, image, key};

    /*функция добавления картинки на страницу */
    addToPage(dataOfImage);
    
    nameImage.current.value = "";
    tagsImage.current.value = "";
    if (file) {
      setFile(null);
    } else {
      return;
    }
    setActive(!active);
  };
  const checkTheFileFunc = () => {
    if (file || nameImage.current.value || tagsImage.current.value) {
      setConfirmModalActive(!confirmModalActive)
    } else {
      setActive(!active);
    }
  }
  /* для модальных окон-подтверждений */
  const [confirmModalActive, setConfirmModalActive] = useState(false);

  return (
    <>
      <div className={active ? "modal activeModal" : "modal"}>
        <div
          className="modal__content"
          // onClick={(e) => e.stopPropagation()}
        >
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
            <UploadImageComponent
              file={file}
              setFile={setFile}
              name={nameImage}
            />
            {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
            <div
              className="modal__content__body__infoBlock"
              onSubmit={submitInfoImage}
            >
              {/* отображения инпута с названием картинки */}
              <span className="input__wrapper">
                <label className="input__label" htmlFor="nameImg">
                  Название картинки
                  <input
                    className="input modalInput"
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
                  onClick={checkTheFileFunc}
                >
                  Отмена
                </button>

                <button 
                className="modal__content__body__infoBlock__wrapper__fillBtn"
                onClick={submitInfoImage}>
                  Добавить
                </button>
              </span>
            </div>
          </span>
        </div>
        <ConfirmModalComponent
        confirmModalActive={confirmModalActive}
        setConfirmModalActive={setConfirmModalActive}
        nameOfModal="Сохранение изменений"
        bodyText="Если Вы выйдете сейчас, изменения не будут сохранены."
        leftBtnName="Отмена изменений"
        rightBtnName="Сохранить изменения"
        leftBtnAction={cancelBtnClick}
        // будущее сохранение картинки, которое переходит к закрыванию окна?? rightBtnAction={""}
      /> 
      </div>
    </>
  );
}
