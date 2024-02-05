import { useEffect, useState } from "react"

export const useCheckThePassword = ({pass, passVerify}) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [errorVerMessage, setErrorVerMessage] = useState("");
    console.log("pass, passVerify", pass, passVerify)

    useEffect(() => {
        if (passVerify !== pass) {
            setErrorVerMessage("Пароли не равны!");
          } else if (passVerify === pass) {
            setErrorVerMessage("");
          }

        if (pass.length < 8) {
            setErrorMessage("Минимальная длиная пароля - 8 символов!");
          } else setErrorMessage("");
    }, [pass.length, pass, passVerify]);

    return { errorMessage, setErrorMessage, errorVerMessage, setErrorVerMessage };
}