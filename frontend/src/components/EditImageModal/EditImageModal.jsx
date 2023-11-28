import './EditImageModal.scss';
import { useState, useRef } from 'react';
import ConfirmModalComponent from '../ConfirmModalComponent/ConfirmModalComponent';

export default function EditImageModal ({active, setActive, id, name, tags, image}) {
      /* для модальных окон-подтверждений */
  const [confirmModalActive, setConfirmModalActive] = useState(false);
  
  /* для текстовых блоков */
  let nameImage = useRef();
  let tagsImage = useRef();

  /*for submit */
  const saveTheDataImage = (e) => {
    e.preventDefault();

  }

  /* for cancel btn */
  const cancelBtnClick = () => {
    setActive(!active);
    setConfirmModalActive(!confirmModalActive);
  }
    return (<>
        <div className={active ? "modal activeModal" : "modal"}>
        <div className="modal__content" 
        //onClick={(e) => e.stopPropagation()}
        >
          <span className="modal__content__head">
            <h3 className="modal__content__head__h3">Редактировать картинку</h3>
            {/* тут идет обычкновенное закрытие текущего окна
          с сохранением картинки*/}
            <span
              className="modal__content__head__img"
              onClick={() => setActive(!active)}
            ></span>
          </span>

          <span className="modal__content__body">

            <div className='modal__content__body__wrapper'>
            <span className='modal__content__body__imgBlock'>
                <img className='modal__content__body__imgBlock__img' src={image} alt={name} />
            </span>
            </div>

            

            {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
            <form
              className="modal__content__body__infoBlock"
              onSubmit={saveTheDataImage}
            >
              {/* отображения инпута с названием картинки */}
              <span className="input__wrapper">
                <label className="input__label" htmlFor="nameImg">
                  Название картинки
                  <input
                    className="input"
                    type="text"
                    id="nameImg"
                    ref={nameImage}
                    defaultValue={name}
                    placeholder="Введите название картинки"
                  />
                </label>
              </span>

              {/* отображения инпута textarea с тегами картинки */}
              <label className="input__label" htmlFor="tagsImg">
                Теги картинки
                <textarea
                  className="input__textarea"
                  id="tagsImg"
                  ref={tagsImage}
                  defaultValue={tags}
                  placeholder="Введите теги для картинки, например: тег, тег2, тег три"
                ></textarea>
              </label>
              <span className="modal__content__body__infoBlock__wrapper autoBtn">
                <button
                  className="modal__content__body__infoBlock__wrapper__outlineBtn"
                  // onClick={cancelBtnClick}
                  onClick={() => setConfirmModalActive(!confirmModalActive)}
                >
                  Отмена
                </button>

                <button className="modal__content__body__infoBlock__wrapper__fillBtn">
                Сохранить
                </button>
              </span>
            </form>
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

      </>)
}