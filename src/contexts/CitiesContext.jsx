import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

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

    case "city/created": //post
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        curCity: action.payload,
      };

    case "city/deleted": //delete
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        curCity: {},
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
  const { cities, isLoading, curCity, error } = state;

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

  // get city
  const getCity = useCallback(
    async function getCity(id) {
      if (id === curCity.id) return; //id is string that comes from url so make sure you change it into number

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
    },
    [curCity.id]
  );

  // create city
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
        type: "city/created",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data :(",
      });
    }
  }

  // delete city
  async function deleteCity(id) {
    dispatch({
      type: "loading",
    });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "city/deleted",
        payload: id,
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
        error,
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
