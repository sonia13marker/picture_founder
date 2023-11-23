import { useState } from "react";
import DeleteIcon from "../DeleteIcon";
import DownloadIcon from "../DownloadIcon";
import EditIcon from "../EditIcon";
import ShareIcon from "../ShareIcon";
import "./ActionCircle.scss";
import EditImageModal from "../EditImageModal/EditImageModal";
import ShareImageModal from "../ShareImageModal/ShareImageModal";
import ConfirmModalComponent from "../ConfirmModalComponent/ConfirmModalComponent";

export default function ActionCircle({ isHover, id, name, tags, image }) {
  // console.log(dataOfImage);
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeShareModal, setActiveShareModal] = useState(false);
  const [activeDelModal, setActiveDelModal] = useState(false);

  const closeDelModal = () => {
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
      /*действие для удаления картинки 
      rightBtnAction={}*/
      
      />
    </>
  );
}
