import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='products' element={<Product />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
