import { Link } from "react-router-dom";

import PageNav from "../Components/PageNav";
import AppNav from "../Components/AppNav";

function Home() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>World wise</h1>
      <Link to='app'>Go to the app</Link>
    </div>
  );
}

export default Home;
