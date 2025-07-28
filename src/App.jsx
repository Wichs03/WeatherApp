import { useState } from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      <div className="flex flex-row">
        <SideBar
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <Content selectedCity={selectedCity} />
      </div>
    </>
  );
}

export default App;
