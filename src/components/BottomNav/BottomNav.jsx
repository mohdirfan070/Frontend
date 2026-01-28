import React from "react";
import { useBottomContext } from "../../context/BottomNavContext";
import { Link } from "react-router-dom";

export default function BottomNav() {

  let { btmContext , setBtmContext } = useBottomContext();

  return (
    <div className="h-[10dvh] w-full bg-slate-300 border-[0.5vh] z-[30] overflow-hidden">
      <ul className=" grid grid-flow-col col-span-5 items-center align-middle justify-between p-[2.4vh]">
         <li   onClick={()=>setBtmContext('addPage') } className="border-[0.2vh] border-transparent hover:border-[0.2vh] border-solid hover:rounded-full hover:border-pvt-color3 p-[0.2vh]">
           <Link to={'/'}>
          <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#284b63"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>          </Link>
        </li>
        <Link to={'/scan'}>
        <li   onClick={()=>setBtmContext('addPage') } className="border-[0.2vh] border-transparent hover:border-[0.2vh] border-solid hover:rounded-full hover:border-pvt-color3 p-[0.2vh]">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#284b63"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </li></Link>
      {/* {(btmContext=='scanPage') &&  <li   onClick={()=>setBtmContext('scanPage') } className="relative hover:scale-x-105 transition-transform duration-100">
          <Link to={'/scan'}>
          <div className="absolute rounded-full p-[5vh] z-[999] bg-pvt-color5  translate-y-[-90%] translate-x-[-50%]  hover:scale-95 hover:bg-pvt-color2 hover:border-4 border-pvt-color1 transition-transform duration-75">
            <img
              src="/icons_svg/scan_svg.svg"
              alt="HOME_ICON"
              className="h-[4vh] absolute translate-x-[-49%] translate-y-[-45%]"
            />
          </div>
          </Link>
        </li>} */}


        <li   onClick={()=>setBtmContext('settingPage') } className="border-[0.2vh] border-transparent hover:border-[0.2vh] border-solid hover:rounded-full hover:border-pvt-color3 p-[0.2vh]">
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#284b63"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
        </li>
        <li   onClick={()=>setBtmContext('profilePage') } className="border-[0.2vh] border-transparent hover:border-[0.2vh] border-solid hover:rounded-full hover:border-pvt-color3 p-[0.2vh]">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#284b63"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
        </li>
      </ul>
    </div>
  );
}
