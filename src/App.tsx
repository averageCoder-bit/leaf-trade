import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./frontend/routes/AppRoutes";
import { ToastUI } from "./frontend/components/ToastUI";
import IdleSignOut from "./frontend/auth/IdleSignout";
function App() {
  return (
    <Router>
      <ToastUI />
      <IdleSignOut />
      <AppRoutes />
    </Router>
  );
}

export default App;
