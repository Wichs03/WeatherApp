import { useState } from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleUnitChange = (unit) => {
    setIsCelsius(unit === "C");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideBar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isCelsius={isCelsius}
      />
      <div className="flex flex-col flex-grow">
        <Content
          selectedCity={selectedCity}
          isCelsius={isCelsius}
          handleUnitChange={handleUnitChange}
        />
        <WeatherDetails selectedCity={selectedCity} isCelsius={isCelsius} />
      </div>
    </div>
  );
}

export default App;
