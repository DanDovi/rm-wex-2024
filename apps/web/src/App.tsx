import { useRoutes } from "react-router-dom";

import routes from "./routes";

import "./App.css";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();
  const renderedRoutes = useRoutes(routes(!!user.username));

  return renderedRoutes;
}

export default App;
