import React from "react";
import "./PetDetail.css";
import defaultImage from "../assets/default.jpeg"

const PetDetail = ({ pet }) => {
  const { name, type, age, gender, breeds, photos, contact } = pet;

  return (
    <div className="pet-detail-container">
      <h2>{name}</h2>
      <img src={photos[0]?.large || defaultImage} alt={name} />
      <div className="pet-detail-info">
        <p>Type: {type}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Breed: {breeds.primary}</p>
        <p>
          Location: {contact.address.city}, {contact.address.state}
        </p>
      </div>
    </div>
  );
};

export default PetDetail;
