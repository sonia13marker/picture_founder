import { useState } from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import EditIcon from "../../icons/EditIcon";
import ShareIcon from "../../icons/ShareIcon";
import "./ActionCircle.scss";
import EditImageModal from "../EditImageModal/EditImageModal";
import ShareImageModal from "../ShareImageModal/ShareImageModal";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { PATH_TO_SERVER_GETimg, PATH_TO_SERVER_getImg } from "../../data/constants";
import { deleteUserImage } from "../../store/slices/userSlice";
import { useNotification } from "../../hooks/useNotification";

export default function ActionCircle({ isHover, id, name, tags, image, userToken }) {
  // console.log(dataOfImage);
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeShareModal, setActiveShareModal] = useState(false);
  const [activeDelModal, setActiveDelModal] = useState(false);

  const userId = useSelector(state => state.user.UserId);

  const closeDelModal = () => {
    setActiveDelModal(!activeDelModal);
  }
  const dispatch = useDispatch();

  const { showNotify } = useNotification();

  const deleteImage = () => {
    //отправка запроса на сервер про удаление
    console.log("userId:", userId, "imageId:", id, "userToken:", userToken)
    dispatch(deleteUserImage({userId: userId, imageId: id, userToken: userToken}));
    setActiveDelModal(!activeDelModal);

    //появление уведомлений
    showNotify("Успешно удалено");
  }

  

  return (
    <>
      <span className={isHover ? "wrapper active" : "wrapper"}>
        {/* onClick = и вызвать подходящее модальное окно*/}
        <span
          className="wrapper__circle"
          onClick={() => setActiveEditModal(!activeEditModal)}
          title="Редактировать"
        >
          <EditIcon />
        </span>

        <span className="wrapper__circle" title="Поделиться"
        onClick={() => setActiveShareModal(!activeShareModal)}
        >
          <ShareIcon />
        </span>

        <span className="wrapper__circle" title="Скачать">
          <DownloadIcon />
        </span>

        <span className="wrapper__circle" title="Удалить"
        onClick={() => setActiveDelModal(!activeDelModal)}>
          <DeleteIcon />
        </span>
      </span>
      <EditImageModal
        id={id}
        name={name}
        tags={tags}
        image={image}
        active={activeEditModal}
        setActive={setActiveEditModal}
      />
      <ShareImageModal 
      imageLink={`${PATH_TO_SERVER_GETimg}/${userId}/image/${id}`}
      active={activeShareModal}
      setActive={setActiveShareModal}/>

      {/* for delete icon */}
      <ConfirmModalComponent
      confirmModalActive={activeDelModal}
      setConfirmModalActive={setActiveDelModal}
      nameOfModal="Удаление картинки"
      bodyText="Вы уверены, что хотите удалить? Отменить данное действие невозможно."
      leftBtnName="Отмена"
      rightBtnName="Удалить навсегда"
      leftBtnAction={closeDelModal}
      /*действие для удаления картинки */
      rightBtnAction={deleteImage}
      
      />
    </>
  );
}
