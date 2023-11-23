import React, { useEffect, useState } from "react";
import "./UploadImageComponent.scss";
import add_img from "../../images/add_img.svg";

export default function UploadImageComponent({ file,
    setFile, name }) {
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
      setFile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /* for delete btn on hovered image */
  const deleteBtnClick = () => {
    setFile(null);
  };

  // useEffect(() => {
  //   setFile(image);
  // }, [image, setFile]);

  console.log("fffff", !!file);
  return (
    <>
      {/*обертка для блока DD и текста*/}
      <span className="modal__content__body__wrapper">
        {/*блок с добавлением картинки drag&drop */}

        <div
          className="addBlock"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {file ? (
            <>
              <div className="addBlock__wrapper2">
                <button
                  className="addBlock__wrapper2__btnDel"
                  onClick={deleteBtnClick}
                >
                  Удалить картинку
                </button>
                <img
                  className="addBlock__wrapper__image"
                  src={file}
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
                  accept="image/png, image/jpeg, image/jpg"
                  className="modal__outline"
                  onChange={handleFileUpload}
                ></input>
              </label>
            </span>
          )}
        </div>
        <p className="addBlock__p">
          Допускаются файлы .png, .jpg, .jpeg размером до <span>20 МБ.</span>
        </p>
      </span>
    </>
  );
}
