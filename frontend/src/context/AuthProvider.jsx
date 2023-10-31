import { createContext, useState } from "react";

const AuthContext = createContext({
  isAuth: false,
  setAuth: () => {}
});

// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext