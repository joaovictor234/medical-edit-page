import LockIcon from '@mui/icons-material/Lock';
import { useContext, useState } from 'react';
import { PasswordContextType } from '../../@types/password';
import { ISnack } from '../../@types/snack';
import api from '../../apis/editApi';
import FormHeader from '../../components/FormHeader';
import { PaswordContext } from '../../context/passwordContext';
import '../../styles/form.css';
import styles from './password.module.css';

const PasswordInformation = () => {
  const {
    userName, setUserName,
    password, setPassword
  } = useContext(PaswordContext) as PasswordContextType;

  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState<'text' | 'password'>('password');
  const [changePassword, setChangedPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [snack, setSnack] = useState<ISnack>({ severity: 'info', message: '' });
  const [openSnack, setOpenSnack] = useState(false);

  const changeVisibility = () => {
    if (visibility === 'password') setVisibility('text');
    else setVisibility('password')
  }

  const defineNewPassword = () => {
    setChangedPassword(true);
  }

  const updatePassword = () => {
    if (newPassword === '') {
      if (newPassword === "") {
        setOpenSnack(true);
        setSnack({ severity: 'warning', message: 'A nova senha não pode ser vazia' })
      }
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setOpenSnack(true);
      setSnack({ severity: 'warning', message: 'As senhas não são iguais!' });
      return;
    }
    if (userName === "") {
      setOpenSnack(true);
      setSnack({ severity: 'warning', message: 'O campo de usuário não pode estar vazio!' })
      return;
    }
    setLoading(true);
    api.put('/user/1', { username: userName, password: newPassword })
      .then(response => {
        setOpenSnack(true);
        setSnack({ severity: 'success', message: response.data.message });
        setUserName(response.data.user.username);
        setPassword(response.data.user.password);
        setChangedPassword(false);
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch(err => {
        console.error(err)
        setOpenSnack(true);
        setSnack({ severity: 'error', message: err.response.data.message });
      })
      .finally(() => setLoading(false));
  }

  return <div className='form_container'>
    <FormHeader
      title='Informações pessoais'
      description='Atualize sua senha aqui.'
      handleUpdateData={changePassword ? updatePassword : defineNewPassword}
      loading={loading}
      buttonName={changePassword ? 'Salvar senha' : 'Mudar senha'}
      snack={snack}
      open={openSnack}
      setOpen={setOpenSnack} />
    <div>
      <label>Usuário / Senha</label>
      <div>
        <input
          type="text"
          onChange={e => setUserName(e.target.value)}
          value={userName} />
        <div className='icons_input'>
          <div className='icons_input_border'>
            <LockIcon
              onClick={changeVisibility}
              style={{ cursor: 'pointer' }}
              className={
                visibility === 'text' ? `${styles.icon_password} ${styles.icon_password_visible}` :
                  styles.icon_password} />
            <input
              type={visibility}
              onChange={e => setPassword(e.target.value)}
              value={password} />
          </div>
        </div>
      </div>
    </div>
    {
      changePassword &&
      <div>
        <label>Nova senha / Repetir senha</label>
        <div>
          <div className='icons_input'>
            <div className='icons_input_border'>
              <LockIcon
                onClick={changeVisibility}
                style={{ cursor: 'pointer' }}
                className={
                  visibility === 'text' ? `${styles.icon_password} ${styles.icon_password_visible}` :
                    styles.icon_password} />
              <input
                type={visibility}
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder='New password' />
            </div>
          </div>
          <div className="icons_input">
            <div className='icons_input_border'>
              <LockIcon
                onClick={changeVisibility}
                style={{ cursor: 'pointer' }}
                className={
                  visibility === 'text' ? `${styles.icon_password} ${styles.icon_password_visible}` :
                    styles.icon_password} />
              <input
                type={visibility}
                onChange={e => setConfirmNewPassword(e.target.value)}
                value={confirmNewPassword}
                placeholder='Confirm new password' />
            </div>
          </div>
        </div>
      </div>
    }
  </div>
}

export default PasswordInformation;