import styles from "./countryList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountriesList({ countries, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!countries.length) return <Message />;

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}

export default CountriesList;
