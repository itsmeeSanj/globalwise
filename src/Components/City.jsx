import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ButtonBack from "./ButtonBack";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// TEMP DATA
const currentCity = {
  cityName: "Lisbon",
  emoji: "🇵🇹",
  date: "2027-10-31T15:59:59.138Z",
  notes: "My favorite city so far!",
};

function City() {
  const [city, setCity] = React.useState([]);
  const { params } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { cityName, emoji, date, notes } = currentCity;

  React.useEffect(function () {
    function fetchCityAPI() {}
    fetchCityAPI();
  }, []);

  return (
    <div className={styles.city}>
      <h1>lat: {lat}</h1>
      <h1>lng: {lng}</h1>

      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>

      {/*  */}
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        change paramsss
      </button>
    </div>
  );
}

export default City;
