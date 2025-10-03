import TopNavigation from "./components/TopNavigation";
import About from "./pages/About";
import Backgrounds from "./pages/Backgrounds";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import Routes from "./pages/Routes";

import { useState } from "react";
function App() {
  const [selectedPage, setSelectedPage] = useState("Home"); // => "Home" is active by default
  return (
    <>
      <TopNavigation
        selectedPage={selectedPage}
        setActivePage={setSelectedPage}
      ></TopNavigation>
      <Home></Home>
      <About></About>
      <Backgrounds></Backgrounds>
      <Routes></Routes>
      <Impressum></Impressum>
    </>
  );
}

export default App;
