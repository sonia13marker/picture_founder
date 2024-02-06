import { useState } from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import EditIcon from "../../icons/EditIcon";
import ShareIcon from "../../icons/ShareIcon";
import "./ActionCircle.scss";
import EditImageModal from "../EditImageModal/EditImageModal";
import ShareImageModal from "../ShareImageModal/ShareImageModal";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";
import { useDispatch } from "react-redux";
import { PATH_TO_SERVER, PATH_TO_SERVER_GETimg } from "../../data/constants";
import { deleteUserImage } from "../../store/slices/userSlice";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function ActionCircle({ isHover, id, name, tags, image, imageExt }) {
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeShareModal, setActiveShareModal] = useState(false);
  const [activeDelModal, setActiveDelModal] = useState(false);

  const closeDelModal = () => {
    setActiveDelModal(!activeDelModal);
  }
  const dispatch = useDispatch();

  const [cookies2, ] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, ] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  const deleteImage = () => {
    //отправка запроса на сервер про удаление
    console.log("userId:", cookieId, "imageId:", id, "userToken:", cookieToken)
    dispatch(deleteUserImage({userId: cookieId, imageId: id, userToken: cookieToken}));
    setActiveDelModal(!activeDelModal);
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
           
      <Link to={id ? `${PATH_TO_SERVER}/user/${cookieId}/image/download/${id}` : null} download={name} target="_blank"
  rel="nofollow noreferrer" className="wrapper__circle" title="Скачать" 
  > 
          <DownloadIcon />
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
