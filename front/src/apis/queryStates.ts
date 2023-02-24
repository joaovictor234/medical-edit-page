import { Dispatch, SetStateAction } from "react";
import State from "../interfaces/State";

export const returnBrazilStates = (setStates: Dispatch<SetStateAction<State[]>>): void => {
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => response.json())
    .then(response => setStates(response))
    .catch(error => console.error(error));
}