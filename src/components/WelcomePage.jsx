/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Wimg1 from "../assets/Wimg1.png";
import Wimg2 from "../assets/wimg2.png";
import Wimg3 from "../assets/wimg3.png";
import { Img } from "@chakra-ui/react";

function WelcomePage() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-full max-h-full relative overflow-hidden">
      <figure className="grid grid-cols-1 justify-items-center items-center">
        <article
          className="absolute lg:top-64 text-center z-10"
          style={{ transform: `translateY(${offsetY * 0.5}px)` }}
        >
          <p className="ssm:text-lg lg:text-2xl font-thin font-poppins">
            Welcome to
          </p>
          <p className="ssm:text-lg lg:text-[64px] font-semibold font-orbitron">
            Cebu Tech Danao Marketplace
          </p>
        </article>
        <figure className="grid grid-cols-2 lg:space-x-28 lg:space-y-1 shrink mt-5 ssm:mx-5 lg:mx-52">
          <div
            className="transition-transform duration-500"
            style={{ transform: `translateY(${offsetY * 0.3}px)` }}
          >
            <Img
              src={Wimg2}
              alt=""
              className="cover bg-fixed ssm:w-32 ssm:h-28 lg:h-56 lg:w-64"
            />
          </div>

          <div
            className="transition-transform duration-500"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          >
            <Img
              src={Wimg1}
              alt=""
              className="cover bg-fixed ssm:w-32 ssm:h-28 lg:h-64 ssm:mt-10 lg:mt-10 lg:w-64 justify-self-end"
            />
          </div>

          <div
            className="transition-transform duration-500"
            style={{ transform: `translateY(${offsetY * 0.1}px)` }}
          >
            <Img
              src={Wimg3}
              alt=""
              className="cover bg-fixed ssm:w-56 ssm:ml-16 ssm:h-36 lg:h-72 ssm:mt-5 lg:mt-10 lg:w-80 mb-10 justify-self-center"
            />
          </div>
        </figure>
      </figure>
    </div>
  );
}

export default WelcomePage;
