import CloseEyeIcon from "../CloseEyeIcon";
import OpenEyeIcon from "../OpenEyeIcon";
import "./CustomInput.scss";

export default function CustomInput({
  inputType, placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
}) {
  let data = { inputType, placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
  };

  /* получить данные из useRef в виде переменной,
  исп-ть для каждого символа замену на #  */
  if (inputType === "password") {
    return <InputPassword {...data} />;
  } else if (inputType === "text") {
    return <InputText {...data} />;
  } else if (inputType === "email") {
    return <InputEmail {...data} />
    }
    else {
    return <InputTextarea {...data} />;
  }
}

function InputText({ placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
}) {
  return (
    <span className="input__wrapper">
      <label className="input__label" htmlFor={inputId}>
        {labelName}

        <input
          className="input"
          type="text"
          id={inputId}
          ref={inputRef}
          placeholder={placeholder}
        />
      </label>

      {/* <p className='input__error'>
                {errorMessage}!
            </p> */}
    </span>
  );
}

function InputEmail({ placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
}) {
  return (
    <span className="input__wrapper">
      <label className="input__label" htmlFor={inputId}>
        {labelName}

        <input
          className="input__auth"
          type="email"
          id={inputId}
          ref={inputRef}
          placeholder={placeholder}
        />
      </label>

      {/* <p className='input__error'>
                {errorMessage}!
            </p> */}
    </span>
  );
}

function InputPassword({
  placeholder,
  labelName,
  errorMessage,
  onClickFunc,
  inputId,
  inputRef,
}) {
  return (
    <span className="input__wrapper">
      <label className="input__label" htmlFor={inputId}>
       {labelName}
        <input
          className="input__auth password"
          type="password"
          id={inputId}
          ref={inputRef}
          placeholder={placeholder}
        />
        <span className="icon__wrapper">
            {/*пока открыт глаз - пароль не видно */}
            <span className="iconOpen">
                <OpenEyeIcon />
            </span>

            {/* <span className="iconClose">
                <CloseEyeIcon />
            </span> */}
        </span>
      </label>
      {/* 
            <p className='input__error'>
                {errorMessage}!
            </p> */}
    </span>
  );
}

function InputTextarea({ placeholder, labelName, inputId, inputRef }) {
  return (
    <label className="input__label" htmlFor={inputId}>
      {labelName}

      <textarea
        className="input__textarea"
        id={inputId}
        ref={inputRef}
        placeholder={placeholder}
      ></textarea>
    </label>
  );
}
