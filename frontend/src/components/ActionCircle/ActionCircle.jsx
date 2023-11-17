import { useState } from "react";
import DeleteIcon from "../DeleteIcon";
import DownloadIcon from "../DownloadIcon";
import EditIcon from "../EditIcon";
import ShareIcon from "../ShareIcon";
import "./ActionCircle.scss";
import EditImageModal from "../EditImageModal/EditImageModal";
import ShareImageModal from "../ShareImageModal/ShareImageModal";

export default function ActionCircle({ isHover, id, name, tags, image }) {
  // console.log(dataOfImage);
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeShareModal, setActiveShareModal] = useState(false);
  // const say = () => {
  //     console.log("hello");
  // }

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

        <span className="wrapper__circle" title="Удалить">
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
    </>
  );
}
