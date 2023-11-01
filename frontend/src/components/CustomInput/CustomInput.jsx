import './CustomInput.scss';

export default function CustomInput ({inputType, placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef}) {
    let data = {inputType, placeholder, labelName, onClickFunc, errorMessage, inputId, inputRef};
    if (inputType) {
        return <InputPassword data={data}/>
    } else if (inputType === "text") {
        return <InputText data={data}/>
    } else {
        return <InputTextarea data={data}/>
    }

    // return (<>

   
    //     {/* <span className='input__wrapper'>
    //         <label className='input__label'
    //         htmlFor={inputId}> {labelName}

    //         <input 
    //         className='input'
    //         type={inputType ? `${inputType}` : "text" }
    //         id={inputId}
    //         ref={inputRef}
    //         placeholder={placeholder}
    //         onClick={onClickFunc}
    //         />
    //         </label>

    //         <p className='input__error'>
    //             {errorMessage}!
    //         </p>
    //     </span> */}

    //     </> )
}

const InputText = ({placeholder, labelName, errorMessage, inputId, inputRef}) => {
    return (
        <span className='input__wrapper'>
            <label className='input__label'
            htmlFor={inputId}> 
                {labelName}

            <input 
            className='input'
            type="text"
            id={inputId}
            ref={inputRef}
            placeholder={placeholder}
            />
            </label>

            <p className='input__error'>
                {errorMessage}!
            </p>
        </span>
    )
}

const InputPassword = ({placeholder, labelName, errorMessage, inputId, inputRef}) => {
    return (
        <span className='input__wrapper'>
            <label className='input__label'
            htmlFor={inputId}> 
                PASSWORD

            <input 
            className='input'
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
    )
}

const InputTextarea = ({placeholder, labelName, inputId, inputRef}) => {
    return(
// <span className='input__wrapper'>
<label className='input__label'
htmlFor={inputId}> 
    {labelName}

<textarea
className='input'
id={inputId}
ref={inputRef}
placeholder={placeholder}
></textarea>
</label>
// </span>
    )
    
}