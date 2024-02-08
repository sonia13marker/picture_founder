import { useState, useRef, useEffect } from "react";
import CopyIcon from "../../icons/CopyIcon";
import SuccessCopyIcon from "../../icons/SuccessCopyIcon";
import "./ShareImageModal.scss";
import {
  EmailShareButton,
  EmailIcon,
//   MailruShareButton,
//   PinterestShareButton,
//   RedditShareButton,
  TelegramShareButton,
//   TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  VKIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
import Clipboard from "clipboard";
import { useDispatch, useSelector } from "react-redux";
import { getLink, showNotification } from "../../store/slices/userSlice";
import { useCookies } from "react-cookie";
import { PATH_SERVER } from "../../data/constants";


export default function ShareImageModal({ active, setActive, image, name, imageId }) {

  /* constants for values to icons */
  const defaultSize = 45;
  const defaultBR = 20;

  const dispatch = useDispatch();

  const linkData = useSelector(state => state.user.linkData);
  console.log("linkData", linkData)

  const [cookies2, ] = useCookies(["token"]);
  const cookieToken = cookies2.token;
  const [cookies3, ] = useCookies(["idFromLogin"]);
  const cookieId = cookies3.idFromLogin;

  useEffect(() => {
    if (active) {
      dispatch(getLink({userId: cookieId, userToken: cookieToken, imageId: imageId}));
    }
  },[cookieId, cookieToken, dispatch, imageId, active]);

  const newImageLink = `${PATH_SERVER}/share/${linkData}`;

  /* for copy icon */
  const [copied, setCopied] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const linkRef = useRef();
  const clipboard = useRef(null);

  useEffect(() => {
    if (clipboard.current) {
      clipboard.current.destroy();
    }
    clipboard.current = new Clipboard(linkRef.current);
    clipboard.current.on("success", (e) => {
      setCopied(true);
      setShowNotif(true);
  console.log("Copied to clipboard:", e.text);
    });
    return () => {
      if (clipboard.current) {
        clipboard.current.destroy();
      }
    };
  }, [])

  useEffect(() => {
    console.log("showNotif", showNotif)
    if (showNotif === true) {
    //появление уведомлений
    dispatch(showNotification("Ссылка скопирована"));
    setShowNotif(false);
    }
  }, [showNotif, dispatch])

  return (
    <div className={active ? "shareModal activeModal" : "shareModal"}>
      <div className="shareModal__content">
        <span className="modal__content__head">
          <h3 className="modal__content__head__h3">Поделиться</h3>
          <span
            className="modal__content__head__img"
            onClick={() => setActive(!active)}
          ></span>
        </span>

        <span className="wrappers">
          <span>
            <label className="input__label" htmlFor="urlInput"></label>
            Скопировать ссылку
            <span className="icon__wrapper">
              <input
                className="input__auth password shareModal__content__body__input"
                type="text"
                id="urlInput"
                value={newImageLink}
                //onChange={change}
                readOnly
              />
              {copied ? (
                <span className="iconClose">
                  <SuccessCopyIcon />
                </span>
              ) : (
                <span
                  className="iconOpen"
                  ref={linkRef}
                  onClick={() => clipboard.current.onClick(newImageLink)}
                  data-clipboard-text={newImageLink}
                >
                  <CopyIcon />
                </span>
              )}
            </span>
          </span>

          <span className="shareModal__content__body__iconWrapper">
{/* отправляется отображение без ссылки, шикарно */}
            <VKShareButton 
            url={newImageLink}
            image={image}
            >
              <VKIcon size={defaultSize} borderRadius={defaultBR} />
            </VKShareButton>
{/* отправляется имя и ссылка, подсвечивается */}
            <TelegramShareButton 
            title={name}
            // image={image}
            url={newImageLink}
            >
              <TelegramIcon size={defaultSize} borderRadius={defaultBR} />
            </TelegramShareButton>

{/* отправляется только ссылка, и даже не подсвечивается */}
            <WhatsappShareButton 
            url={newImageLink}
            title={name}
            >
              <WhatsappIcon size={defaultSize} borderRadius={defaultBR} />
            </WhatsappShareButton>
{/* отправляется только ссылка, подсвечивается, но картинка не отображается */}
            <EmailShareButton 
            url={newImageLink}
             subject="Делюсь с тобой картинкой из Pic2re!"
             body={name}
             >
              <EmailIcon size={defaultSize} borderRadius={defaultBR} />
            </EmailShareButton>
          </span>
        </span>
      </div>
    </div>
  );
}
