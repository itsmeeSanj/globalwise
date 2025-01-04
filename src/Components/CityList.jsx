import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

// eslint-disable-next-line react/prop-types
function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map :)' />
    );

  function handleDeleteItem() {
    // Cities.filter()
    console.log("delete");
  }

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => {
        return (
          <CityItem city={city} key={city.id} onDeleteItem={handleDeleteItem} />
        );
      })}
    </ul>
  );
}

export default CityList;
