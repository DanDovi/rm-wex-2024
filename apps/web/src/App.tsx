import "./App.css";

import { useRoutes } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import routes from "./routes";

function App() {
  const { user } = useAuth();
  const renderedRoutes = useRoutes(routes(!!user.username));
  return renderedRoutes;
}

export default App;
