import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./frontend/routes/AppRoutes";
import { ToastUI } from "./frontend/components/ToastUI";
import IdleSignOut from "./frontend/auth/IdleSignout";
import PageTitle from "./frontend/components/PageTitle";
function App() {
  return (
    <Router>
      <ToastUI />
      <IdleSignOut />
      <PageTitle />
      <AppRoutes />
    </Router>
  );
}

export default App;
