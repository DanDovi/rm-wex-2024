import { Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { Button } from "./button";
import styles from "./shell.module.css";

export const Shell = () => {
  const { logout } = useAuth();
  return (
    <div>
      <header className={styles.shell}>
        <h1>My App</h1>
        <Button onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </div>
  );
};
