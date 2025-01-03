import styles from "./countryList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message />;

  const countries = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [
          ...arr,
          {
            country: city.country,
            emoji: city.emoji,
          },
        ];
      else return arr;
    },

    []
  );

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}

export default CountriesList;
