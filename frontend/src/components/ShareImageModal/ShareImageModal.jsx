import { useState, useRef, useEffect } from "react";
import CopyIcon from "../CopyIcon";
import SuccessCopyIcon from "../SuccessCopyIcon";
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

export default function ShareImageModal({ active, setActive, imageLink }) {
  /* сменить на приходящий уровень для каждой картинки */
  // let shareUrl = "https://memozg.ru/img/posts/298_62d5a8b22c104.jpg";

  /* constants for values to icons */
  const defaultSize = 45;
  const defaultBR = 20;
  // console.log(imageLink);

  /* for copy icon */
  const [copied, setCopied] = useState(false);
  const linkRef = useRef();
  const clipboard = useRef(null);

  useEffect(() => {
    if (clipboard.current) {
      clipboard.current.destroy();
    }
    clipboard.current = new Clipboard(linkRef.current);
    clipboard.current.on("success", (e) => {
      setCopied(true);
      console.log("Copied to clipboard:", e.text);
    });return () => {
      if (clipboard.current) {
        clipboard.current.destroy();
      }
    };
  }, [])

  const getCopyLink = (imageLink) => {
    // console.log(linkRef.current);
    clipboard.current.onClick(imageLink);

  };
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
                value={imageLink}
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
                  onClick={() => clipboard.current.onClick(imageLink)}
                  data-clipboard-text={imageLink}
                >
                  <CopyIcon />
                </span>
              )}
            </span>
          </span>

          <span className="shareModal__content__body__iconWrapper">
            <VKShareButton 
            //url={shareUrl}
            >
              <VKIcon size={defaultSize} borderRadius={defaultBR} />
            </VKShareButton>

            <TelegramShareButton 
            //url={imageLink}
            >
              <TelegramIcon size={defaultSize} borderRadius={defaultBR} />
            </TelegramShareButton>

            <WhatsappShareButton 
            //url={shareUrl}
            >
              <WhatsappIcon size={defaultSize} borderRadius={defaultBR} />
            </WhatsappShareButton>

            <EmailShareButton 
            //url={shareUrl}
             title="Почта">
              <EmailIcon size={defaultSize} borderRadius={defaultBR} />
            </EmailShareButton>
          </span>
        </span>
      </div>
    </div>
  );
}
