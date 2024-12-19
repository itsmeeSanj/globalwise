import styles from "./AppNav.module.css"; // destructure
import Sidebar from "./Sidebar";

function AppNav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Sidebar />
          </li>
          <li>sdfdsf</li>
        </ul>
      </nav>
    </>
  );
}

export default AppNav;
