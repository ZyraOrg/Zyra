import { Card } from "./constants";
import AOS from "aos";
import "aos/dist/aos.css";

import { ArrowUpRight } from "lucide-react";

export default function ExploreSection() {
  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden text-center px-7 md:mt-10">
      <div className="pb-5 space-y-3 md:space-y-5">
        <h1 className="text-3xl font-semibold md:text-5xl md:leading-15" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-delay="600">
          Explore <span className="text-secondary">Active Campaigns</span>
        </h1>
        <p className="font-semibold text-[11px] md:text-[16px]" data-aos="zoom-in" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-delay="800">
          Support verified causes and track your impact in real-time on
          <br className="hidden md:block" /> the blockchain
        </p>
      </div>
      <div className="relative grid grid-cols-1 gap-12 pt-10 md:grid-cols-3">
        {Card.map((card) => (
          <div className="p-[1px] rounded-4xl bg-gradient-to-r from-primary to-secondary shadow-md" data-aos="zoom-in-up" data-aos-duration="600" data-aos-easing="ease-in-out" data-aos-delay="600">
            <div
              key={card.id}
              className="relative flex flex-col justify-between h-full max-w-sm mx-auto overflow-hidden bg-black rounded-4xl"
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
      <div className="max-w-sm py-20" data-aos="fade-up">
        <button className="border-button-gradient">
          <div className="flex items-center px-10 py-1 text-sm font-semibold text-black transition-transform duration-300 ease-in-out shadow-sm md:px-15 bg-gradient-to-r from-primary to-secondary shadow-secondary rounded-2xl hover:scale-101 hover:bg-gradient-to-l hover:from-primary hover:to-secondary hover:duration-800 hover:ease-in-out">
            <p>View All Campaigns</p>
            <ArrowUpRight size={20} />
          </div>
        </button>
      </div>
    </main>
  );
}
