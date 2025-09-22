import { Card } from "./constants";

export default function ExploreSection() {
  return (
    <main className="w-full my-10 flex flex-col justify-between items-center text-center">
      <div className="space-y-5">
        <h1 className="text-5xl font-bold">
          Explore <span className="">Active Campaigns</span>
        </h1>
        <p className="text-md">
          Support verified causes and track your impact in real-time on <br />
          the blockchain
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {Card.map((card) => (
          <div key={card.id}>
            <div>
              <img src={card.image} alt="cardimage" className="" />
              <span>{card.imageText}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
