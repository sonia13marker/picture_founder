import "./CustomInput.scss";

export default function CustomInput({
  inputType, placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
}) {
  let data = { inputType, placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
  };

  if (inputType === "password") {
    return <InputPassword {...data} />;
  } else if (inputType === "text") {
    return <InputText {...data} />;
  } else {
    return <InputTextarea {...data} />;
  }
}

function InputText({
  placeholder,
  labelName,
  onClickFunc,
  errorMessage,
  inputId,
  inputRef,
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
        PASSWORD
        <input
          className="input"
          type="password"
          id={inputId}
          ref={inputRef}
          placeholder={placeholder}
        />
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
