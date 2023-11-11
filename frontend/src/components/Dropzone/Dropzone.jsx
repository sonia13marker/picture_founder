import './Dropzone.scss';
import add_img from "../../images/add_img.svg";
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from "react-dropzone";

export default function Dropzone ({file, setFile, selectedImage, setSelectedImage}) {
    /*for drag & drop file */
//   const [file, setFile] = useState(null);

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
    /* for detected firefox */
  const [browser, setBrowser] = useState("");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Firefox")) {
      setBrowser("Firefox");
    }
  }, []);

  /*for button "add image" in firefox browser */
//   const [selectedImage, setSelectedImage] = useState(null);

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
return ( <>
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
</>);
};