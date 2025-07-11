import React from "react";
import { useAuth } from "../context/AuthContext";
import BarterCard from "../components/BarterCard";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const { listings, user, deleteListing } = useAuth();
  const navigate = useNavigate();
  const myListings = listings.filter((l) => l.owner === user?.name);

  const handleEdit = (id) => {
    // In real app, prefill edit form
    alert("Edit feature is not implemented (mock only).");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteListing(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <button
          onClick={() => navigate("/add-listing")}
          className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
        >
          Add New
        </button>
      </div>
      {myListings.length === 0 ? (
        <div className="text-gray-500">You have no listings yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myListings.map((card) => (
            <BarterCard
              key={card.id}
              {...card}
              editable
              onEdit={() => handleEdit(card.id)}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;