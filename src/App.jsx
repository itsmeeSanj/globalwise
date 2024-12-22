import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CityList from "./Components/CityList";
import CountriesList from "./Components/CountriesList";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route
            index
            element={<CityList Cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities'
            element={<CityList Cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='countries'
            element={<CountriesList countries={cities} isLoading={isLoading} />}
          />
          <Route path='form' element={<>Form</>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
