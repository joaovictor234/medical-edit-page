import { FormControlLabel, styled, Switch, SwitchProps } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ProfessionalContextType } from '../../@types/professional';
import { ISnack } from '../../@types/snack';
import api from '../../apis/editApi';
import { returnBrazilStates } from '../../apis/queryStates';
import FormHeader from '../../components/FormHeader';
import { ProfessionalContext } from '../../context/professionalContext';
import State from '../../interfaces/State';
import '../../styles/form.css';

const conselhos = ["CFA", "CRA", "OAB", "CAU/BR", "CAU/UF", "CFESS", "CRESS", "CFB", "CRB", "CFBM", "CRBM", "CFC", "CRC", "COFECON", "CORECON", "CFEP", "CREP", "COFEN", "COREN", "CONFEA", "CREA", "CFF", "CRF", "COFFITO", "CREFITO", "CFFa", "CREFONO", "CFM", "CRM", "CFMV", "CRMV", "COFEM", "COREM", "CFN", "CRN", "CFO", "CRO", "CFP", "CRP", "CFQ", "CRQ", "CONFERP", "CONRERP"]

const especialidades = ["Acumputura", "Alergia e Imunologia", "Anestesiologista", "Angiologia", "Cardiologia", "Cirurgia Cardiovascular", "Cirurgia de Mão", "Cirurgia de Cabeça e Pescoço", "Cirurgia do Aparelho Digestivo", "Cirurgia Geral", "Cirurgia Oncológica", "Cirurgia Pediátrica", "Cirurgia Plástica", "Cirurgia Torácica", "Cirurgia Vascular", "Clínica Médica", "Coloproctologia", "Dermatologia", "Endocrinologia e Metabologia", "Endoscopia", "Gastroenterogia", "Genética Médica", "Geriatria", "Ginecologia e Obstetrícia", "Hematologia e Hemoterapia", "Hemeopatia", "Infectologia", "Mastologia", "Medicina de Emergência", "Medicina de Família e Comunidade", "Medicina do Trabalho", "Medicina de Tráfego", "Medicina Esportiva", "Medicina Física e Reabilitação", "Medicina Intensiva", "Medicina Legal e Perícia Médica", "Medicina Nuclear", "Medicina Preventiva e Social", "Nefrologia", "Neurocirurgia", "Neurologia", "Nutrologia", "Oftalmologia", "Oncologia Clínica", "Ortopedia e Traumatologia", "Otorrinolaringologia", "Patologia", "Patologia Clínica/Medinica Laboratorial", "Pediatria", "Pneumologia", "Psiquiatria", "Radiologia e Diagnóstico por Imagem", "Radioterapia", "Reumatologia", "Urologia"]

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#00C7E8',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[900]
          : theme.palette.grey[900]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 1
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#e9e9ea' : '#00C7E8',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

const ProfessionalInformation = () => {
  const {
    conselho, setConselho,
    estadoConselho, setEstadoConselho,
    numeroConselho, setNumeroConselho,
    especialidade, setEspecialidade,
    rqe, setRqe,
    idUser, setIdUser,
    sincronizacaoMEMED, setSincronizacaoMEMED
  } = useContext(ProfessionalContext) as ProfessionalContextType;

  const [states, setStates] = useState<State[]>([])
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<ISnack>({ severity: 'info', message: '' })
  const [openSnack, setOpenSnack] = useState(false);

  const handleNumbers = (type: 'conselho' | 'rqe' | 'id') => (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value.replace(/\D/g, ''));
    if (value) {
      switch (type) {
        case 'conselho':
          setNumeroConselho(value);
          return;
        case 'rqe':
          setRqe(value);
          return;
        case 'id':
          setIdUser(value);
          return;
        default:
          return;
      }
    }
  }

  const updateProfessional = () => {
    setLoading(true);
    api.put('/professional/1', {
      conselho,
      estadoConselho,
      numeroConselho,
      especialidade,
      rqe,
      sincronizacaoMEMED
    })
      .then(response => {
        setOpenSnack(true);
        setSnack({ severity: 'success', message: response.data.message });
        const professional = response.data.professional;
        setConselho(professional.conselho);
        setEstadoConselho(professional.estadoConselho);
        setNumeroConselho(Number(professional.numeroConselho))
        setEspecialidade(professional.especialidade);
        setRqe(Number(professional.rqe));
        setSincronizacaoMEMED(professional.sincronizacaoMEMED);
      })
      .catch(err => {
        console.error(err);
        setOpenSnack(true);
        if (err.response.status === 400) {
          setSnack({ severity: 'warning', message: err.response.data.message });
        }
        if (err.response.status === 500) {
          setSnack({ severity: 'error', message: 'Não foi possível atualizar os dados' })
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    returnBrazilStates(setStates)
  }, [])

  return (
    <div className='form_container'>
      <FormHeader
        title='Informações pessoais'
        description='Atualize seus dados profissionais aqui.'
        handleUpdateData={updateProfessional}
        loading={loading}
        buttonName='Editar'
        snack={snack}
        open={openSnack}
        setOpen={setOpenSnack} />
      <div>
        <label>Conselho / Estado conselho</label>
        <div>
          <select
            onChange={e => setConselho(e.target.value)}
            value={conselho}>
            <option value="">Selecione o tipo do conselho</option>
            {
              conselhos.map((conselho, index) => <option key={index} value={conselho}>{conselho}</option>)
            }
          </select>
          <select
            onChange={e => setEstadoConselho(e.target.value)}
            value={estadoConselho}>
            <option value="">Selecione o estado do conselho</option>
            {
              states && states.map(state => <option key={state.id} value={state.sigla}>{state.sigla}</option>)
            }
          </select>
        </div>
      </div>
      <div>
        <label>Número do conselho</label>
        <div>
          <input
            type="number"
            onChange={handleNumbers('conselho')}
            value={numeroConselho === 0 ? '' : numeroConselho} />
        </div>
      </div>
      <div>
        <label>Especialidade / RQE</label>
        <div>
          <select value={especialidade} onChange={e => setEspecialidade(e.target.value)}>
            {
              especialidades.map((especialidade, index) => <option key={index} value={especialidade}>{especialidade}</option>)
            }
          </select>
          <input
            type="number"
            onChange={handleNumbers('rqe')}
            value={rqe === 0 ? '' : rqe} />
        </div>
      </div>
      <div>
        <label>ID user / Sincronização MEMED</label>
        <div>
          <input
            type="number"
            onChange={handleNumbers('id')}
            value={idUser === 0 ? '' : idUser}
            disabled />
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} checked={sincronizacaoMEMED} onClick={() => setSincronizacaoMEMED(!sincronizacaoMEMED)} />}
            label={sincronizacaoMEMED ? 'Ativo' : 'Inativo'} />
        </div>
      </div>
    </div>
  )
}
export default ProfessionalInformation;