import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from 'react';
import { PersonalContextType } from '../../../@types/personal';
import { ProfessionalContextType } from '../../../@types/professional';
import { PersonalContext } from '../../../context/personalContext';
import { ProfessionalContext } from '../../../context/professionalContext';
import styles from './profile.module.css';

const Profile = () => {
  const { img, name } = useContext(PersonalContext) as PersonalContextType;
  const { especialidade } = useContext(ProfessionalContext) as ProfessionalContextType;

  return (
    <div className={styles.avatar_container}>
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
        <div>
          <p className={styles.name}>{
            name ?
              name.split(' ')[0] :
              'Default User'
          }</p>
          <p className={styles.profession}>{
            especialidade ?
              especialidade :
              'Default Job'
          }</p>
        </div>
      </div>
      <button><KeyboardArrowDownIcon /></button>
    </div>
  )
}

export default Profile;