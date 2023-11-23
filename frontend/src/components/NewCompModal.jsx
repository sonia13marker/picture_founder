export default function NewCompModal({
  confirmModalActive,
  setConfirmModalActive,
  leftBtnAction,
}) {
  return (
    <>
      <div
        className={
          confirmModalActive
            ? "confirm__background activeModal"
            : "confirm__background"
        }
      >
        <div
          className="confirm__content"
          //onClick={(e) => e.stopPropagation()}
        >
          <span className="confirm__content__header">
            <h3 className="confirm__content__header__title">
              Сохранение изменений
            </h3>

            <span
              className="confirm__content__header__img"
              onClick={() => setConfirmModalActive(!confirmModalActive)}
            ></span>
          </span>

          <p className="confirm__content__body__text">
            Если Вы выйдете сейчас, изменения не будут сохранены.
          </p>

          <span className="confirm__content__footer">
            <button
              className="confirm__content__footer__outlineBtn"
              onClick={leftBtnAction}
            >
              Отмена изменений
            </button>

            <button
              className="confirm__content__footer__fillBtn"
              //onClick={rightBtnAction}
            >
              Сохранить изменения
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
