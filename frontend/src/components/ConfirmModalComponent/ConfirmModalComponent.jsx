import "./ConfirmModalComponent.scss";

export default function ConfirmModalComponent({
    confirmModalActive, setConfirmModalActive, 
    // active,
    nameOfModal, bodyText, leftBtnName, rightBtnName,
    leftBtnAction, rightBtnAction,
}) {
  return ( <>
    {/* { active ?  */}
    <div className={confirmModalActive ? "confirm__background active" : "confirm__background"}>

        <div className="confirm__content" onClick={(e) => e.stopPropagation()}> 
        <span className="confirm__content__header">
        <h3 className="confirm__content__header__title">{nameOfModal}</h3>

        <span className="confirm__content__header__img"
        onClick={() => setConfirmModalActive(false)}></span>
      </span>

      <p className="confirm__content__body__text">{bodyText}</p>

      <span className="confirm__content__footer">
        <button className="confirm__content__footer__outlineBtn" onClick={leftBtnAction}>
          {leftBtnName}
        </button>

        <button className="confirm__content__footer__fillBtn" onClick={rightBtnAction}>
          {rightBtnName}
        </button>
      </span>

        </div>
      
    </div> 
    {/* : <></>} */}
    </>);
}
