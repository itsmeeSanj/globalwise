import React, { createContext, useContext } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [curCity, setCurCity] = React.useState({});

  React.useEffect(function () {
    async function dataFetech() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        throw new Error("Something is wrong :(", error);
      } finally {
        setIsLoading(false);
      }
    }
    dataFetech();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurCity(data);
    } catch (error) {
      throw new Error("Something is wrong :(", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);

  if (value === undefined)
    throw new Error("Cities contex  was used outside of the citiesProvider");

  return value;
}

export { CitiesProvider, useCities };
