import { Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { NotificationButton } from "./notificationButton";
import {Button} from "./button";
import styles from "./shell.module.css";
import SearchBar from "./searchBar";
import logo from "../assets/images/launchpad-logo.png";
import notifyButton from "../assets/images/notification-tile.png";
import pencilIcon from "../assets/images/pencil-tile.png";

export const Shell = () => {
  const { logout } = useAuth();
  return (
    <div className={styles.shell}>
      <header className={styles.shellHeader}>
      <img src={logo} alt="notifyButton" className={styles.logo} />
        <h1>My App</h1>
        <SearchBar />
        <NotificationButton onClick={logout}>
          <img src={notifyButton} alt="notifyButton" className={styles.logo} />
        </NotificationButton>
        <Button className={styles.writePostButton}>
        <img src={pencilIcon} alt="notifyButton" className={styles.logo} />
        Write Post
        </Button>
        <Button className={styles.logout} onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </div>
  );
};
