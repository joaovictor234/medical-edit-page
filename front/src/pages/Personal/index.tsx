import { ChangeEvent, useContext, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import styles from './personal.module.css';
import '../../styles/form.css';
import FormHeader from '../../components/FormHeader';
import { PersonalContext } from '../../context/personalContext';
import { PersonalContextType } from '../../@types/personal';
import { ISnack } from '../../@types/snack';
import api from '../../apis/editApi';

const PersonalInformation = () => {
  const {
    name, setName,
    birthDate, setBirthDate,
    gender, setGender,
    img, setImg,
    email, setEmail,
    tel, setTel,
    rg, setRg,
    cpf, setCpf,
    cns, setCns
  } = useContext(PersonalContext) as PersonalContextType;

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<ISnack>({ severity: 'info', message: '' })
  const [openSnack, setOpenSnack] = useState(false);

  const handleImg = (files: FileList | null) => {
    const file = files && files[0];
    const reader = new FileReader();

    reader.onload = () =>
      setImg(reader.result as string);

    if (file) reader.readAsDataURL(file);
  }

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
    console.log(birthDate)
  }

  const handleTel = (e: ChangeEvent<HTMLInputElement>) => {
    let phone = e.target.value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
    setTel(phone);
  }

  const handleRg = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/\D+/g, '')
      .replace(/(\d{10})(\d)/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1');
    setRg(value)
  }

  const handleCpf = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
    setCpf(value);
  }

  const handleCns = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\s\d{4})\d+?$/, '$1');
    setCns(value)
  }

  const updatePersonal = () => {
    setLoading(true);
    api.put('/personal/1', {
      name,
      birthDate,
      gender,
      img,
      email,
      tel,
      rg,
      cpf,
      cns
    })
      .then(response => {
        setOpenSnack(true);
        setSnack({ severity: 'success', message: response.data.message });
      })
      .catch(err => {
        console.error(err);
        setOpenSnack(true);
        if (err.response.status === 400) {
          setSnack({ severity: 'warning', message: err.response.data.message })
        }
        if (err.response.status === 500) {
          setSnack({ severity: 'error', message: 'Não foi possível atualizar os dados' })
        }
      })
      .finally(() => setLoading(false))
  }


  return (
    <div className='form_container'>
      <FormHeader
        title='Informações pessoais'
        description='Atualize sua foto e dados pessoais aqui.'
        handleUpdateData={updatePersonal}
        loading={loading}
        buttonName='Editar'
        snack={snack}
        open={openSnack}
        setOpen={setOpenSnack} />
      <div>
        <label>Nome / Sobrenome</label>
        <div>
          <input
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
            required />
        </div>
      </div>
      <div>
        <label>Nascimento / Sexo</label>
        <div>
          <input
            type='date'
            onChange={handleDate} max={new Date().toISOString().split("T")[0]}
            value={birthDate}
            required />
          <select
            onChange={e => setGender(e.target.value)}
            value={gender}
            required>
            <option value="">Selecione o seu gênero</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      </div>
      <div className={styles.personal_image}>
        <label>
          <span>Sua foto</span>
          <p>isso será exibido no seu perfil.</p>
        </label>
        <div>
          <div>
            <img
              src={
                img ?
                  img :
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ3QHqE1UyVRSd5PSgStxOUlq3gd4MLZCJUxMXQZmXUNNR4v9l0BsgvXlBaVES8nbdCg&usqp=CAU"
              }
              alt=""
              className={styles.picture_img}
              width={80}
              height={80} />
          </div>
          <label htmlFor="picture_input" className={styles.picture_label}>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <CloudUploadIcon />
              <p><span>Clique para fazer upload</span> ou arraste e solte</p>
              <p>SVG, PNG ou JPG (máximo de 800x800)</p>
            </div>
          </label>
          <input
            id='picture_input'
            className={styles.picture_input}
            type="file"
            accept='image/*'
            onChange={e => handleImg(e.target.files)} />
        </div>
      </div>
      <div>
        <label>E-mail / Telefone</label>
        <div className='contact_container'>
          <div className='icons_input'>
            <div className={'icons_input_border'}>
              <EmailIcon />
              <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email} />
            </div>
          </div>
          <div className='icons_input'>
            <div className={'icons_input_border'}>
              <CallIcon />
              <input
                type="tel"
                onChange={handleTel}
                value={tel} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label>RG / CPF / CNS</label>
        <div>
          <input
            type="text"
            placeholder="RG"
            onChange={handleRg}
            value={rg} />
          <input
            type="text"
            placeholder="CPF"
            onChange={handleCpf}
            value={cpf} />
          <input
            type="text"
            placeholder="CNS"
            onChange={handleCns}
            value={cns} />
        </div>
      </div>
    </div>
  )
}

export default PersonalInformation;