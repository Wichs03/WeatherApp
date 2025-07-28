import React from "react";
import NavigationIcon from "../assets/icons/navigation.svg";

export default function WeatherDetails() {
  return (
    <div className="md:w-[60vw] lg:w-[70vw] h-[50vh] bg-[#100E1D] flex flex-col justify-center items-center">
      <h2 className=" h-7 text-[#E7E7EB] text-2xl font-bold my-5 md:w-full md:max-w-2xl md:text-left">
        Today's Highlights
      </h2>
      <div className="w-full flex flex-col items-center md:grid md:grid-cols-2  gap-5 md:gap-6 md:max-w-2xl">
        <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Wind Status
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-[#E7E7EB] text-6xl font-bold">3.60</h3>{" "}
            {/* viento  */}
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">ms</h4>
          </div>
          <div className="flex items-center text-[#E7E7EB] text-sm">
            <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]">
              <img className="w-5" src={NavigationIcon} alt="" />
            </span>
            NW
          </div>
        </div>
        <div className="w-full  max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Humidity
          </h2>
          <div>
            <h3 className=" text-[#E7E7EB] text-6xl font-bold">15</h3>
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1 text-right">
              %
            </h4>{" "}
            {/* humedad */}
          </div>
        </div>
        <div className=" w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] py-4">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Visibility
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-[#E7E7EB] text-6xl font-bold">10.00</h3>{" "}
            {/* visibilidad */}
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">km</h4>
          </div>
        </div>
        <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] p-4">
          <h2 className="text-medium text-base text-center text-[#E7E7EB]">
            Air Pressure
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-[#E7E7EB] text-6xl font-bold">1017</h3>{" "}
            {/* presion */}
            <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">mb</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
