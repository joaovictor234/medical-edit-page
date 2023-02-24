import { useContext, useState } from "react";
import { Box, Divider, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import EventIcon from '@mui/icons-material/EventOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospitalOutlined';
import TvIcon from '@mui/icons-material/Tv';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ForumIcon from '@mui/icons-material/ForumOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Profile from "./Profile";
import { PersonalContext } from "../../context/personalContext";
import { PersonalContextType } from "../../@types/personal";
import styles from './sidebar.module.css';

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { img } = useContext(PersonalContext) as PersonalContextType;

  return (
    <div>
      <div className={styles.sidebar_hide}>

        <div
          className={`${styles.action_button} ${styles.open_button}`}
          title="Expandir"
          onClick={() => setOpenSidebar(true)}>
          <KeyboardArrowRightIcon fontSize="small" />
        </div>

        <div>
          <img
            src={
              img ?
                img :
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ3QHqE1UyVRSd5PSgStxOUlq3gd4MLZCJUxMXQZmXUNNR4v9l0BsgvXlBaVES8nbdCg&usqp=CAU"
            }
            alt=""
            className={styles.avatar}
            width={40}
            height={40} />
          <div className={styles.avatar_online} />
        </div>

        <div className={styles.divider} />

        <ul className={styles.list}>
          <li>
            <HomeIcon fontSize="small" titleAccess="Início" />
          </li>
          <li>
            <EventIcon fontSize="small" titleAccess="Consultório" />
          </li>
          <li>
            <LocalHospitalIcon fontSize="small" titleAccess="Clínicas" />
          </li>
          <li>
            <TvIcon fontSize="small" titleAccess="Painel de atendimento" />
          </li>
        </ul>

        <div className={styles.divider} />

        <ul className={styles.list}>
          <li>
            <NotificationsIcon fontSize="small" titleAccess="Notificações" />
          </li>
          <li>
            <HelpOutlineIcon fontSize="small" titleAccess="Central de ajuda" />
          </li>
          <li>
            <SettingsIcon fontSize="small" titleAccess="Configurações" />
          </li>
          <li>
            <ArrowBackIcon fontSize="small" titleAccess="Sair" />
          </li>

        </ul>
        <div className={styles.spacing} />
        <ForumIcon fontSize="small" className={styles.chat} />
      </div>

      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}>

        <div
          className={`${styles.action_button} ${styles.close_button}`}
          title="Recuar"
          onClick={() => setOpenSidebar(false)}>
          <KeyboardArrowLeftIcon fontSize="small" />
        </div>

        <div className={styles.sidebar}>
          <Profile />
        </div>

        <p className={styles.display_title}>Ferramentas</p>

        <Box style={{ width: 275 }}>
          <ul className={styles.list_sidebar}>
            <li>
              <HomeIcon fontSize="small" />
              <p>Início</p>
            </li>
            <li>
              <EventIcon fontSize="small" />
              <p>Consultório</p>
            </li>
            <li >
              <LocalHospitalIcon fontSize="small" />
              <p>Clínicas</p>
            </li>
            <li >
              <TvIcon fontSize="small" />
              <p>Painel de atendimento</p>
            </li>
          </ul>

          <Divider style={{ margin: '0 20px' }} />

          <p className={styles.display_title}>Outros</p>

          <ul className={styles.list_sidebar}>
            <li >
              <NotificationsIcon fontSize="small" />
              <p>Notificações</p>
            </li>
            <li >
              <HelpOutlineIcon fontSize="small" />
              <p>Central de ajuda</p>
            </li>
            <li >
              <SettingsIcon fontSize="small" />
              <p>Configurações</p>
            </li>
            <li >
              <ArrowBackIcon fontSize="small" />
              <p>Sair</p>
            </li>
          </ul>

          <div className={styles.spacing} />
          <ForumIcon
            fontSize="small"
            className={styles.chat}
            style={{ marginLeft: 20 }} />
        </Box>
      </Drawer>
    </div>
  )
}

export default Sidebar;