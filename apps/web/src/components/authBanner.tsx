import styles from './authBanner.module.css';
import logo from '../assets/images/launchpad-logo.png';

export const AuthBanner = ()=>{
    return (
        <div className={styles.authBanner}>
            <img className={styles.logoImage} src={logo} alt='launchpad logo' />
        </div>
    )
}
