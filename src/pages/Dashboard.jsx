import React from "react";
import { useListings } from "../context/ListingsContext";
import { useUser } from "@clerk/clerk-react";
import { FaList, FaHandshake, FaInbox } from "react-icons/fa";

const Dashboard = () => {
  const { user: clerkUser } = useUser();
  const { listings } = useListings(); 

  const userName = clerkUser?.fullName || clerkUser?.firstName || clerkUser?.emailAddress;

  const recentOffers = [
    {
      id: 1,
      from: "Mike",
      listing: "Mountain Bike",
      message: "Interested in trading my skateboard for your bike!",
      date: "2025-07-07",
    },
    {
      id: 2,
      from: "Elena",
      listing: "Old Guitar",
      message: "Would you swap for a violin?",
      date: "2025-07-06",
    },
  ];

  const userListings = listings.filter((l) => l.owner === userName);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, <span className="text-indigo-600">{userName}</span>!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded shadow p-5 flex flex-col items-center">
          <FaList className="text-3xl text-indigo-500 mb-2" />
          <div className="text-lg font-semibold">{userListings.length}</div>
          <div className="text-gray-500 text-sm">Your Listings</div>
        </div>
        <div className="bg-white rounded shadow p-5 flex flex-col items-center">
          <FaHandshake className="text-3xl text-indigo-500 mb-2" />
          <div className="text-lg font-semibold">{userListings.length * 2}</div>
          <div className="text-gray-500 text-sm">Total Trades</div>
        </div>
        <div className="bg-white rounded shadow p-5 flex flex-col items-center">
          <FaInbox className="text-3xl text-indigo-500 mb-2" />
          <div className="text-lg font-semibold">{recentOffers.length}</div>
          <div className="text-gray-500 text-sm">Recent Offers</div>
        </div>
      </div>
      {/* Recent offers/messages */}
      <div>
        <h3 className="text-xl font-bold mb-3">Recent Offers</h3>
        <ul className="divide-y">
          {recentOffers.map((offer) => (
            <li key={offer.id} className="py-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-semibold">{offer.from}</span> offered on{" "}
                  <span className="text-indigo-600">{offer.listing}</span>
                </div>
                <div className="text-gray-600 text-sm mt-1 md:mt-0">
                  "{offer.message}"
                </div>
                <div className="text-xs text-gray-400 mt-1 md:mt-0">
                  {offer.date}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
