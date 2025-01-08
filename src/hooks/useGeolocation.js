import React from "react";

export function useGeolocation(defaultLocation = null) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [position, setPosition] = React.useState(defaultLocation);
  const [error, setError] = React.useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
