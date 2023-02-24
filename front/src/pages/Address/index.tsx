import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AddressContextType } from '../../@types/address';
import { ISnack } from '../../@types/snack';
import api from '../../apis/editApi';
import { queryCities } from '../../apis/queryCities';
import { returnBrazilStates } from '../../apis/queryStates';
import FormHeader from '../../components/FormHeader';
import { AddressContext } from '../../context/addressContext';
import City from '../../interfaces/City';
import State from '../../interfaces/State';
import '../../styles/form.css';

const AddressInformation = () => {
  const {
    selectedState, setSelectedState,
    selectedCity, setSelectedCity,
    publicPlace, setPublicPlace,
    district, setDistrict,
    number, setNumber,
    complement, setComplement
  } = useContext(AddressContext) as AddressContextType;

  const [states, setStates] = useState<State[]>([])
  const [loadingCities, setLoadingCities] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<ISnack>({ severity: 'info', message: '' })
  const [openSnack, setOpenSnack] = useState(false);

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value.replace(/\D/g, ''));
    if (value) setNumber(value);
  }

  const updateAddress = () => {
    setLoading(true);
    api.put('/address/1', {
      state: selectedState,
      city: selectedCity,
      publicPlace,
      district,
      number,
      complement
    })
      .then(response => {
        setOpenSnack(true);
        setSnack({ severity: 'success', message: response.data.message })
      })
      .catch(err => {
        console.error(err)
        setOpenSnack(true);
        if (err.response.status === 400) {
          setSnack({ severity: 'warning', message: err.response.data.message })
        }
        if(err.response.status === 500) {
          setSnack({ severity: 'error', message: 'Não foi possível atualizar os dados' })
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    returnBrazilStates(setStates)
  }, [])

  useEffect(() => {
    if (selectedState) {
      queryCities(
        selectedState,
        setCities,
        setLoadingCities);
    }
  }, [selectedState])

  useEffect(() => {
    return () => {
      setSelectedState('');
      setCities([])
    }
  }, [setSelectedState])

  return <div className="form_container">
    <FormHeader
      title='Informações de endereço'
      description='Atualize seu endereço aqui.'
      handleUpdateData={updateAddress}
      loading={loading}
      buttonName='Editar'
      snack={snack}
      open={openSnack}
      setOpen={setOpenSnack} />
    <div>
      <label>UF / Município de residência</label>
      <div>
        <select onChange={e => setSelectedState(e.target.value)} value={selectedState}>
          <option>Selecione um estado</option>
          {
            states && states.map(state =>
              <option key={state.id} value={state.sigla}>{state.sigla}</option>
            )
          }
        </select>
        <select onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
          {
            loadingCities ?
              <option>Carregando cidades...</option> :
              cities.length !== 0
                ? cities.map(city =>
                  <option key={city.id} value={city.nome}>{city.nome}</option>
                ) :
                <option>Selecione um estado primeiro</option>
          }
        </select>
      </div>
    </div>
    <div>
      <label>Logradouro / Número / Bairro</label>
      <div>
        <input
          type="text"
          name="locality"
          placeholder="Logradouro"
          onChange={e => setPublicPlace(e.target.value)}
          value={publicPlace} />
        <input
          type="text"
          name="street-address"
          placeholder="Bairro"
          onChange={e => setDistrict(e.target.value)}
          value={district} />
        <input
          type="text"
          name="street-number"
          placeholder="Número"
          onChange={handleNumber}
          value={number === 0 ? '' : number} />
      </div>
    </div>
    <div>
      <label>Complemento</label>
      <div>
        <input
          type="text"
          onChange={e => setComplement(e.target.value)}
          value={complement} />
      </div>
    </div>
  </div>
}
export default AddressInformation;