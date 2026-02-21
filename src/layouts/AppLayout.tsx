import { Outlet } from "react-router-dom";
import NavBar from "../components/Nav";
const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
