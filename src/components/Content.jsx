import React, { useState, useEffect } from "react";

import icon01d from "../assets/weather/01d.png";
import icon01n from "../assets/weather/01n.png";
import icon02d from "../assets/weather/02d.png";
import icon02n from "../assets/weather/02n.png";
import icon03d from "../assets/weather/03d.png";
import icon03n from "../assets/weather/03n.png";
import icon04d from "../assets/weather/04d.png";
import icon04n from "../assets/weather/04n.png";
import icon09d from "../assets/weather/09d.png";
import icon09n from "../assets/weather/09n.png";
import icon10d from "../assets/weather/10d.png";
import icon10n from "../assets/weather/10n.png";
import icon11d from "../assets/weather/11d.png";
import icon11n from "../assets/weather/11n.png";
import icon13d from "../assets/weather/13d.png";
import icon13n from "../assets/weather/13n.png";
import icon50d from "../assets/weather/50d.png";
import icon50n from "../assets/weather/50n.png";

const iconsMap = {
  "01d": icon01d,
  "01n": icon01n,
  "02d": icon02d,
  "02n": icon02n,
  "03d": icon03d,
  "03n": icon03n,
  "04d": icon04d,
  "04n": icon04n,
  "09d": icon09d,
  "09n": icon09n,
  "10d": icon10d,
  "10n": icon10n,
  "11d": icon11d,
  "11n": icon11n,
  "13d": icon13d,
  "13n": icon13n,
  "50d": icon50d,
  "50n": icon50n,
};

export default function Content({ selectedCity }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchForecast = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    fetchForecast();
  }, [selectedCity]);

  const getDailyTempsAndIcon = (dateStr) => {
    if (!forecastData) return null;

    const dayItems = forecastData.list.filter((item) =>
      item.dt_txt.startsWith(dateStr)
    );

    if (!dayItems.length) return null;

    const maxTemp = Math.max(...dayItems.map((i) => i.main.temp_max));
    const minTemp = Math.min(...dayItems.map((i) => i.main.temp_min));

    const middayItem =
      dayItems.find((item) => item.dt_txt.includes("12:00:00")) || dayItems[0];
    const icon = middayItem.weather[0].icon;

    return { maxTemp, minTemp, icon };
  };

  const getDateStr = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const formatDisplayDate = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);

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

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNum = date.getDate();

    return `${dayName}, ${dayNum} ${monthName}`;
  };

  const forecastDays = [];

  for (let i = 1; i <= 5; i++) {
    const dateStr = getDateStr(i);
    const result = getDailyTempsAndIcon(dateStr);

    if (result) {
      forecastDays.push({
        label: i === 1 ? "Tomorrow" : formatDisplayDate(i),
        maxTemp: result.maxTemp,
        minTemp: result.minTemp,
        icon: result.icon,
      });
    }
  }

  return (
    <div className="md:w-[60vw] lg:w-[70vw] h-[50vh] bg-[#100E1D]">
      <section className="w-full md:px-5">
        <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit">
          {forecastDays.length > 0 ? (
            forecastDays.map(({ label, maxTemp, minTemp, icon }, index) => (
              <li
                key={index}
                className="w-[7.5rem] h-40 bg-[#1E213A] flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium"
              >
                <h3 className="mb-2">{label}</h3>
                <span className="flex items-center justify-center w-14 h-16">
                  <img
                    src={iconsMap[icon] || iconsMap["01d"]}
                    alt="weather icon"
                    className="w-20 h-20 object-contain"
                  />
                </span>
                <div className="flex flex-row gap-2 mt-2">
                  <p>{Math.round(maxTemp)}°C</p>
                  <p className="text-[#A09FB1]">{Math.round(minTemp)}°C</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-[#E7E7EB] mx-auto">Cargando...</p>
          )}
        </ul>
      </section>
    </div>
  );
}
