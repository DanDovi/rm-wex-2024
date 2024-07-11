import logo from "../assets/images/launchpad-logo.png";
import styles from "./authBanner.module.css";

export const AuthBanner = ()=> {
    return (
        <div className ={styles.banner} >
         <img src={logo}/>
    
        </div>)
}
