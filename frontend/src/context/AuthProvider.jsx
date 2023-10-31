import { createContext, useState } from "react";

// const AuthContext = createContext({
//   isAuth: false,
//   setAuth: () => {}
// });

const AuthContext = createContext(null);

// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const AuthProvider = ({ children }) => {
//   const [isAuth, setAuth] = useState(false);
const [user, setUser] = useState(null);
const singIn = (newUser, callback) => {
    setUser(newUser);
    callback();
};
const singOut = (callback) => {
    setUser(null);
    callback();
}

const value = {user, singIn, singOut};
  return (
    // <AuthContext.Provider value={{ isAuth, setAuth }}>
    //   {children}
    // </AuthContext.Provider>
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

  )
}

export default AuthContext