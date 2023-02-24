import { Dispatch, SetStateAction } from "react";
import City from "../interfaces/City";

export const queryCities = (
  state: string, 
  setCities: Dispatch<SetStateAction<City[]>>,
  setLoadingCities: Dispatch<SetStateAction<boolean>>): void => {
    setLoadingCities(true);
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
    .then(response => response.json())
    .then(response => {
      setCities(response)
    })
    .catch(error => console.error(error))
    .finally(() => setLoadingCities(false));
}