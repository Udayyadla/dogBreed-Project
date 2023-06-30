import React, { useEffect, useContext, useState } from "react";
import "./dogs.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import { BreedContext } from "./BreedContext";
const ListDogs = () => {
  const [dogBreeds, setDogBreeds] = useState({});
  const [dogImages, setDogImages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { updateBreed } = useContext(BreedContext);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) {
          throw new Error("Failed to fetch dog breeds");
        }
        const data = await response.json();
        setDogBreeds(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogBreeds();
  }, []);

  useEffect(() => {
    const fetchDogImages = async () => {
      const breedImages = {};
      const breedPromises = Object.keys(dogBreeds).map(async (breed) => {
        try {
          const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images/random`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch image for ${breed}`);
          }
          const data = await response.json();
          breedImages[breed] = data.message;
        } catch (error) {
          console.error(error);
        }
      });

      await Promise.all(breedPromises);
      setDogImages(breedImages);
    };

    fetchDogImages();
  }, [dogBreeds]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const searchQuery = searchTerm.trim().toLowerCase();
    let matchedBreeds = [];

    if (searchQuery) {
      // Check for exact matches
      if (dogBreeds[searchQuery]) {
        matchedBreeds.push(searchQuery);
      }

      // Check for related breeds
      const allBreeds = Object.keys(dogBreeds);
      const relatedBreeds = allBreeds.filter((breed) =>
        breed.includes(searchQuery)
      );
      matchedBreeds = matchedBreeds.concat(relatedBreeds);
    }

    const breedImages = {};
    const breedPromises = matchedBreeds.map(async (breed) => {
      try {
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch image for ${breed}`);
        }
        const data = await response.json();
        breedImages[breed] = data.message;
      } catch (error) {
        console.error(error);
      }
    });

    await Promise.all(breedPromises);
    setDogImages(breedImages);
  };

  return (
    <>
      <Header />
      <h1>Dog Breeds</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search For a Dog /Breed"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="dogs-container">
        {Object.keys(dogBreeds).map((breed) => {
          if (dogImages[breed]) {
            return (
              <div key={breed} className="container">
                <img src={dogImages[breed]} alt={breed} />
                <h2>{breed}</h2>
                <Link to={`/dog-details`} onClick={() => updateBreed(breed)}>
                  <button>Know More</button>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ListDogs;
