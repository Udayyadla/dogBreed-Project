import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import { BreedContext } from "./BreedContext";
import "./header.css";

const BreedDetails = () => {
  const { breed } = useContext(BreedContext);
  const [subBreeds, setSubBreeds] = useState([]);
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
        if (!response.ok) {
          throw new Error("Failed to fetch dog details");
        }
        const data = await response.json();
        setSubBreeds(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogDetails();
  }, [breed]);
  useEffect(() => {
    const fetchDogImages = async () => {
      const breedImages = {};
      const imagePromises = subBreeds.map(async (subBreed) => {
        try {
          const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch image for ${subBreed}`);
          }
          const data = await response.json();
          breedImages[subBreed] = data.message;
        } catch (error) {
          console.error(error);
        }
      });

      await Promise.all(imagePromises);
      setDogImages(breedImages);
    };

    fetchDogImages();
  }, [breed, subBreeds]);

  return (
    <div>
      <Header />
    

      <div>
      <h2>{breed}</h2>

        <div  className="sub-breed-container-1">
       <p> There are wild dogs and pet dogs. Pet dogs are helpers and friends to people. There were no pet dogs 
15,000 years ago. Men and women learned how to work with dogs. Dogs helped humans travel from Asia to 
North America 10,000 years ago by pulling sleds in the snow. People say dogs are “man’s best friend.” 
They help with farming. They help with hunting. They help with fishing. They can pull things for people. 
They can help find things. 
 There are many colors of dogs. There are white dogs, gray dogs, black dogs, and brown dogs. A 
dog’s fur can be short or long. Dogs have curly hair or straight fur. There are very small dogs. They are 
only 6-8 inches tall. There are very big dogs. They are about 3 feet tall. 
Some dogs can see well. Some dogs do not see very well. All dogs can hear well. They can hear 
sounds that people cannot hear. They can hear high sounds and low sounds. They can hear sound very far
away. All dogs can smell very well. They can smell 40 times better than humans! 
Dogs live 5 to 13 years, but some dogs live much longer. One dog lived to be 24 years old! 
 </p>       </div>
   
        <h3>Sub-breeds:</h3>
        <ul className="sub-breed-container">
        {subBreeds.length === 0 && (
        <div>
           {breed} dont have any sub breeds
        </div>
      )}
          {subBreeds.length>0&&subBreeds.map((subBreed) => (
            <li key={subBreed}>
              {dogImages[subBreed] && (
                <img src={dogImages[subBreed]} alt={subBreed} />
              )}
              <p> {subBreed}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreedDetails;
