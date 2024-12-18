import { Link } from "react-router-dom";

import PageNav from "../Components/PageNav";

function Home() {
  return (
    <div>
      <PageNav />
      {/* <title>WorlDDD WIse</title> */}
      <Link to='app'>Go to the app</Link>
    </div>
  );
}

export default Home;
