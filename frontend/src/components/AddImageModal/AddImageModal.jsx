import "./AddImageModal.scss";
import add_img from "../../images/add_img.svg";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import CustomInput from "../CustomInput/CustomInput";

export default function AddImageModal({ active, setActive, addImage = f => f }) {
  /*for drag & drop file */
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    maxSize: 1024 * 1024 * 5,
    maxFiles: 1,
  });

    /* for delete btn on hovered image */
    const deleteBtnClick = () => {
      setFile(null);
      setSelectedImage(null);
    }

    /* for cancel btn */
  const cancelBtnClick = () => {
    setFile(null);
    setSelectedImage(null);
    setActive(false);
    setConfirmModalActive(false);
  };

  /* for detected firefox */
  const [browser, setBrowser] = useState("");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Firefox")) {
      setBrowser("Firefox");
    }
  }, []);

  /*for button "add image" in firefox browser */
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setSelectedImage(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

/* вот тут внутри стили для кнопки удаления,
которая появляется при добавлении картинки */
  const fileList = file && (
    <div className="addBlock__wrapper2">
      <button className="addBlock__wrapper2__btnDel" onClick={deleteBtnClick}>
        Удалить картинку
      </button>
      <img
        className="addBlock__wrapper__image"
        src={file.preview}
        alt={file.name}
      />
    </div>
  );

  /*для отображения кнопки удаления
  с картинкой в firefox */
  const fileList2 = (
    <div className="addBlock__wrapper2">
       {browser === "Firefox" ? <>
  <img
      className="addBlock__wrapper__image"
      src={selectedImage}
      alt="Uploaded"
    />
    <button className="addBlock__wrapper2__btnDel"
    onClick={deleteBtnClick}
    >
      Удалить картинку
    </button>
    </>
: <></> }
</div>
  );


  /* для текстовых блоков */
  let nameImage = useRef();
  let tagsImage = useRef();

  const submitInfoImage = e => {
    e.preventDefault();
    const name = nameImage.current.value;
    const tags = tagsImage.current.value;
    const image = {selectedImage};

    /*функция добавления картинки на страницу */
    addImage(name, tags);

    // console.log(`name of img: ${name}, tags image: ${tags}, ${image}`);
    nameImage.current.value = "";
    tagsImage.current.value = "";
    /*тут идет очистка места картинки и 
    закрытие модального окна */
    cancelBtnClick();
  }

  /* для модальных окон-подтверждений */
  const [confirmModalActive, setConfirmModalActive] = useState(false);

  const getActiveConfirmModal = () => {
    // console.log("ldspgkdpkbgodkfgop");
    setConfirmModalActive(true);
  }

  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <span className="modal__content__head">
          <h3 className="modal__content__head__h3">Добавить картинку</h3>
          <span
            className="modal__content__head__img"
            onClick={() => setActive(false)}
          ></span>
        </span>

        <span className="modal__content__body">
          {/*обертка для блока DD и текста*/}
          <span className="modal__content__body__wrapper">

          {/*блок с добавлением картинки drag&drop */}
          <div
            className={isDragActive ? "addBlock active" : "addBlock"}
            {...getRootProps()}
          >
            {selectedImage ? (
              <>{fileList2}
              </>
            ) : (
              <>
                {fileList}
                {!file && (
                  <>
                    <span className="addBlock__wrapper">
                      <img src={add_img} alt="" />
                      <p className="addBlock__wrapper__p">
                        Перетащите файл сюда или
                      </p>
{/* кнопка со стилями специально для Firefox */}
                      {browser === "Firefox" ? (
                        <>
                          <label htmlFor="uploadImg" className="modal__label">
                            Выберите файл
                            <input
                              type="file"
                              name="uploadImg"
                              id="uploadImg"
                              accept="image/png, image/jpeg, image/jpg"
                              className="modal__outline"
                              onChange={handleFileUpload}
                            ></input>
                          </label>
                        </>
                      ) : (
                        <button
                          name="uploadImg"
                          id="uploadImg"
                          className="addBlock__wrapper__outlineBtn"
                        >
                          {" "}
                          Выберите файл
                        </button>
                      )}
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          <p className="addBlock__p">
          Допускаются файлы .png, .jpg, .jpeg размером до <span>20 МБ.</span>
          </p>
           </span>

          {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
          <form 
          className="modal__content__body__infoBlock"
          onSubmit={submitInfoImage}
          >
            {/* <label
              className="modal__content__body__infoBlock__label"
              htmlFor="nameImg"
            >
              Название картинки
              <input
                type="text"
                name="nameImg"
                id="nameImg"
                ref={nameImage}
                className="modal__content__body__infoBlock__input"
                placeholder="Введите название картинки"
                // required
              />
            </label> */}
            <CustomInput inputId="nameImg" inputRef={nameImage} placeholder="Введите название картинки" labelName="Название картинки" errorMessage="Привет я ошибка"/>

            <label
              className="modal__content__body__infoBlock__label"
              htmlFor="tagsImg"
            >
              Теги картинки (через запятую)
              <textarea
                name="tagsImg"
                id="tagsImg"
                ref={tagsImage}
                className="modal__content__body__infoBlock__textarea"
                placeholder="Введите теги для картинки, например: тег, тег2, тег три"
                required
              ></textarea>
            </label>

            <span className="modal__content__body__infoBlock__wrapper">
              <button
                className="modal__content__body__infoBlock__wrapper__outlineBtn"
                // onClick={cancelBtnClick}
                onClick={() => setConfirmModalActive(true)}
              >
                Отмена
              </button>

              <button className="modal__content__body__infoBlock__wrapper__fillBtn">
                Добавить
              </button>
            </span>
          </form>
        </span>
        {/* {active &&  } */}
        
      </div>
      {
        active && 
    <ConfirmModalComponent
     confirmModalActive={confirmModalActive} setConfirmModalActive={setConfirmModalActive} 
    //  active={active}
     nameOfModal="Сохранение изменений" bodyText="Если Вы выйдете сейчас, изменения не будут сохранены." leftBtnName="Отмена" rightBtnName="Сохранить изменения"
     leftBtnAction={cancelBtnClick} 
     // будущее сохранение картинки, которое переходит к закрыванию окна?? rightBtnAction={""}
      />
  
        }  
    </div>
  );
}
