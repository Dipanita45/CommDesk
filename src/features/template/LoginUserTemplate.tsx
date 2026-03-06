import SideBar from "../SideBar/v1/Section/SideBar";
import { getTheme } from "../../config/them.config";
import { Outlet } from "react-router";

const LoginUserTemplate = () => {
  let theme = getTheme("light");

  return (
    <div
      className="dashboard-page flex w-screen min-h-screen overflow-x-hidden items-stretch"
      style={{ background: theme.background.secondary }}
    >
      <SideBar />

      <div className="dashboard-content flex flex-row flex-1 min-h-screen bg-green-200">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginUserTemplate;
