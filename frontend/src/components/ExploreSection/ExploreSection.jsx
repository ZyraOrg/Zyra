import { Card } from "./constants";

export default function ExploreSection() {
  return (
    <main className="w-full overflow-hidden my-10 flex flex-col justify-between items-center text-center">
      <div className="space-y-5 pb-5">
        <h1 className="text-5xl font-semioold leading-15">
          Explore <span className="">Active Campaigns</span>
        </h1>
        <p className="text-md font-semibold">
          Support verified causes and track your impact in real-time on
          <br className="hidden md:block" />
          the blockchain
        </p>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3">
        {Card.map((card) => (
          <div
            key={card.id}
            className="max-w-sm mx-auto overflow-hidden relative flex flex-col justify-between items-center bg-black rounded-4xl border-2 border-blue-500 shadow-md"
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
              <div className="flex justify-between">
                <div className="flex">
                  <img src="/" alt="icon1" />
                  <span>{card.name}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <img src="/" alt="icon2" />
                    <span> {card.time} </span>
                  </div>
                  <div>{card.timeText}</div>
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
