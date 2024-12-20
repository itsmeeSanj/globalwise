import { BrowserRouter, Route, Routes } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import City from "./Components/City";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index path='cities' element={<City />} />
          <Route path='countries' element={<>sdsdsss</>} />
          <Route path='form' element={<>Form</>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
