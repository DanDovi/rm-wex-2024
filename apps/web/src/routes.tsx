import { Navigate, Outlet } from "react-router-dom";
import { Login } from "./forms/login";
import { Register } from "./forms/register";
import { Shell } from "./components/shell";

// eslint-disable-next-line react-refresh/only-export-components
const ExampleLayout = ({ title }: { title?: string }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <Outlet />
    </div>
  );
};

const routes = (isLoggedIn: boolean) => {
  return [
  {
    path: "/app",
    element: isLoggedIn ? <Shell/> : <Navigate to="/login" />,
    children: [
      { path: "dashboard", element: <ExampleLayout title="dashboard"/> },
      { path: "account", element: <ExampleLayout title="account"/> },
      { path: "", element: <Navigate to="/app/dashboard" /> },
      {
        path: "member",
        element: <Outlet />,
        children: [
          { path: "", element: <ExampleLayout title="memberGrid"/> },
          { path: "add", element: <ExampleLayout title="addMember"/> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <ExampleLayout title=""/> : <Navigate to="/app/dashboard" />,
    children: [
      { path: "login", element: <Login />},
      { path: "register", element: <Register />},
      { path: "", element: <Navigate to="/login" /> },
    ]},

];
};

export default routes;
