import { Dispatch, SetStateAction } from "react"

export type PasswordContextType = {
  userName: string,
  password: string,
  setUserName: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>
}