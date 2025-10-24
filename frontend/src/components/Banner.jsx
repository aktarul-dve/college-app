import React from "react";
import Marquee from "react-fast-marquee";
import Ganarl_notice from "./Ganarl_notice";
import logo from "../assets/collegelogo.png";

function Banner() {
  return (
    <div className="w-full h-40 bg-ban_bg relative   ">
      <div className="w-full h-full flex flex-col items-center px-4">
        {/* লোগো এবং শিরোনাম */}
        <div className="flex items-center w-full">
          <img src={logo} alt="logo" className=" w-20 " />
          <h1 className="font-bold text-white text-center flex-grow text-[30px] md:text-lg lg:text-5xl">
            নেকমরদ সরকারি কলেজ
          </h1>
        </div>

        {/* College Code এবং EIIN */}
        <div className="flex  mt-2 text-center m-5  gap-x-4">
          <h1 className="font-solaiman text-white" >College Code: 3523</h1>
          <h1 className="font-solaiman text-white">College EIIN: 129072</h1>
        </div>
      </div>

      {/* নোটিশ */}
      <div className="text-white absolute bottom-0 w-full flex items-center space-x-2 text-sm md:text-lg lg:text-2xl overflow-hidden">
        <h1 className="w-200 ml-2">নোটিশ:</h1>
        <Marquee>
          <Ganarl_notice />
        </Marquee>
      </div>
    </div>
  );
}

export default Banner;
