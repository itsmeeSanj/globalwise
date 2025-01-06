import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city, onDeleteItem }) {
  const { curCity } = useCities();
  const { cityName, emoji, date, id, position } = city; //destructure

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === curCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={() => onDeleteItem(id)}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
