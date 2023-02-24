import { Dispatch, SetStateAction } from "react"

export type AddressContextType = {
  selectedState: string,
  selectedCity: string,
  publicPlace: string,
  district: string,
  number: number,
  complement: string,
  setSelectedState: Dispatch<SetStateAction<string>>,
  setSelectedCity: Dispatch<SetStateAction<string>>,
  setPublicPlace: Dispatch<SetStateAction<string>>,
  setDistrict: Dispatch<SetStateAction<string>>,
  setNumber: Dispatch<SetStateAction<number>>,
  setComplement: Dispatch<SetStateAction<string>>
}