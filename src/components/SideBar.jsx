import React from "react";
import location from "../assets/icons/location.svg";
import cloudBackground from "../assets/cloudbg.png";
import cloud from "../assets/weather/03d.png";
import locationPin from "../assets/icons/location_on.svg";
import { useState } from "react";
import ModalSearch from "./ModalSearch";

export default function SideBar({ selectedCity, setSelectedCity, isCelsius }) {
  const [openModal, setOpenModal] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async (lat, lon) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const formatDate = () => {
    const now = new Date();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[now.getDay()];
    const dayNum = now.getDate();
    const monthName = months[now.getMonth()];

    return `Today · ${dayName}. ${dayNum} ${monthName}`;
  };

  return (
    <>
      <ModalSearch
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSelectCity={(city) => {
          setOpenModal(false);
          setSelectedCity(city);
          getWeather(city.lat, city.lon);
        }}
      />
      <div className="md:w-[40vw] lg:w-[30vw] h-[100vh] bg-[#1f203a] py-6 ">
        <div className="header flex flex-row items-center justify-between px-11">
          <button
            onClick={() => setOpenModal(true)}
            className="text-white bg-[#6E707A] py-1.5 px-7 hover:cursor-pointer z-10"
          >
            Search for Places
          </button>
          <button className="rounded-full bg-white/20 p-2">
            <img className="size-6" src={location} alt="" />
          </button>
        </div>
        <div className="flex relative w-full items-center justify-center mt-30">
          <img
            className="absolute opacity-15 h-[45vh] w-[100%]"
            src={cloudBackground}
            alt=""
          />
          <img
            className="w-40"
            src={
              weatherData
                ? new URL(
                    `../assets/weather/${weatherData.weather[0].icon}.png`,
                    import.meta.url
                  ).href
                : cloud
            }
            alt="weather icon"
          />
        </div>
        <div className="flex flex-col mt-[25vh] items-center justify-center">
          <h2 className="font-medium text-9xl text-[#E7E7EB]">
            {weatherData
              ? Math.round(
                  isCelsius
                    ? weatherData.main.temp
                    : weatherData.main.temp * 1.8 + 32
                )
              : isCelsius
              ? 19
              : Math.round(19 * 1.8 + 32)}
            <span>{isCelsius ? "°C" : "°F"}</span>
          </h2>
          <h3 className="pt-6 pb-6 text-3xl text-[#A09FB1] font-semibold my-6">
            {weatherData ? weatherData.weather[0].description : "Few Clouds"}
          </h3>
          <p className=" text-sm text-[#88869D] font-medium mb-6">
            {formatDate()}
          </p>
          <div className="flex flex-row">
            <img className="size-5" src={locationPin} alt="" />
            <p className="text-sm text-[#88869D] h-10  font-semibold">
              {weatherData ? weatherData.name : "Ottawa"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
