import "./AddImageModal.scss";
import add_img from "../../images/add_img.svg";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function AddImageModal({ active, setActive }) {
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
    accept: "image/*",
    maxSize: 1024 * 1024 * 5,
    maxFiles: 1,
  });

  const fileList = file && (
    <img
      className="addBlock__wrapper__image"
      src={file.preview}
      alt={file.name}
    />
  );

  /* for cancel btn */
  const cancelBtnClick = () => {
    setFile(null);
    setSelectedImage(null);
    setActive(false);
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

  const fileList2 = (
    <img
      className="addBlock__wrapper__image"
      src={selectedImage}
      alt="Uploaded"
    />
  );

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
          {/*блок с добавлением картинки drag&drop */}
          <div
            className={isDragActive ? "addBlock active" : "addBlock"}
            {...getRootProps()}
          >
            {selectedImage ? (
              <>{fileList2}</>
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

                      {browser === "Firefox" ? (
                        <>
                          <label htmlFor="uploadImg" className="modal__label">
                            Выберите файл
                            <input
                              type="file"
                              name="uploadImg"
                              id="uploadImg"
                              accept="image/png, image/jpeg"
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

          {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
          <div className="modal__content__body__infoBlock">
            <label
              className="modal__content__body__infoBlock__label"
              htmlFor="nameImg"
            >
              Название картинки
              <input
                type="text"
                name="nameImg"
                id="nameImg"
                className="modal__content__body__infoBlock__input"
                placeholder="Введите название картинки"
              />
            </label>

            <label
              className="modal__content__body__infoBlock__label"
              htmlFor="tagsImg"
            >
              Теги картинки
              <textarea
                name="tagsImg"
                id="tagsImg"
                className="modal__content__body__infoBlock__textarea"
                placeholder="Введите теги для картинки"
              ></textarea>
            </label>

            <span className="modal__content__body__infoBlock__wrapper">
              <button
                className="modal__content__body__infoBlock__wrapper__outlineBtn"
                onClick={cancelBtnClick}
              >
                Отмена
              </button>

              <button className="modal__content__body__infoBlock__wrapper__fillBtn">
                Добавить
              </button>
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}
