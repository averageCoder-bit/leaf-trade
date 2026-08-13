import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./frontend/routes/AppRoutes";
function App() {
  return (
    <main>
      <Router>
        <AppRoutes />
      </Router>
    </main>
  );
}

export default App;
