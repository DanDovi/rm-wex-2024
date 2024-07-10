import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./button";
import styles from "./shell.module.css";
import SearchBar from './searchBar'

export const Shell = () => {
  const { logout } = useAuth();
  return (
    <div>
      <header className={styles.shell}>
        <h1>My App</h1>
        <SearchBar />
        <Button onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </div>
  );
};