import { useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log("lat", lat, lng);

  // console.log(searchParams);
  return (
    <div className={styles.mapContainer}>
      <div className={styles.map}>
        <h1>Map</h1>
        <h1>
          Position: {lat} {lng}
        </h1>
      </div>
    </div>
  );
}

export default Map;
