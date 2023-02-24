import { Dispatch, SetStateAction } from "react"

export type ProfessionalContextType = {
  conselho: string,
  estadoConselho: string,
  numeroConselho: number,
  especialidade: string,
  rqe: number,
  idUser: number,
  sincronizacaoMEMED: boolean,
  setConselho: Dispatch<SetStateAction<string>>,
  setEstadoConselho: Dispatch<SetStateAction<string>>,
  setNumeroConselho: Dispatch<SetStateAction<number>>,
  setEspecialidade: Dispatch<SetStateAction<string>>,
  setRqe: Dispatch<SetStateAction<number>>,
  setIdUser: Dispatch<SetStateAction<number>>,
  setSincronizacaoMEMED: Dispatch<SetStateAction<boolean>>
}