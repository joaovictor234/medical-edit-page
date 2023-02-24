import { createContext, useEffect, useState } from "react";
import { PasswordContextType } from "../@types/password";
import { Props } from "../@types/props";
import api from "../apis/editApi";

export const PaswordContext = createContext<PasswordContextType | null>(null);

const PasswordProvider = ({children}: Props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    api.get('/user/1')
    .then(response => {
      const data = response.data.user;
      setUserName(data.username);
      setPassword(data.password);
    })
  }, [])

  return <PaswordContext.Provider
    value={{
      userName, setUserName,
      password, setPassword
    }}>
    {children}
  </PaswordContext.Provider>
}

export default PasswordProvider;