import './AddImageModal.scss';
import add_img from '../../images/add_img.svg';
import { useState } from 'react';

export default function AddImageModal ({active,setActive}) {

    /*for button "add image" */
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
    return (
        <div className={active ? "modal active" : "modal"}>
            <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                <span className='modal__content__head'>
                    <h3 className='modal__content__head__h3'>
                    Добавить картинку
                    </h3>
                    <span className="modal__content__head__img" onClick={() => setActive(false)}>
                    </span>
                </span>

                <span className='modal__content__body'>
                    {/*блок с добавлением картинки drag&drop */}
                    <div className='modal__content__body__addBlock'>
                        <span className="modal__content__body__addBlock__wrapper">
                            {selectedImage ? (
                                    <img 
                                      src={selectedImage} 
                                      alt="Uploaded"
                                      className="modal__content__body__addBlock__wrapper__image"
                                    />
                                  ) : 
                                  ( <>
<img src={add_img} alt=""/>
                            <p className="modal__content__body__addBlock__wrapper__p">
                            Перетащите файл сюда или
                            </p>


                            <input type='file'
                            name="uploadImg"
                            id='uploadImg'
                            accept="image/png, image/jpeg"
                            onChange={handleFileUpload}
                            className='modal__content__body__addBlock__wrapper__outlineBtn' 
                            placeholder="Выберите файл">
                            </input>
                            </> )
                            }
                            
                        </span>
                    </div>

                    {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
                    <div className='modal__content__body__infoBlock'>
                        <label className='modal__content__body__infoBlock__label' htmlFor='nameImg'>
                            <input type='text' name='nameImg' id='nameImg' className='modal__content__body__infoBlock__input'/>

                        </label>

                        <label className='modal__content__body__infoBlock__label' htmlFor='tagsImg'>
                            <textarea name='tagsImg' id='tagsImg' className='modal__content__body__infoBlock__textarea'> </textarea>

                        </label>

                        <span className='modal__content__body__infoBlock__wrapper'>
                        <button className='modal__content__body__infoBlock__wrapper__outlineBtn'>
                        Отмена
                        </button>

                        <button className='modal__content__body__infoBlock__wrapper__fillBtn'>
                        Добавить
                        </button>

                    </span>
                    </div>

                    

                </span>


            </div>
        </div>
    )
}