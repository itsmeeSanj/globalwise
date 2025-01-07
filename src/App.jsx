import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CityList from "./Components/CityList";
import CountriesList from "./Components/CountriesList";
import City from "./Components/City";
import Form from "./Components/Form";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='product' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            {/* navigate */}

            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountriesList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
