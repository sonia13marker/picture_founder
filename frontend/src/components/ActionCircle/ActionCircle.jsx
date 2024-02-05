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
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function ActionCircle({ isHover, id, name, tags, image, userToken, imageExt, imageSrc }) {
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

  const [cookies2, ] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, ] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  const deleteImage = () => {
    //отправка запроса на сервер про удаление
    console.log("userId:", cookieId, "imageId:", id, "userToken:", cookieToken)
    dispatch(deleteUserImage({userId: cookieId, imageId: id, userToken: cookieToken}));
    setActiveDelModal(!activeDelModal);

    //появление уведомлений
    showNotify("Успешно удалено");
  }

  const imageFile = `${imageSrc}`;
  const imageFile2 = `${image}.${imageExt}`;
  console.log("imageFile", imageFile, image, imageFile2);

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

<Link to={imageFile2}
download={name}
target="_blank"
rel="noreferrer" >
<span className="wrapper__circle" title="Скачать">
          <DownloadIcon />
        </span>
</Link>
        

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
      imageLink={`${PATH_TO_SERVER_GETimg}/${cookieId}/image/${id}`}
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
