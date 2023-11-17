import { useState } from 'react';
import CopyIcon from '../CopyIcon';
import SuccessCopyIcon from '../SuccessCopyIcon';
import './ShareImageModal.scss';
import {
    EmailShareButton,
    EmailIcon,
    MailruShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    VKShareButton,
    WhatsappShareButton,
    VKIcon,
    TelegramIcon,
    WhatsappIcon,
} from "react-share"; 


export default function ShareImageModal ({active, setActive}) {
    /* сменить на приходящий уровень для каждой картинки */
    let shareUrl = 'https://memozg.ru/img/posts/298_62d5a8b22c104.jpg';

    /* constants for values to icons */
    const defaultSize = 45;
    const defaultBR = 20;

    /* for copy icon */
    const [copied, setCopied] = useState("");

    const getCopyLink = (shareUrl) => {
        setCopied(shareUrl);
    }
    return(
        <div className={active ? "modal activeModal" : "modal"}>
        <div className="modal__content"
        >
          <span className="modal__content__head">
            <h3 className="modal__content__head__h3">Поделиться</h3>
            <span
              className="modal__content__head__img"
              onClick={() => setActive(!active)}
            ></span>
          </span>

          <span className="modal__content__body">

            <span className='modal__content__body__inputWrapper'>
            <label className="input__label" htmlFor="urlInput"></label>
            Скопировать ссылку
       <span className="icon__wrapper">
        <input
          className="input__auth password modal__content__body__inputWrapper__input"
          type="text"
          id="urlInput"
          value={shareUrl}
          readOnly
        />
       {
        copied ?
        (
            <span className="iconClose">
                <SuccessCopyIcon />
            </span> 
        ) :
        (
        <span className="iconOpen" onClick={() => getCopyLink(shareUrl)}>
            <CopyIcon />
        </span>) 
       }
        </span>
            </span>

            <span className='modal__content__body__iconWrapper'>

          <VKShareButton url={shareUrl} > 
            <VKIcon size={defaultSize} borderRadius={defaultBR} />
          </VKShareButton>

          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={defaultSize} borderRadius={defaultBR}/>
          </TelegramShareButton>

          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={defaultSize} borderRadius={defaultBR}/>
          </WhatsappShareButton>

          <EmailShareButton url={shareUrl} title='Почта'> 
          <EmailIcon size={defaultSize} borderRadius={defaultBR}/>
          </EmailShareButton>
            </span>

            


          </span>
        </div>
        {/* <ConfirmModalComponent
        confirmModalActive={confirmModalActive}
        setConfirmModalActive={setConfirmModalActive}
        nameOfModal="Сохранение изменений"
        bodyText="Если Вы выйдете сейчас, изменения не будут сохранены."
        leftBtnName="Отмена изменений"
        rightBtnName="Сохранить изменения"
        leftBtnAction={cancelBtnClick}
        // будущее сохранение картинки, которое переходит к закрыванию окна?? rightBtnAction={""}
      /> */}
      </div>
    )
}