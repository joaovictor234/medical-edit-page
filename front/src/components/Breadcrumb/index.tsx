import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './breadcrumbs.module.css';

const weeks = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const Breadcrumb = () => {
  return (
    <div className={styles.container}>
      <div>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={styles.breadcrumbs}>
          <Link underline="hover" color='inh
            ' className={styles.text}>
            <HomeIcon fontSize="small" className={styles.home_icon} />
          </Link>
          <Link underline="hover" color='inh
            ' className={styles.text}>
            Início
          </Link>
          <Link underline="hover" color='inh
            ' className={`${styles.active} ${styles.text}`}>
            Perfil
          </Link>
        </Breadcrumbs>
        <span className={styles.date}>{weeks[(new Date()).getDay()]}, {(new Date()).getDate()} de {months[(new Date()).getMonth()]} de {(new Date()).getFullYear()}</span>
      </div>
      <div className={styles.manager_container}>
        <SettingsIcon
          fontSize="small"
          className={styles.manager_icons}
          titleAccess="Configurações" />
        <NotificationsIcon
          fontSize="small"
          className={styles.manager_icons}
          titleAccess="Notificações" />
        <div className={styles.unidade}>
          <div>
            <h6>Clínica OdontoLife</h6>
            <p>Unidade 2 - Consultório 1</p>
          </div>
          <KeyboardArrowDownIcon fontSize="small" className={styles.unidade_icon} />
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb;