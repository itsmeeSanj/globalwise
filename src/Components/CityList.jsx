import React from "react";

import styles from "./CityList.module.css";

function CityList() {
  const [cities, setCities] = React.useState([]);

  React.useEffect(function () {
    async function dataFetech() {
      try {
        const citiesFetch = await fetch("http://localhost:9000/cities");
        const citiesOutput = await citiesFetch.json();
        setCities(citiesOutput);
      } catch (error) {
        throw new Error("NOT FOUND", error);
      }
    }
    dataFetech();
  }, []);

  return (
    <div className={styles.cityList}>
      {cities.map((city, index) => {
        return <div key={index}>{city.cityName}</div>;
      })}
    </div>
  );
}

export default CityList;
