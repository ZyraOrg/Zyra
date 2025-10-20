import { Card } from "./constants";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import Dialog from "../Dialog";

export default function ExploreSection() {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      offset: 20,
    });
  }, []);

  return (
    <main
      id="explore"
      className="flex flex-col items-center justify-center w-full px-8 overflow-hidden text-center md:px-7 md:mt-10"
    >
      <div className="pb-5 space-y-3 md:space-y-5">
        <h1
          className="text-3xl font-semibold md:text-5xl md:leading-15"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
          data-aos-delay="600"
        >
          Explore <span className="text-secondary">Active Campaigns</span>
        </h1>
        <p
          className="font-semibold text-[11px] md:text-[16px]"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
          data-aos-delay="800"
        >
          Support verified causes and track your impact in real-time on
          <br className="hidden md:block" /> the blockchain
        </p>
      </div>
      <div className="relative grid grid-cols-1 gap-11 pt-10 md:grid-cols-3">
        {Card.map((card) => (
          <div
            key={card.id}
            className="p-[1px] rounded-4xl bg-gradient-to-r from-primary to-secondary shadow-md"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-delay="600"
          >
            <div className="relative flex flex-col justify-between h-full max-w-sm mx-auto overflow-hidden bg-black rounded-4xl">
              <div className="relative">
                <img
                  src={card.image}
                  alt="cardimage"
                  className="object-cover w-full"
                  fetchPriority="high"
                />
                <span className="absolute px-5 py-1 text-sm font-semibold bg-gray-200 rounded-full top-3 right-5 text-[#00051b]/80">
                  {card.imageText}
                </span>
              </div>

              <div className="px-3 space-y-3 md:px-5">
                <div className="text-left pt-4 text-[15px] md:text-[21px] font-semibold line-clamp-2">
                  {card.title}{" "}
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1 text-center">
                    <span> {card.icon1} </span>
                    <span className="font-semibold text-gray-400 text-[12px] md:text-[15px]">
                      {card.name}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-[#0A36F7]/60"> {card.Icon2} </span>
                      <span className="text-[12px] md:text-[14px]">
                        {" "}
                        {card.time}{" "}
                      </span>
                    </div>
                    <div className="text-gray-400 text-[14px]">
                      {card.timeText}
                    </div>
                  </div>
                </div>
                <button
                  className="w-full px-6 py-3 mb-5 font-semibold transition-transform duration-300 ease-in-out bg-white rounded-full text-[17px] text-[#0A36F7]/90 hover:text-[#0A36F7] hover:scale-103 cursor-pointer"
                  onClick={handleClick}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-sm py-20" data-aos="fade-up">
        <button className="border-button-gradient">
          <div className="view-campaign-btn" onClick={handleClick}>
            <p>View All Campaigns</p>
            <ArrowUpRight size={20} />
          </div>
        </button>
      </div>

      {showDialog && <Dialog setShowDialog={setShowDialog} />}
    </main>
  );
}
