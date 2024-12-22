import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";

// eslint-disable-next-line react/prop-types
function CityList({ Cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!Cities.length) return <Message />;

  return (
    <ul className={styles.cityList}>
      {Cities?.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
