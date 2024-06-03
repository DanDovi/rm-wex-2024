import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./button";

export const Shell = () => {
  const { logout } = useAuth();
  return (
    <div>
      <header className="px-6 py-3 flex justify-between items-center bg-slate-700	 text-white">
        <h1>My App</h1>
        <Button onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </div>
  );
};
