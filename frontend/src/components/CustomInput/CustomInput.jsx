// import { useState } from "react";
// import CloseEyeIcon from "../CloseEyeIcon";
// import OpenEyeIcon from "../OpenEyeIcon";
// import "./CustomInput.scss";

// export default function CustomInput({
//   placeholder, labelName, errorMessage, onClickFunc, inputId, inputType, inputRef, passVal, passwordVerValue,
//     onChangeFunc
// }) {
//   let data = { placeholder, labelName, errorMessage, onClickFunc, inputId, inputRef, passVal, passwordVerValue,
//     onChangeFunc, inputType
//   };

//   if (inputType === "password") {
//     return <InputPassword {...data} />;
//   } else if (inputType === "verify") {
//     return <InputPasswordVerify {...data} />
//   }
//   if (inputType === "text") {
//     return <InputText {...data} />;
//   } else if (inputType === "email") {
//     return <InputEmail {...data} />
//     }
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

// function InputEmail({ placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef,
// }) {
//   return (
//     <span className="input__wrapper">
//       <label className="input__label" htmlFor={inputId}>
//         {labelName}

//         <input
//           className="input__auth"
//           type="email"
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

// function InputPassword({ placeholder, labelName, errorMessage, onClickFunc, inputId, inputRef, passVal, passwordVerValue,
//   onChangeFunc
// }) {
//   console.log(inputId);
//   // console.log("aaa " + passwordValue);
//   // console.log("hhh " + passwordVerValue);

//     const [open, setOpen] = useState(true);
//     const [isHidden, setIsHidden] = useState(true);
    
//     const selectIcon = () => {
//         setOpen(!open);
//         setIsHidden(!isHidden);
//     }

//   return (
//     <span className="input__wrapper2">
//       <label className="input__label" htmlFor={inputId}></label>
//        {labelName}
//        <span className="icon__wrapper">
//         <input
//           className="input__auth password"
//           type={isHidden ? "password" : "text"}
//           id={inputId}
//           onChange={onChangeFunc}
//           placeholder={placeholder}
//           value={passVal}
//         />
//         {/*пока открыт глаз - пароль не видно */}
//        {
//         open ?
//         (
//         <span className="iconOpen" onClick={selectIcon}>
//             <OpenEyeIcon />
//         </span>) :
//         (
//             <span className="iconClose" onClick={selectIcon}>
//                 <CloseEyeIcon />
//             </span> 
//         )
//        }

//         </span>
      
      
//             <p className='input__error'>
//                 {/* {errorMessage}! */}
//                {/* { passwordRef !== passworVerifydRef ?
//     "Пароли не равны!" : ""}  */}
//             </p>
//     </span>
//   );
// }

// function InputPasswordVerify({ placeholder, labelName, errorMessage, passVal,
//   onChangeFunc
// }) {
//     const [open, setOpen] = useState(true);
//     const [isHidden, setIsHidden] = useState(true);
    
//     const selectIcon = () => {
//         setOpen(!open);
//         setIsHidden(!isHidden);
//     }

//   return (
//     <span className="input__wrapper2">
//       <label className="input__label" htmlFor="singUp_passwordVerify"></label>
//        {labelName}
//        <span className="icon__wrapper">
//         <input
//           className="input__auth password"
//           type={isHidden ? "password" : "text"}
//           id="singUp_passwordVerify"
//           onChange={onChangeFunc}
//           placeholder={placeholder}
//           value={passVal}
//         />
//         {/*пока открыт глаз - пароль не видно */}
//        {
//         open ?
//         (
//         <span className="iconOpen" onClick={selectIcon}>
//             <OpenEyeIcon />
//         </span>) :
//         (
//             <span className="iconClose" onClick={selectIcon}>
//                 <CloseEyeIcon />
//             </span> 
//         )
//        }

//         </span>
      
      
//             <p className='input__error'>
//                 {/* {errorMessage}! */}
//                {/* { passwordRef !== passworVerifydRef ?
//     "Пароли не равны!" : ""}  */}
//             </p>
//     </span>
//   );
// }

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
// }