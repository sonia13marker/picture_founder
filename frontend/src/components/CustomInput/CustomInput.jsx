import { useState } from "react";
import CloseEyeIcon from "../CloseEyeIcon";
import OpenEyeIcon from "../OpenEyeIcon";
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
  } else if (inputType === "email") {
    return <InputEmail {...data} />
    }
    else {
    return <InputTextarea {...data} />;
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

function InputPassword({ placeholder, labelName, errorMessage, onClickFunc, inputId, inputRef,
}) {

  // let passwordRef, passworVerifydRef;
     /* fot input password
    получить данные из useRef в виде переменной,
    исп-ть для каждого символа замену на #  */
    const [open, setOpen] = useState(true);
    let password = inputRef;
    
    const selectIcon = () => {
        setOpen(!open);
    }
    
    function encryptPassword (password) {

        // while (open) {
        //     password.map(i => i === "#");
        // }
        setOpen(!open);
    }
    

  return (
    <span className="input__wrapper2">
      <label className="input__label" htmlFor={inputId}></label>
       {labelName}
       <span className="icon__wrapper">
        <input
          className="input__auth password"
          type="password"
          id={inputId}
          ref={inputRef}
          placeholder={placeholder}
        />
        {/*пока открыт глаз - пароль не видно */}
       {
        open ?
        (
        <span className="iconOpen" onClick={selectIcon}>
            <OpenEyeIcon />
        </span>) :
        (
            <span className="iconClose" onClick={selectIcon}>
                <CloseEyeIcon />
            </span> 
        )
       }
            

            {/* <span className="iconClose">
                <CloseEyeIcon />
            </span> */}
        </span>
      
      
            <p className='input__error'>
                {/* {errorMessage}! */}
               {/* { passwordRef !== passworVerifydRef ?
    "Пароли не равны!" : ""}  */}
            </p>
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
}