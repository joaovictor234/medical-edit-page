import { NavLink } from "react-router-dom";
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to='/general-data'
        className={({ isActive }) => isActive
          ? styles.active : undefined}>
        <p>Dados gerais</p>
      </NavLink>
      <NavLink
        to='/adress'
        className={({ isActive }) => isActive
          ? styles.active : undefined}>
        <p>Endereço</p>
      </NavLink>
      <NavLink
        to='/password'
        className={({ isActive }) => isActive
          ? styles.active : undefined}>
        <p>Senha</p>
      </NavLink>
      <NavLink
        to='/professional'
        className={({ isActive }) => isActive
          ? styles.active : undefined}>
        <p>Dados profissionais</p>
      </NavLink>
    </nav>
  )
}
export default Navbar;