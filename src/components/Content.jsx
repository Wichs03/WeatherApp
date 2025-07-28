import React, { useState, useEffect } from "react";

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

  // Función para obtener los mínimos y máximos reales por día
  const getDailyTemps = (dateStr) => {
    if (!forecastData) return null;

    // Filtramos todos los elementos que coincidan con la fecha (YYYY-MM-DD)
    const dayItems = forecastData.list.filter((item) =>
      item.dt_txt.startsWith(dateStr)
    );

    if (!dayItems.length) return null;

    const maxTemp = Math.max(...dayItems.map((i) => i.main.temp_max));
    const minTemp = Math.min(...dayItems.map((i) => i.main.temp_min));

    return { maxTemp, minTemp };
  };

  // Obtenemos fechas para tomorrow y los 4 días siguientes (formato YYYY-MM-DD)
  const getDateStr = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  // Formateamos fecha para mostrar: Tue, 29 Jul
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

  // Armamos los datos para los 5 días (mañana + 4 siguientes)
  const forecastDays = [];

  for (let i = 1; i <= 5; i++) {
    const dateStr = getDateStr(i);
    const temps = getDailyTemps(dateStr);

    if (temps) {
      forecastDays.push({
        label: i === 1 ? "Tomorrow" : formatDisplayDate(i),
        maxTemp: temps.maxTemp,
        minTemp: temps.minTemp,
      });
    }
  }

  return (
    <div className="md:w-[60vw] lg:w-[70vw] h-[50vh] bg-[#100E1D]">
      <section className="w-full md:px-5">
        <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit">
          {forecastDays.length > 0 ? (
            forecastDays.map(({ label, maxTemp, minTemp }, index) => (
              <li
                key={index}
                className="w-[7.5rem] h-40 bg-[#1E213A] flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium"
              >
                <h3 className="mb-2">{label}</h3>
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
