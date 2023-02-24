import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import WarningIcon from '@mui/icons-material/WarningAmberOutlined';
import { ISnack } from "../../@types/snack";
import styles from './formheader.module.css';

interface IFormHeader {
  title: string,
  description: string,
  handleUpdateData: () => void,
  loading: boolean,
  buttonName: string,
  snack: ISnack,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const FormHeader = ({
  title,
  description,
  handleUpdateData,
  loading,
  buttonName,
  snack,
  open,
  setOpen }: IFormHeader) => {

  const [backgroundcolor, setBackgroundColor] = useState('');
  const [color, setColor] = useState('');

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  useEffect(() => {
    switch (snack.severity) {
      case "success":
        setBackgroundColor('#28BA22');
        setColor('#fff');
        return;
      case "error":
        setBackgroundColor('#E5322C');
        setColor('#fff');
        return;
      case "info":
        setBackgroundColor('#00C7E8');
        setColor('#333');
        return;
      case "warning":
        setBackgroundColor('#F2CC0F');
        setColor('#333');
        return;
    }
  }, [snack.severity])

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [open, setOpen])

  return (
    <>
      <div
        className={styles.form_header}>
        <div style={{ width: '70%' }}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {
          loading ?
            <button disabled>Salvando...</button> :
            <button type="submit" onClick={handleUpdateData}>{buttonName}</button>
        }
      </div>
      {
        open &&
        <div
          className={styles.snack}
          style={{ 
            backgroundColor: backgroundcolor,
            color: color }}>
          <div>
            {snack.severity === "success" && <DoneIcon fontSize="small" />}
            {snack.severity === "error" && <ErrorIcon fontSize="small" />}
            {snack.severity === "info" && <InfoIcon fontSize="small" />}
            {snack.severity === "warning" && <WarningIcon fontSize="small" />}
            <span>{snack.message}</span>
          </div>
          <button onClick={handleClose}>
            <CloseIcon fontSize="small" style={{color: color}}/>
          </button>
        </div>
      }
    </>
  )
}
export default FormHeader;