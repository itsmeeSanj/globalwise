import AppNav from "./AppNav";
import Logo from "./Logo";
import style from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      Sidebar
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <footer className={style.footer}>
        <p className={style.copyright}>&copy; Coypyright</p>
      </footer>
    </div>
  );
}

export default Sidebar;
