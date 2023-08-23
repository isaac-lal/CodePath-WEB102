import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default.jpeg";
// import "./PetList.css";

const PetList = ({ pets }) => {
  return (
    <div className="pets-container">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <h3>{pet.name}</h3>
          <Link to={`/pet/${pet.id}`}>
            <img
              src={pet.photos[0]?.medium || defaultImage}
              alt={pet.name}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PetList;
