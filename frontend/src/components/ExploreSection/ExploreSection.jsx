import { FaHourglassHalf } from "react-icons/fa";
import { Card } from "./constants";

import { ArrowUpRight } from "lucide-react";

export default function ExploreSection() {
  return (
    <main className="flex flex-col items-center justify-center w-full px-7 md:mt-10 overflow-hidden text-center">
      <div className="pb-5 md:space-y-5 space-y-3">
        <h1 className="text-2xl font-semibold md:text-5xl md:leading-15">
          Explore <span className="text-secondary">Active Campaigns</span>
        </h1>
        <p className="font-semibold text-[11px] md:text-[16px]">
          Support verified causes and track your impact in real-time on
          <br className="hidden md:block" /> the blockchain
        </p>
      </div>
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 pt-10">
        {Card.map((card) => (
          <div className="p-[1px] rounded-4xl bg-gradient-to-r from-primary to-secondary shadow-md">
            <div
              key={card.id}
              className="relative h-full flex flex-col justify-between max-w-sm mx-auto overflow-hidden bg-black rounded-4xl"
            >
              <div className="relative">
                <img
                  src={card.image}
                  alt="cardimage"
                  className="object-cover w-full"
                />
                <span className="absolute px-5 py-1 text-sm font-semibold bg-gray-200 rounded-full top-3 right-5 text-[#00051b]/70">
                  {card.imageText}
                </span>
              </div>

              <div className="px-5 space-y-3">
                <div className="text-left pt-4 text-lg md:text-[21px] font-semibold line-clamp-2">
                  {card.title}{" "}
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1 text-center">
                    <span> {card.icon1} </span>
                    <span className="font-semibold text-gray-400 text-[12px] md:text-[14px]">
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
                <button className="w-full px-6 py-3 mb-5 font-semibold transition-transform duration-300 ease-in-out bg-white rounded-full text-[17px] text-[#0A36F7] hover:scale-103">
                  {card.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-sm py-20">
        <button className="border-button-gradient">
          <div className="flex items-center px-10 md:px-15 py-1 text-sm font-semibold text-black transition-transform duration-300 ease-in-out shadow-sm bg-gradient-to-r from-primary to-secondary shadow-secondary rounded-2xl hover:scale-101 hover:bg-gradient-to-l hover:from-primary hover:to-secondary hover:duration-800 hover:ease-in-out">
            <p>View All Campaigns</p>
            <ArrowUpRight size={20} />
          </div>
        </button>
      </div>
    </main>
  );
}
