import React, { useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react"; // ✅ Clerk auth

const BarterCard = ({
  title,
  description,
  category,
  image,
  lookingFor,
  owner,
  contact, 
  onEdit,
  onDelete,
  editable,
}) => {
  const { isSignedIn } = useUser(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    if (!isSignedIn) {
      alert("Please sign in to view contact information.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col gap-3 relative">
      {editable && (
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={onEdit}
            className="p-1 rounded bg-indigo-50 hover:bg-indigo-100"
            title="Edit"
          >
            <FaRegEdit className="text-indigo-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded bg-red-50 hover:bg-red-100"
            title="Delete"
          >
            <FaTrashAlt className="text-red-500" />
          </button>
        </div>
      )}

      <img
        src={image || "https://placehold.co/400x200?text=No+Image"}
        alt={title}
        className="h-40 w-full object-cover rounded mb-2"
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-gray-100 text-xs px-2 py-1 rounded">
          Category: {category}
        </span>
        <span className="bg-indigo-100 text-xs px-2 py-1 rounded">
          Looking for: <span className="font-medium">{lookingFor}</span>
        </span>
      </div>
      {owner && (
        <div className="text-xs text-gray-400 mt-2">By {owner}</div>
      )}

      {/* Contact Info Button */}
      <button
        onClick={handleContactClick}
        className="mt-3 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
      >
        Contact Info
      </button>

      {/* Contact Info Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
            <p>
              <strong>Email:</strong> {contact?.email || "N/A"}
            </p>
            {contact?.phone && (
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarterCard;
