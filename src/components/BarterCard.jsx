import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const BarterCard = ({
  title,
  description,
  category,
  image,
  lookingFor,
  owner,
  onEdit,
  onDelete,
  editable,
}) => {
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
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded mb-2"
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-gray-100 text-xs px-2 py-1 rounded">Category: {category}</span>
        <span className="bg-indigo-100 text-xs px-2 py-1 rounded">
          Looking for: <span className="font-medium">{lookingFor}</span>
        </span>
      </div>
      {owner && (
        <div className="text-xs text-gray-400 mt-2">By {owner}</div>
      )}
    </div>
  );
};

export default BarterCard;