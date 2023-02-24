import { createContext, useEffect, useState } from "react";
import { AddressContextType } from "../@types/address";
import {Props} from '../@types/props';
import api from "../apis/editApi";

export const AddressContext = createContext<AddressContextType | null>(null);

const AddressProvider = ({children}: Props) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [publicPlace, setPublicPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [number, setNumber] = useState(0);
  const [complement, setComplement] = useState('');

  useEffect(() => {
    api.get('/address/1')
    .then(response => {
      const data = response.data.address;
      setSelectedState(data.state);
      setSelectedCity(data.city);
      setPublicPlace(data.publicPlace);
      setDistrict(data.district);
      setNumber(Number(data.number));
      setComplement(data.complement);
    })
    .catch(err => console.error(err));
  },[])

  return <AddressContext.Provider
    value={{
      selectedState, setSelectedState,
      selectedCity, setSelectedCity,
      publicPlace, setPublicPlace,
      district, setDistrict,
      number, setNumber,
      complement, setComplement
    }}>
    {children}
  </AddressContext.Provider>
}

export default AddressProvider;