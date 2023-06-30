import React, { createContext, useState } from "react";

export const BreedContext = createContext();

export const BreedProvider = ({ children }) => {
  const [breed, setBreed] = useState("");

  const updateBreed = (newBreed) => {
    setBreed(newBreed);
  };

  return (
    <BreedContext.Provider value={{ breed, updateBreed }}>
      {children}
    </BreedContext.Provider>
  );
};
