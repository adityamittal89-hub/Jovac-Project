import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const dummyUser = {
  id: 1,
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "9876543210", // default phone added here for login mock
};

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("bartrly_user");
    return data ? JSON.parse(data) : null;
  });
  const [listings, setListings] = useState(() => {
    const data = localStorage.getItem("bartrly_listings");
    return data ? JSON.parse(data) : initialListings;
  });

  useEffect(() => {
    localStorage.setItem("bartrly_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("bartrly_listings", JSON.stringify(listings));
  }, [listings]);

  // Auth logic (mocked)
  const login = ({ email, password }) => {
    if (email && password) {
      setUser({ ...dummyUser, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = ({ name, email, password, phone }) => {
    if (name && email && password && phone) {
      setUser({
        id: Date.now(),
        name,
        email,
        phone,
      });
      return true;
    }
    return false;
  };

  // Listing logic (mocked)
  const addListing = (listing) => {
    setListings((prev) => [
      ...prev,
      {
        ...listing,
        id: Date.now(),
        owner: user.name,
        userId: user.id,
        contact: {
          email: user.email,
          phone: user.phone,
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
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        listings,
        addListing,
        editListing,
        deleteListing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
