import "./AddImageModal.scss";
import React, { useState, useRef, useEffect } from "react";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import UploadImageComponent from "../UploadImageComponent/UploadImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addUserImage } from '../../store/slices/userSlice';
import { ACCEPT_FILE_TYPE, MAX_SIZE_OF_FILE } from "../../data/constants";


export default function AddImageModal({
  active,
  setActive,
}) {
  /*------работа с изображениями-----------*/
  const [file, setFile] = useState(null);
  const [size, setSize] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileError, setFileError] = useState("");
  /*-------------------------*/

  //отслеживание ошибок, связанных с изображениями
  useEffect(() => {
    if (size > MAX_SIZE_OF_FILE) {
      setFileError("Размер файла превышает 20МБ!")
    } else {
      setFileError("");
    }
  }, [size])

  useEffect(() => {
    if (!ACCEPT_FILE_TYPE.includes(fileType)) {
      setFileError("Неверный тип файла!");
    } else {
      setFileError("");
    }
  }, [fileType]);

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
  // const images = useSelector(state => state.user.images);
  const id = useSelector(state => state.user.UserId);
  const userToken = useSelector(state => state.user.userToken);

  const addToPage = ({id, userToken, image, imageName, imageTags}) => {
    if (id && userToken && image && imageName && imageTags) {
      console.log('id: ', id, 'token: ', userToken, 'data: ', image, imageName, imageTags);
      dispatch(addUserImage({id: id, token: userToken, image: image, imageName:imageName, imageTags: imageTags}));
    }
  }
  const submitInfoImage = (e) => {
    e.preventDefault();
    const imageName = nameImage.current.value;
    const tags = tagsImage.current.value;
    const image = {file};

    //преобразование строки в массив строк  
    let imageTags = [tags.split(",").map((tg) => tg.trim())];

    const dataOfImage = {image, imageName, imageTags};

    // //функция проверки на все заполненные поля
    // const checkTheInputsValue = () => {
    //   if (!file && !imageName && !imageTegs) {
    //     setFileError("Не все поля заполнены!");
    //   } else {
    //     setFileError("");
    //   }
    // } 

    //функция добавления картинки на страницу 
    addToPage({id, userToken, image, imageName, imageTags});

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
              setSize={setSize}
              fileError={fileError}
              setFileError={setFileError}
              setFileType={setFileType}
            />
            {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
            <div
              className="modal__content__body__infoBlock"
              //onSubmit={submitInfoImage}
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
                    required
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
                  required
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
        rightBtnAction={submitInfoImage}
        // будущее сохранение картинки, которое переходит к закрыванию окна?? rightBtnAction={""}
      /> 
      </div>
    </>
  );
}
