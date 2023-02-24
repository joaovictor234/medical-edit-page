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
    console.log(process.env.REACT_APP_API_ENDPOINT)
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
      .then(img => {
        const blob = new Blob(img, {type: 'image/jpg'});
        const reader = new FileReader();
        reader.onload = () => setImg(reader.result as string);
        reader.readAsDataURL(blob);

      })
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