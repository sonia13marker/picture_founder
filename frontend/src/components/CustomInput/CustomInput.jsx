// import { useState } from "react";
// import CloseEyeIcon from "../CloseEyeIcon";
// import OpenEyeIcon from "../OpenEyeIcon";
// import "./CustomInput.scss";

import { useEffect, useRef, useState } from "react";
import OpenEyeIcon from "../../icons/OpenEyeIcon";
import CloseEyeIcon from "../../icons/CloseEyeIcon";

// export default function CustomInput({
//     labelName, placeholder, inputType, passVal, passwordVerValue, emailVal, onChangeFunc
// })

export default function CustomInput({
  placeholder, labelName, errorMessage, onClickFunc, inputId, inputType, inputRef, passVal, passwordVerValue,
    onChangeFunc, onCopyFunc, setPassVal
}) {
  let data = { placeholder, labelName, errorMessage, onClickFunc, inputId, inputRef, passVal, passwordVerValue,
    onChangeFunc, inputType, onCopyFunc, setPassVal
  };

  if (inputType === "passwordOne") {
    return <InputPassword {...data} key={inputId}/>;
  } else if (inputType === "passwordVerify") {
    return <InputPasswordVerify {...data} key={inputId}/>
  }
//   if (inputType === "text") {
//     return <InputText {...data} />;
//   } 
  else if (inputType === "email") {
    return <InputEmail {...data} />
    }
//     else {
//     return <InputTextarea {...data} />;
//   }

  

// function InputText({ placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef, 
// }) {
//   return (
//     <span className="input__wrapper">
//       <label className="input__label" htmlFor={inputId}>
//         {labelName}

//         <input
//           className="input"
//           type="text"
//           id={inputId}
//           ref={inputRef}
//           placeholder={placeholder}
//         />
//       </label>

//       {/* <p className='input__error'>
//                 {errorMessage}!
//             </p> */}
//     </span>
//   );
// }

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

function InputPassword({ placeholder, labelName, errorMessage, onClickFunc, inputId,  passVal, passwordVerValue,
  onChangeFunc, other, onCopyFunc, setPassVal, inputRef
}) {
  console.log(inputId);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [passVal]);

    const [open, setOpen] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    
    const selectIcon = () => {
        setOpen(!open);
        setIsHidden(!isHidden);
    }

  return (
    <span className="input__wrapper2">
      <label className="input__label" htmlFor={inputId}></label>
       {labelName}
       <span className="icon__wrapper">
        <input
        ref={inputRef}
          className="input__auth password"
          type={isHidden ? "password" : "text"}
          id={inputId}
          onChange={onChangeFunc}
          placeholder={placeholder}
          value={passVal}
          onCopy={onCopyFunc}
        //   {...other}
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

        </span>
      
      
            <p className='input__error'>
                {errorMessage}
            </p>
    </span>
  );
}

function InputPasswordVerify({ placeholder, labelName, errorMessage, onClickFunc, inputId, passVal, passwordVerValue,
    onChangeFunc, inputType, onCopyFunc, inputRef
}) {
    // const inputRef2 = useRef(null);

    // useEffect(() => {
    //   if (inputRef2.current) {
    //     inputRef2.current.focus();
    //   }
    // }, [passwordVerValue]);

    const [open, setOpen] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    
    const selectIcon = () => {
        setOpen(!open);
        setIsHidden(!isHidden);
    }

  return (
    <span className="input__wrapper2">
      <label className="input__label" htmlFor={inputId}></label>
       {labelName}
       <span className="icon__wrapper">
        <input
        // ref={inputRef}
          className="input__auth password"
          type={isHidden ? "password" : "text"}
          id={inputId}
          onChange={onChangeFunc}
          placeholder={placeholder}
          value={passwordVerValue}
          onCopy={onCopyFunc}
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

        </span>
      
      
            <p className='input__error'>
                {errorMessage}
            </p>
    </span>
  );
}

// function InputTextarea({ placeholder, labelName, inputId, inputRef }) {
//   return (
//     <label className="input__label" htmlFor={inputId}>
//       {labelName}

//       <textarea
//         className="input__textarea"
//         id={inputId}
//         ref={inputRef}
//         placeholder={placeholder}
//       ></textarea>
//     </label>
//   );
// }
}