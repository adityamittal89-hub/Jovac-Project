import React, { createContext, useContext, useState, useEffect } from "react";

const ListingsContext = createContext();

const initialListings = [
  {
    id: 1,
    title: "Old Guitar",
    description: "Acoustic, barely used. Looking to swap for a keyboard.",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    lookingFor: "Keyboard",
    owner: "Jane Doe",
    userId: 1,
    contact: {
      email: "jane@example.com",
      phone: "9876543210",
    },
  },
  {
    id: 2,
    title: "Mountain Bike",
    description: "Great condition, want to trade for skateboards.",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    lookingFor: "Skateboards",
    owner: "Jane Doe",
    userId: 1,
    contact: {
      email: "jane@example.com",
      phone: "9876543210",
    },
  },
];

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState(() => {
    const data = localStorage.getItem("bartrly_listings");
    return data ? JSON.parse(data) : initialListings;
  });

  useEffect(() => {
    localStorage.setItem("bartrly_listings", JSON.stringify(listings));
  }, [listings]);

  const addListing = (listing, user) => {
    setListings((prev) => [
      ...prev,
      {
        ...listing,
        id: Date.now(),
        owner: user.fullName || user.firstName || "Unknown",
        userId: user.id,
        contact: {
          email: user.emailAddresses?.[0]?.emailAddress || "",
          phone: user.phoneNumbers?.[0]?.phoneNumber || "",
        },
      },
    ]);
  };

  const editListing = (id, newData) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...newData } : l))
    );
  };

  const deleteListing = (id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <ListingsContext.Provider
      value={{ listings, addListing, editListing, deleteListing }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => useContext(ListingsContext);
