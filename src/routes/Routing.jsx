import { Route } from "react-router-dom";
import Home from "../pages/Home";

// import Home from "src/pages/Home";

function Routing() {
  return (
    <>
      <Route path='/' element={<Home />} />
      {/* <Route path='/pricing' element={<Pricing />} />
      <Route path='/products' element={<Product />} /> */}
    </>
  );
}

export default Routing;
