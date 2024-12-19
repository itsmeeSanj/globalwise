import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to='sdf'>HEHE</Link>
          </li>
          <li>
            <Link to='sdf'>HEHE</Link>
          </li>
          <li>
            <Link to='sdf'>HEHE</Link>
          </li>
          <li>
            <Link to='sdf'>HEHE</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AppNav;
