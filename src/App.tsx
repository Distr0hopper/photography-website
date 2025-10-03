import { useState } from "react";
import TopButtons from "./TopButtons";

function App() {
  const buttons = [
    "Home",
    "Über uns",
    "Hintergrundbilder",
    "Reiserouten",
    "Impressum",
  ];

  const [selectedPage, setSelectedPage] = useState(buttons[0]); // => "Home" is active by default

  return (
    <>
      <div
        id="header"
        className="flex justify-center items-center wx-full h-10 bg-green-900"
      >
        {/* 
        Create TopButtons dynamically so we dont need to rewrite 
        onClick and isActive for each button. Use .map beacuse .foreach 
        does not return anything (returns undefined). 
        Map returns an array which can be rendered.
        */}
        {buttons.map((buttonText) => (
          <TopButtons
            isActive={buttonText == selectedPage}
            onClick={() => setSelectedPage(buttonText)}
          >
            {buttonText}
          </TopButtons>
        ))}
      </div>
    </>
  );
}

export default App;
