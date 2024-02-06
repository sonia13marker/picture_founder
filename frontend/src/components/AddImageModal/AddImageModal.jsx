import "./AddImageModal.scss";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import UploadImageComponent from "../UploadImageComponent/UploadImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addUserImage, setError, showNotification } from '../../store/slices/userSlice';
import { ACCEPT_FILE_TYPE, MAX_SIZE_OF_FILE } from "../../data/constants";
import CustomNotifications from "../CustomNotifications/CustomNotifications";
import { useCookies } from "react-cookie";
import he from "he";


export default function AddImageModal({ active, setActive }) {
  /*------работа с изображениями-----------*/
  const [file, setFile] = useState(null);
  const [size, setSize] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileError, setFileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageName, setImageName] = useState("");
  /*-------------------------*/

  const [cookies2, ] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, ] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  const handleChangeNameImage = (e) => {
    setImageName(he.escape(e.target.value));
  }
  //отслеживание ошибок, связанных с изображениями
    useEffect(() => {
      if (!file){
        setFileError("Изображение является обязательным!");
      } else  if (!ACCEPT_FILE_TYPE.includes(fileType)) {
        setFileError("Неверный тип файла!");
      } else if (size > MAX_SIZE_OF_FILE) {
        setFileError("Размер файла превышает 20МБ!");
      } else {
        setFileError("");
      }
    },[file, fileType, size]);

    /* для тегов */
    let tagsImage = useRef();

  /* for cancel btn */
  const cancelBtnClick = (e) => {
    setImageName("");
    tagsImage.current.value = "";
    setFile(null);
    setActive(!active);
    setConfirmModalActive(!confirmModalActive);
  };

  /* для отправки картинки на сервер */
  const dispatch = useDispatch();
  const getError = useSelector(state => state.user.error);
  console.log("getError", getError)

  //проверка наличия имени
  useEffect(() => {
    if (imageName === "") {
      setNameError("Имя является обязательным!");
    } else {
      setNameError("");
    };
  }, [imageName]);


// функция добавления на страницу
  const submitInfoImage = (e) => {
    e.preventDefault();
    const tags = tagsImage.current.value;
    const image = {file};

     let imageTags = he.escape(tags).split(",").map((tg) => tg.trim());

     

    //преобразование строки в массив строк  
    if (cookieId && cookieToken && image && imageName && imageTags && !fileError && !nameError) {
           console.log('cookieId: ', cookieId, 'token: ', cookieToken, 'data: ', image, imageName, imageTags);
           dispatch(addUserImage({userId: cookieId, userToken: cookieToken, image: image, imageName:imageName, imageTags: imageTags}));
         } 
         
    //обнуление имеющихся значений
    setImageName("");
    tagsImage.current.value = "";
    if (file) {
      setFile(null);
    } else {
      return;
    }
    setActive(!active); 

  };

  useEffect(() => {
    if (getError === 402) {
      dispatch(showNotification("Эта картинка уже была добавлена"))
      dispatch(setError(null));
    }
  }, [getError, dispatch])
 
  const checkTheFileFunc = () => {
    if (file || imageName || tagsImage.current.value) {
      setConfirmModalActive(!confirmModalActive)
    } else {
      setActive(!active);
    }
  }

  //проверка на сохранение значений для кнопки "rightBtnAction"
  const saveTheChanges = (e) => {

    checkTheFileFunc();

    if ((file && imageName) || (file && tagsImage.current.value) || (imageName && tagsImage.current.value)) {
      checkTheFileFunc();
    }; 
    
    if (file && imageName && tagsImage.current.value) {
      submitInfoImage(e);
    };
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
              name={imageName}
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
                    value={imageName}
                    onChange={handleChangeNameImage}
                    placeholder="Введите название картинки"
                    required
                  />
                </label>

                <p className='input__error'>
                {nameError}
            </p>
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
        rightBtnAction={saveTheChanges}
      /> 
      <CustomNotifications />
      </div>
    </>
  );
}
