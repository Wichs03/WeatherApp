import { useState } from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      <div className="flex flex-row">
        <SideBar
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <div className="flex flex-col">
          <Content selectedCity={selectedCity} />
          <WeatherDetails selectedCity={selectedCity} />
        </div>
      </div>
    </>
  );
}

export default App;
