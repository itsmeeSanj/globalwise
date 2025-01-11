import React, { createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
// 1.
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  curCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded": // should be more like event
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "cities/created":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, curCity } = state;

  // const [cities, setCities] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [curCity, setCurCity] = React.useState({});

  React.useEffect(function () {
    async function dataFetech() {
      dispatch({
        type: "loading",
      });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
      } catch (error) {
        throw new Error("Something is wrong :(", error);
      } finally {
        // setIsLoading(false);
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
    throw new Error("Cities contex was used outs ide of the citiesProvider");

  return value;
}

export { CitiesProvider, useCities };
