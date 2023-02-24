import { Dispatch, SetStateAction } from "react"

export type PersonalContextType = {
  name: string,
  birthDate: string,
  gender: string,
  img: string,
  email: string,
  tel: string,
  rg: string,
  cpf: string,
  cns: string,
  setName: Dispatch<SetStateAction<string>>,
  setBirthDate: Dispatch<SetStateAction<string>>,
  setGender: Dispatch<SetStateAction<string>>,
  setImg: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  setTel: Dispatch<SetStateAction<string>>,
  setRg: Dispatch<SetStateAction<string>>,
  setCpf: Dispatch<SetStateAction<string>>,
  setCns: Dispatch<SetStateAction<string>>
}