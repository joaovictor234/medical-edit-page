import { createContext, useState, useEffect } from "react";
import { PersonalContextType } from "../@types/personal";
import { Props } from "../@types/props";
import api from "../apis/editApi";

export const PersonalContext = createContext<PersonalContextType | null>(null);

const PersonalProvider = ({ children }: Props) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [img, setImg] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [cns, setCns] = useState('');

  useEffect(() => {
    api.get('/personal/1')
      .then(response => {
        const data = response.data.personal;
        setName(data.name);
        setBirthDate(data.birthDate);
        setEmail(data.email);
        setGender(data.gender);
        setCpf(data.cpf);
        setCns(data.cns);
        setTel(data.tel);
        setRg(data.rg);
        return data.img.data
      })
      /* .then(img => {
        const uint8Array = new Uint8Array(img);
        const base64String = Buffer.from(uint8Array).toString('base64');
        setImg(`data:image/jpeg;base64,${base64String}`)
        console.log(img)
      }) */
      .catch(err => console.error(err));
  }, [])

  return <PersonalContext.Provider
    value={{
      name, setName,
      birthDate, setBirthDate,
      gender, setGender,
      img, setImg,
      email, setEmail,
      tel, setTel,
      rg, setRg,
      cpf, setCpf,
      cns, setCns
    }}>
    {children}
  </PersonalContext.Provider>
}

export default PersonalProvider;