import './EditImageModal.scss';
import { useState, useRef } from 'react';
import ConfirmModalComponent from '../ConfirmModalComponent/ConfirmModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserImage, getImages, showNotification } from '../../store/slices/userSlice';
import { PATH_TO_SERVER_GETimg } from '../../data/constants';

export default function EditImageModal ({active, setActive, id, name, tags, image}) {
      /* для модальных окон-подтверждений */
  const [confirmModalActive, setConfirmModalActive] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.UserId);
  const userToken = useSelector(state => state.user.userToken);
  /* для текстовых блоков */
  let nameImage = useRef();
  let tagsImage = useRef();

   const [imageName, setImageName] = useState("");
   const [tags2, setImageTags] = useState("");

const handleChangeName = (event) => {
  setImageName(event.target.value);
}

const handleChangeTags = (e) => {
  const data = e.target.value;
  setImageTags(data.split(",").map( tg => tg.trim()));
}


const imageId = id;

  /*for submit */
  const saveTheDataImage = async (e) => {
    e.preventDefault();
    //тут идет проверка на изменяемое значение, и в зависимости от его кол-ва
    //отправляется соответствующий запрос
    if (imageName || tags2) {
      if (imageName) {
        console.log('fucj', tags)
        dispatch(changeUserImage({userId: userId, imageId: imageId, userToken: userToken, imageName: imageName, imageTags: tags}));
      } else if (tags2) {
        dispatch(changeUserImage({userId: userId, imageId: imageId, userToken: userToken, imageName: name, imageTags: tags2}));
      } else if (imageName && tags2) {
        dispatch(changeUserImage({userId: userId, imageId: imageId, userToken: userToken, imageName: imageName, imageTags: tags2}));
      }
      //setActive(!active);

    } else {
      console.log("no changes");
    }

    //появление уведомлений
    dispatch(showNotification("Изменения сохранены"));
    setTimeout(() => {
      dispatch(showNotification(""));
     }, 4000)

  }

  //проверка на сохранение значений для кнопки "rightBtnAction"
  const saveTheChanges = (e) => {
    saveTheDataImage(e);
  }

  const showConfirmModal = () => {
    console.log(imageName === "", tags2 === "", name, imageName, tags, tags2);
    if (imageName === "" && tags2 === "") {
      setActive(!active);
    }
    else 
    {
      setConfirmModalActive(!confirmModalActive);
    }
  }

  /* for cancel btn */
  const cancelBtnClick = () => {
    //при отмене изменений отправляем запрос на изменние с тегами, которые были до этого
    //setImageTags(tags);
    dispatch(changeUserImage({userId: userId, imageId: imageId, userToken: userToken, imageName: name, imageTags: tags}));
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
            {/* тут идет обыкновенное закрытие текущего окна
          с сохранением картинки*/}
            <span
              className="modal__content__head__img"
              onClick={() => setActive(!active)}
            ></span>
          </span>

          <span className="modal__content__body">

            <div className='modal__content__body__wrapper'>
            <span className='modal__content__body__imgBlock'>
                <img className='modal__content__body__imgBlock__img' src={`${PATH_TO_SERVER_GETimg}/${userId}/image/${imageId}`} alt={name} />
            </span>
            </div>
            {/*блок с инфой о картинке - название и теги,
                    плюс кнопки действия */}
            <div
              className="modal__content__body__infoBlock"
              //onSubmit={saveTheDataImage}
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
                    onChange={handleChangeName}
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
                  onChange={handleChangeTags}
                ></textarea>
              </label>
              <span className="modal__content__body__infoBlock__wrapper autoBtn">
                <button
                  className="modal__content__body__infoBlock__wrapper__outlineBtn"
                  // onClick={cancelBtnClick}
                  onClick={showConfirmModal}
                >
                  Отмена
                </button>

                <button type='submit'
                className="modal__content__body__infoBlock__wrapper__fillBtn"
                onClick={saveTheDataImage}>
                Сохранить
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
      </div>

      </>)
}