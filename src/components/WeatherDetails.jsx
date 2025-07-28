import React, { useState, useEffect } from "react";
import NavigationIcon from "../assets/icons/navigation.svg";

export default function WeatherDetails({ selectedCity }) {
  const [weatherDetailsData, setWeatherDetailsData] = useState(null);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeatherDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        setWeatherDetailsData(data);
      } catch (error) {
        console.error("Error fetching weather details:", error);
      }
    };

    fetchWeatherDetails();
  }, [selectedCity]);

  if (!weatherDetailsData) {
    return (
      <p className="text-[#E7E7EB]">Selecciona una ciudad para ver detalles</p>
    );
  }

  return (
    <div className="md:w-[60vw] lg:w-[70vw] h-[50vh] bg-[#100E1D] flex flex-col justify-center items-center">
      <h2 className="h-7 text-[#E7E7EB] text-2xl font-bold my-5 md:w-full md:max-w-2xl md:text-left">
        Today's Highlights
      </h2>
      <div className="w-full flex flex-col items-center md:grid md:grid-cols-2 gap-5 md:gap-6 md:max-w-2xl">
        <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Wind Status
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-[#E7E7EB] text-6xl font-bold">
              {weatherDetailsData.wind.speed.toFixed(2)}
            </h3>
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">ms</h4>
          </div>
          <div className="flex items-center text-[#E7E7EB] text-sm">
            <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]">
              <img className="w-5" src={NavigationIcon} alt="" />
            </span>
            {getWindDirection(weatherDetailsData.wind.deg)}
          </div>
        </div>
        <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
          <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-between py-3">
            <h2 className="text-medium text-base text-center text-[#E7E7EB] mb-4">
              Humidity
            </h2>

            <div className="flex items-end gap-2">
              <h3 className="text-[#E7E7EB] text-6xl font-bold leading-none">
                {weatherDetailsData.main.humidity}
              </h3>
              <h4 className="text-[#E7E7EB] text-4xl mb-1 font-light leading-none">
                %
              </h4>
            </div>

            <div className="w-40 flex justify-between text-[#A09FB1] text-xs mt-3 select-none">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>

            <div className="w-40 h-3 bg-[#e0e0e0] rounded-md overflow-hidden mt-1">
              <div
                className="h-3 bg-[#ffec65]"
                style={{ width: `${weatherDetailsData.main.humidity}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] py-4">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Visibility
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-[#E7E7EB] text-6xl font-bold">
              {(weatherDetailsData.visibility / 1000).toFixed(2)}
            </h3>
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">km</h4>
          </div>
        </div>
        <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] p-4">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Air Pressure
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-[#E7E7EB] text-6xl font-bold">
              {weatherDetailsData.main.pressure}
            </h3>
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">mb</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

function getWindDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}
