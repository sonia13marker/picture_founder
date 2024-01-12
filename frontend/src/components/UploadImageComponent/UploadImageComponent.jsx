import React, { useState } from "react";
import "./UploadImageComponent.scss";
import add_img from "../../images/add_img.svg";
import { ACCEPT_FILE_TYPE } from "../../data/constants";

export default function UploadImageComponent({ file,
    setFile, name, setSize, fileError, setFileError, setFileType }) {

      /*for preview file */
      const [previewFile, setPreviewFile] = useState(null);

      /*for classnames */
      const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewFile(reader.result)
      setFile(file);
    };

    reader.readAsDataURL(file);
    const fileSize = file.size;
    const fileType = file.type;
    setSize(fileSize);
    setFileType (fileType);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  /* for delete btn on hovered image */
  const deleteBtnClick = () => {
    setFile(null);
    setFileError("");
    setIsDragOver(false);
  };

  return (
    <>
      {/*обертка для блока DD и текста*/}
      <span className="modal__content__body__wrapper">
        {/*блок с добавлением картинки drag&drop */}

        <div
          className={ isDragOver ? "addBlock active" : "addBlock no_active"}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          draggable="true"
        >
          {file ? (
            <>
              <div className="addBlock__wrapper2">
                <button
                  className="addBlock__wrapper2__btnDel"
                  onClick={deleteBtnClick}
                >
                  Удалить файл
                </button>
                <img
                  className="addBlock__wrapper__image"
                  src={previewFile}
                  alt={name}
                />
              </div>
            </>
          ) : (
            <span className="addBlock__wrapper">
              <img src={add_img} alt="" />
              <p className="addBlock__wrapper__p">Перетащите файл сюда или</p>
              <label htmlFor="uploadImg" className="modal__label">
                Выберите файл
                <input
                  type="file"
                  name="uploadImg"
                  id="uploadImg"
                  accept={ACCEPT_FILE_TYPE}
                  className="modal__outline"
                  onChange={handleFileUpload}
                ></input>
              </label>
            </span>
          )}
        </div>
        <span className="addBlock__p">
          <p className="input__error">{fileError || null}</p>
          <p className="addBlock__p__text">Допускаются файлы .png, .jpg, .jpeg размером до <span className="addBlock__p__bold">20 МБ.</span></p>
        </span>
      </span>
    </>
  );
}
