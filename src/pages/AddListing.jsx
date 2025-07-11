import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

const categories = [
  "Music",
  "Electronics",
  "Books",
  "Sports",
  "Tools",
  "Toys",
  "Other",
];

const AddListing = () => {
  const { addListing } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0],
    image: "",
    lookingFor: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || !form.category || !form.lookingFor) {
      setError("Please fill all fields.");
      return;
    }
    addListing(form);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Add New Listing</h2>
      <form className="bg-white shadow rounded p-8" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <FormInput
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.category}
            onChange={handleChange}
            required
          >
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="image">
            Image (Upload or paste a URL)
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            className="block w-full mb-2"
            onChange={handleImage}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Or paste image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mt-2 h-32 object-cover rounded"
            />
          )}
        </div>
        <FormInput
          label='Looking For'
          name='lookingFor'
          value={form.lookingFor}
          onChange={handleChange}
          required
          placeholder="What do you want in exchange?"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 mt-2"
        >
          Post Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;