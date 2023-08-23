import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [photo, setPhoto] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const apiKey = 'aVGRQld9RM0MxMTxAySql0ytPn8PPM7sK7VtLNCe';
  const rover = 'curiosity';
  const sol = 1000;

  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`
      );
      const data = await response.json();

      if (!data.photos || data.photos.length === 0) {
        alert('No photos available');
        return;
      }

      const filteredPhotos = data.photos.filter((photo) => {
        const attributes = [photo.camera.name, photo.rover.landing_date, photo.earth_date];
        return !attributes.some((attribute) => bannedAttributes.includes(attribute));
      });

      if (filteredPhotos.length === 0) {
        alert('No photos available due to banned attributes');
        return;
      }

      const randomIndex = Math.floor(Math.random() * filteredPhotos.length);
      setPhoto(filteredPhotos[randomIndex]);
    } catch (error) {
      console.error('Error fetching Mars Rover Photos: ', error);
      alert('An error occurred while fetching Mars Rover Photos');
    }
  };

  useEffect(() => {
    fetchRandomPhoto();
  }, [bannedAttributes]);

  const addToBanList = (attribute) => {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  };

  const removeFromBanList = (attribute) => {
    setBannedAttributes(bannedAttributes.filter((item) => item !== attribute));
  };

  if (!photo) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Curiosity Rover Photos</h1>
      <div className="photo-container">
        <div className="buttons">
          <img src={photo.img_src} alt={`Rover: ${rover}, Camera: ${photo.camera.name}`} />
          <p>
            Camera: {photo.camera.name}{' '}
            <button onClick={() => addToBanList(photo.camera.name)}>Ban</button>
          </p>
        </div>
        <button onClick={fetchRandomPhoto}>New Random Photo</button>
      </div>
      <h2>Banned Attributes</h2>
      <ul>
        {bannedAttributes.map((attribute, index) => (
          <li key={index}>
            {attribute}{' '}
            <button onClick={() => removeFromBanList(attribute)}>Unban</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

