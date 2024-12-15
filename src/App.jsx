import { BrowserRouter, Routes } from "react-router-dom";

import Routing from "./routes/Routing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Routing />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
