import { Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { Button } from "./button";
import SearchBar from "./searchBar";
import styles from "./shell.module.css";

export const Shell = () => {
  const { logout } = useAuth();
  return (
    <div className={styles.shell}>
      <header className={styles.shellHeader}>
        <h1>My App</h1>
        <SearchBar />
        <Button onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </div>
  );
};
