// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useUrlposition } from "../hooks/useUrlposition";
import Message from "./Message";
import Spinner from "./Spinner";

import { useCities } from "../contexts/CitiesContext";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlposition();
  const { createCity, isLoading } = useCities();

  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      if ((!lat, !lng)) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeo(true);
          setGeoError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error("That doesn't seem to be a city :(");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || data.locality || "");
          setEmoji(data.countryCode || "");
        } catch (error) {
          setGeoError(error.message);
        } finally {
          setIsLoadingGeo(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      emoji,
      country,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity); //async
    navigate("/app/cities");
  }

  if (isLoadingGeo) return <Spinner />;
  if ((!lat, !lng)) return <Message message={"Start by clicking on the map"} />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>Wheen did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat='DD/MM/YYYY'
        />

        {/* <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
