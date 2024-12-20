import Logo from "./Logo";
import AppNav from "./AppNav";
import style from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />

      {/* display outlet */}
      <Outlet />

      <footer className={style.footer}>
        <p className={style.copyright}>
          &copy; copyright {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
