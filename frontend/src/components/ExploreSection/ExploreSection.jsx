import { FaHourglassHalf } from "react-icons/fa";
import { Card } from "./constants";

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
                className="z-0 inset-0 w-full object-cover"
              />
              <span className="relative text-left">{card.imageText}</span>
            </div>
            <div className="px-6 space-y-3">
              <div className="text-left text-lg font-semibold">
                {card.title}{" "}
              </div>
              <div className="flex justify-between items-start">
                <div className="flex space-x-1 items-center">
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
                  <div className="text-gray-400">{card.timeText}</div>
                </div>
              </div>
              <button className="mb-5 w-full bg-white text-blue-600 font-semibold rounded-full px-6 py-3">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
