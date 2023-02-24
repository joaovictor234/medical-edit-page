import { createContext, useEffect, useState } from "react";
import { ProfessionalContextType } from "../@types/professional";
import { Props } from "../@types/props";
import api from "../apis/editApi";

export const ProfessionalContext = createContext<ProfessionalContextType | null>(null);

const ProfessionalProvider = ({children}: Props) => {
  const [conselho, setConselho] = useState('');
  const [estadoConselho, setEstadoConselho] = useState('');
  const [numeroConselho, setNumeroConselho] = useState(0);
  const [especialidade, setEspecialidade] = useState('');
  const [rqe, setRqe] = useState(0);
  const [idUser, setIdUser] = useState(0);
  const [sincronizacaoMEMED, setSincronizacaoMEMED] = useState(true);

  useEffect(() => {
    api.get('/professional/1')
    .then(response => {
      const data = response.data.professional;
      setConselho(data.conselho);
      setEstadoConselho(data.estadoConselho);
      setNumeroConselho(Number(data.numeroConselho));
      setEspecialidade(data.especialidade);
      setRqe(Number(data.rqe));
      setIdUser(1)
      setSincronizacaoMEMED(data.sincronizacaoMEMED);
    })
  }, [])

  return <ProfessionalContext.Provider 
    value={{
      conselho, setConselho,
      estadoConselho, setEstadoConselho,
      numeroConselho, setNumeroConselho,
      especialidade, setEspecialidade,
      rqe, setRqe,
      idUser, setIdUser,
      sincronizacaoMEMED, setSincronizacaoMEMED
    }}>
    {children}
  </ProfessionalContext.Provider>
}

export default ProfessionalProvider;