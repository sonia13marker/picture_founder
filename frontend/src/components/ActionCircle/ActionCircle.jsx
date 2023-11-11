import { useState } from "react";
import DeleteIcon from "../DeleteIcon";
import DownloadIcon from "../DownloadIcon";
import EditIcon from "../EditIcon";
import ShareIcon from "../ShareIcon";
import "./ActionCircle.scss";
import EditImageModal from "../EditImageModal/EditImageModal";

export default function ActionCircle ({isHover, id, name, tags, image}) {
    // console.log(dataOfImage);
    const [activeEditModal, setActiveEditModal] = useState(false);
    // const say = () => {
    //     console.log("hello");
    // }
    
    return (<>
        <span className={isHover ? "wrapper active" : "wrapper"}>

{/* onClick = и вызвать подходящее модальное окно*/}
    <span className="wrapper__circle" onClick={() => setActiveEditModal(!activeEditModal)}>
            <EditIcon />
            </span>

            <span className="wrapper__circle">
            <ShareIcon />
            </span>

            <span className="wrapper__circle">
            <DownloadIcon />
            </span>

            <span className="wrapper__circle">
            <DeleteIcon />
            </span>
            

        </span>
        <EditImageModal id={id} name={name} tags={tags} image={image} 
        active={activeEditModal} setActive={setActiveEditModal}/>
        </>)
}