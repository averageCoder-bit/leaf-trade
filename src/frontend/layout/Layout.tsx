import Navbar from "../components/Navbar";
import Outlet from "./Outlet";
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
