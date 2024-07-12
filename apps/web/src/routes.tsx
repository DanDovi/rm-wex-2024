import { Navigate, Outlet, RouteObject } from "react-router-dom";

import { Shell } from "./components/shell";
import { Login } from "./forms/login";
import { Register } from "./forms/register";
import { Dashboard } from "./views/dashboard";
import { Post } from "./views/post";
import { Topic } from "./views/topic";

// eslint-disable-next-line react-refresh/only-export-components
const ExampleLayout = ({ title }: { title?: string }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <Outlet />
    </div>
  );
};

const routes = (isLoggedIn: boolean): Array<RouteObject> => {
  return [
    {
      path: "/app",
      element: isLoggedIn ? <Shell /> : <Navigate to="/login" />,
      children: [
      
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "topic/:topicId",
          element: <Topic />,
          children: [{ path: "post/:postId", element: <Post /> }],
        },
        
        {
          path: "member",
          element: <Outlet />,
          children: [
            { path: "", element: <ExampleLayout title="memberGrid" /> },
            { path: "add", element: <ExampleLayout title="addMember" /> },
          ],
        },
        { path: "", element: <Navigate to="dashboard" replace /> },
      ],
    },
    {
      path: "/",
      element: !isLoggedIn ? (
        <ExampleLayout title="" />
      ) : (
        <Navigate to="/app/dashboard" />
      ),
      errorElement: <Navigate to="/" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "", element: <Navigate to="/login" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/app/dashboard" />,
    }
  ];
};

export default routes;
