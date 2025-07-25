import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useListings } from "../context/ListingsContext"; // renamed hook for clarity
import BarterCard from "../components/BarterCard";
import { FaSearch, FaPlusCircle, FaHandshake } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const { listings } = useListings();
  const { isSignedIn } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Swap More, Spend Less.<br />
            <span className="text-indigo-600">Barter Anything</span> with Bartrly!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Trade goods & skills, skip the cash. Discover, offer, and connect with your local community.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto py-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isSignedIn && (
            <Link
              to="/add-listing"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 text-lg transition rounded-2xl"
            >
              Post a Listing
            </Link>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1 flex flex-col items-center">
            <FaSearch className="text-3xl text-indigo-500 mb-2" />
            <div className="font-semibold mb-1">1. Browse Offers</div>
            <div className="text-gray-500 text-sm text-center">
              Explore listings from your local community.
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <FaPlusCircle className="text-3xl text-indigo-500 mb-2" />
            <div className="font-semibold mb-1">2. Post Your Listing</div>
            <div className="text-gray-500 text-sm text-center">
              Share what you have and what you're looking for.
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <FaHandshake className="text-3xl text-indigo-500 mb-2" />
            <div className="font-semibold mb-1">3. Make a Trade</div>
            <div className="text-gray-500 text-sm text-center">
              Chat, agree, and swap. Everybody wins!
            </div>
          </div>
        </div>
      </section>

      {/* Sample BarterCards */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Featured Listings
          </h2>
          {isSignedIn && (
            <Link
              to="/add-listing"
              className="text-indigo-600 font-medium hover:underline"
            >
              Post a Listing
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredListings.map((card) => (
            <BarterCard key={card.id} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
