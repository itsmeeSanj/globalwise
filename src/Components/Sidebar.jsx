import Logo from "./Logo";
import AppNav from "./AppNav";
import style from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <footer className={style.footer}>
        <p className={style.copyright}>
          &copy; Coypyright {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
