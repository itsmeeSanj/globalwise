import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Button from "./Button";
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

const BASE_URL = "";

function City() {
  const [city, setCity] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [state, setState] = React.useState(0);

  // const { params } = useParams();
  // const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  // const { cityName, emoji, date, notes } = currentCity;

  // React.useEffect(function () {
  //   async function fetchCityAPI() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${BASE_URL}`);
  //       const data = await res.json();

  //       setCity(data);
  //     } catch (error) {
  //       throw new Error("error", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCityAPI();
  // }, []);

  React.useEffect(() => {
    setState((state) => state + 1);
  }, []);
  console.log("App");

  return (
    <div>
      <A state={state} />
      <D />
    </div>

    // <div className={styles.city}>
    //   <h1>lat: {lat}</h1>
    //   <h1>lng: {lng}</h1>

    //   <div className={styles.row}>
    //     <h6>City name</h6>
    //     <h3>
    //       <span>{emoji}</span> {cityName}
    //     </h3>
    //   </div>

    //   <div className={styles.row}>
    //     <h6>You went to {cityName} on</h6>
    //     <p>{formatDate(date || null)}</p>
    //   </div>

    //   {notes && (
    //     <div className={styles.row}>
    //       <h6>Your notes</h6>
    //       <p>{notes}</p>
    //     </div>
    //   )}

    //   <div className={styles.row}>
    //     <h6>Learn more</h6>
    //     <a
    //       href={`https://en.wikipedia.org/wiki/${cityName}`}
    //       target='_blank'
    //       rel='noreferrer'
    //     >
    //       Check out {cityName} on Wikipedia &rarr;
    //     </a>
    //   </div>

    //   <Button onClick={() => navigate(-1)} type='primary'>
    //     Go Back
    //   </Button>

    //   {/*  Search Params */}
    //   {/* <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
    //     change paramsss
    //   </button> */}
    // </div>
  );
}

export default City;

function A() {
  console.log("A");
  return <B />;
}

function B() {
  console.log("B");
  return <C />;
}

function C() {
  console.log("C");
  return null;
}

function D() {
  console.log("D");
  return null;
}
