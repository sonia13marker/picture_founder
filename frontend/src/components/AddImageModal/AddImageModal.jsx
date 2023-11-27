import "./AddImageModal.scss";
import React, { useState, useRef } from "react";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import UploadImageComponent from "../UploadImageComponent/UploadImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addImageToPage } from "../../store/slices/userSlice";
import addUserImage from '../../store/slices/userSlice';
import axios from "axios";


export default function AddImageModal({
  active,
  setActive,
  //addImage = (f) => f,
}) {
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

  const dispatch = useDispatch();
  const images = useSelector(state => state.user.images);
  const id = useSelector(state => state.user.UserId);
  console.log("what is it?", id);
  console.log("array of images ", images);

  // const addToPage = (dataOfImage) => {
  //   dispatch(addImageToPage({dataOfImage: dataOfImage}, { id: currentUserId}))
  // }
  
  /*старый не рабочий код 
  const submitInfoImage = (e) => {
    e.preventDefault();
    const imageName = nameImage.current.value;
    const imageTegs = tagsImage.current.value;
    const image = {file};
    const key = Math.random();


    const dataOfImage = {id, image, imageName, imageTegs};

    /*функция добавления картинки на страницу 
    // addToPage(dataOfImage);
    dispatch(addUserImage(dataOfImage))

    nameImage.current.value = "";
    tagsImage.current.value = "";
    if (file) {
      setFile(null);
    } else {
      return;
    }
    setActive(!active);
  };*/
  /* странно работающий код, но отправляющий запрос на сервер */
  const submitInfoImage = async (e) => {
    e.preventDefault();
    const imageName = nameImage.current.value;
    const imageTegs = tagsImage.current.value;
  
    const formData = new FormData();
    formData.append('file', file); // добавляем файл в объект FormData
    formData.append('imageName', imageName);
    formData.append('imageTegs', imageTegs);
  
    try {
      const res = await axios.post(`http://95.31.50.131/api/user/${id}/image`, formData);
      console.log("res data in addImage", res.data);
      dispatch(addImageToPage(formData));
      nameImage.current.value = "";
      tagsImage.current.value = "";
      setFile(null);
      setActive(!active);
    } catch (err) {
      console.log(err);
      // const serializedError = err.toJSON();
      // return thunkAPI.rejectWithValue(serializedError);
    }
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
