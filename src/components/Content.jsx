import React, { useState, useEffect, useMemo } from "react";

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

  const tomorrowForecast = useMemo(() => {
    if (!forecastData) return null;

    const now = new Date();
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(now.getDate() + 1);

    const yyyy = tomorrowDate.getFullYear();
    const mm = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrowDate.getDate()).padStart(2, "0");
    const tomorrowStr = `${yyyy}-${mm}-${dd}`;

    const tomorrowEntries = forecastData.list.filter((item) =>
      item.dt_txt.startsWith(tomorrowStr)
    );

    if (tomorrowEntries.length === 0) return null;

    const temps = tomorrowEntries.map((entry) => entry.main);

    const maxTemp = Math.max(...temps.map((t) => t.temp_max));
    const minTemp = Math.min(...temps.map((t) => t.temp_min));

    return { maxTemp, minTemp };
  }, [forecastData]);

  return (
    <div className="md:w-[60vw] lg:w-[70vw] bg-[#100E1D]">
      <section className="w-full md:px-5">
        <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit">
          <li className="w-[7.5rem] h-40 bg-[#1E213A] flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium">
            <h3 className="mb-2">Tomorrow</h3>
            {tomorrowForecast ? (
              <>
                <div className="flex flex-row gap-2 mt-2">
                  <p>{Math.round(tomorrowForecast.maxTemp)}°C</p>
                  <p className="text-[#A09FB1]">
                    {Math.round(tomorrowForecast.minTemp)}°C
                  </p>
                </div>
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </li>
        </ul>
      </section>
    </div>
  );
}
