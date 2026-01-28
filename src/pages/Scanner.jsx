import { Link } from "react-router-dom";

export default function Scanner() {
  return (
    <div className=" h-[80vh] w-full   flex flex-col justify-center items-center gap-y-[9vh]">
      <Link
        to={"/barcode"}
        className="relative h-[8vh]  w-[80%] sm:w-[20%] bg-blue-500 hover:bg-pvt-color5 hover:scale-105 duration-75 rounded p-[2vh] text-start"
      >
        <span className="text-[3vh] text-pvt-color4 font-semibold">
          Scan Barcode
        </span>
        <img
          className="absolute top-[25%] right-[10%] h-[4.5vh]"
          src="/icons_svg/barcode_icon_svg.svg"
          alt=""
        />
      </Link>
      <Link className="relative h-[8vh] w-[80%] sm:w-[20%] bg-teal-600 hover:bg-pvt-color5 hover:scale-105 duration-75   rounded p-[2vh]  text-start"
      to={'/scanitem'}>
        <span className="text-[3vh] text-pvt-color4 font-semibold">
          Scan Ingredients
        </span>
        <img
          className="absolute top-[25%] right-[10%] h-[4.5vh]"
          src="/icons_svg/table_icon_svg.svg"
          alt=""
        />
      </Link>
    </div>
  );
}
