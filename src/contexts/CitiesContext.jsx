import React, { createContext, useContext } from "react";

const BASE_URL = "http://localhost:9000";
// 1.
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

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]); //refetch data instantly
      console.log("data", data);
    } catch (error) {
      throw new Error("Something is wrong :(", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id)); //refetch data instantly
    } catch (error) {
      throw new Error("There was an error while deleting city. :(", error);
    } finally {
      setIsLoading(false);
    }

    // Cities.filter()
    console.log("delete");
  }

  return (
    // 2.
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  // 3.
  const value = useContext(CitiesContext);

  if (value === undefined)
    throw new Error("Cities contex  was used outside of the citiesProvider");

  return value;
}

export { CitiesProvider, useCities };
