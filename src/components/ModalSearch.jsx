import React from "react";
import closeIcon from "../assets/icons/close.svg";
import searchIcon from "../assets/icons/search.svg";
import cities from "../cities.json";
import { useState } from "react";

export default function ModalSearch({
  isOpen,
  onClose,
  onSelectCity,
  children,
}) {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (text.length > 1) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().startsWith(text.toLowerCase())
      );

      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  };

  const handleClickCity = (city) => {
    onSelectCity(city);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed md:w-[40vw] lg:w-[30vw] h-[100vh] bg-[#1f203a] py-6 z-20">
      <button
        onClick={onClose}
        className="size-7 ml-[85%] hover:cursor-pointer"
      >
        <img src={closeIcon} alt="" />
      </button>

      <div className="flex flex-row justify-around relative">
        {/* Contenedor del input + resultados */}
        <div className="flex flex-col w-[55%] max-w-[268px] relative">
          <div className="flex items-center h-9 bg-transparent border border-[#E7E7EB] font-medium text-base text-[#616475]">
            <img className="size-7" src={searchIcon} alt="search Icon" />
            <input
              className="text-[#E7E7EB] bg-transparent outline-none w-[233px] h-8 pr-1"
              placeholder="search location"
              type="text"
              value={searchText}
              onChange={handleSearch}
            />
          </div>

          <ul className="absolute top-full left-0 w-full bg-[#1f203a] mt-1 ml-16 z-30">
            {results.map((city) => (
              <li
                key={city.id}
                className="flex justify-between w-[70%] max-w-367px h-14   pl-2 text-base font-medium cursor-pointer text-[#E7E7EB] hover:border border-[#616475] mt-6  text-lg"
                onClick={() => handleClickCity(city)}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-20 h-9 bg-[#3d46e9] px-1 font-semibold text-base text-[#E7E7EB] hover:text-[#def341] hover:cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
}
