import { FaHourglassHalf } from "react-icons/fa";
import { Card } from "./constants";
import { ArrowUpRight } from "lucide-react";

export default function ExploreSection() {
  return (
    <main className="w-full overflow-hidden my-10 px-5 flex flex-col justify-center items-center text-center">
      <div className="space-y-5 pb-5">
        <h1 className="text-2xl md:text-5xl font-semibold md:leading-15">
          Explore <span className="text-secondary">Active Campaigns</span>
        </h1>
        <p className="text-md font-semibold">
          Support verified causes and track your impact in real-time on
          <br className="hidden md:block" />
          the blockchain
        </p>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        {Card.map((card) => (
          <div
            key={card.id}
            className="max-w-sm mx-auto overflow-hidden relative flex flex-col justify-between items-center bg-black rounded-4xl border-2 border-secondary shadow-md"
          >
            <div className="relative">
              <img
                src={card.image}
                alt="cardimage"
                className="w-full object-cover"
              />
              <span className="absolute top-3 right-5 bg-gray-200 text-primary/70 text-sm px-5 py-1 rounded-full font-semibold">
                {card.imageText}
              </span>
            </div>

            <div className="px-4 space-y-3">
              <div className="pt-4 text-left text-[22px] font-semibold">
                {card.title}{" "}
              </div>
              <div className="flex justify-between items-start">
                <div className="flex space-x-1 items-center text-center">
                  <span> {card.icon1} </span>
                  <span className="text-md font-semibold text-gray-400">
                    {card.name}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-primary"> {card.Icon2} </span>
                    <span className="text-md"> {card.time} </span>
                  </div>
                  <div className="text-gray-400 text-[14px]">
                    {card.timeText}
                  </div>
                </div>
              </div>
              <button className="mb-5 w-full bg-white text-primary font-semibold rounded-full px-6 py-3 transition-transform duration-300 ease-in-out hover:scale-103">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="py-20 max-w-sm">
        <button className="flex items-center px-12 py-1 text-sm font-semibold text-black bg-gradient-to-r from-secondary to-primary shadow-sm shadow-secondary rounded-2xl transition-transform duration-300 ease-in-out hover:scale-101 hover:transition-colors hover:bg-gradient-to-l hover:from-secondary hover:to-primary hover:duration-800 hover:ease-in-out">
          <p>View All Campaigns</p>
          <ArrowUpRight />
        </button>
      </div>
    </main>
  );
}
