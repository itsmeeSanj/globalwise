import React, { createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
// 1.
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  curCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded": // fetch (get)
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        curCity: action.payload,
      };

    case "cities/created": //post
      return {
        ...state,
        isLoading: true,
      };

    case "cities/deleted": //delete
      return {
        ...state,
        isLoading: false,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
      }); //isloading

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({
          type: "cities/loaded",
          payload: data,
        }); //setData
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data :(",
        });
      }
    }
    dataFetech();
  }, []);

  async function getCity(id) {
    dispatch({
      type: "loading",
    });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({
        type: "city/loaded",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data :(",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({
        type: "cities/created",
        payload: (cities) => [...cities, data],
      });

      // setCities((cities) => [...cities, data]); //refetch data instantly
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data :(",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({
      type: "loading",
    });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "cities/created",
        payload: (cities) => cities.filter((city) => city.id !== id),
      });

      // setCities((cities) => cities.filter((city) => city.id !== id)); //refetch data instantly
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data :(",
      });
    }
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
    throw new Error("Cities contex was used outside of the citiesProvider");

  return value;
}

export { CitiesProvider, useCities };
