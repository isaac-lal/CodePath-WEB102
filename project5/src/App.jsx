//key: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJueExrd2llUXdjUEVxVUFVQncyT3hRMzhPdTRmMzNaUk9rTnVuWTc0S1MyQlo5dEpJbiIsImp0aSI6IjYwOWJkY2M3ZTA5NzZjNGE5Mzg3NjA1YTFiZmIxN2E2MDNjNzc4NWVhMzIyODA3MmZjMzA4MTZmZTMyZTgyNGM0ODE4YWFjMzE2ODQ2ZjRiIiwiaWF0IjoxNjc5OTg0OTA0LCJuYmYiOjE2Nzk5ODQ5MDQsImV4cCI6MTY3OTk4ODUwNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.PLVr24qLdR_-oFNusruJg0NdsQ4parJw-Rt6jodJ9odVnHMCj4_7vPNBbu4NuxGGyzaVmLCxO0p4G_NGhB2__JNqfPOZGUNlrS1IqH44NTj_Mf6P7jaxgatDspOIh2qj0UUMIePvYhyA-fuu-QnN1bukTkbpKbt2BxY4DccF7gNnb5G--zsKUqjw6voxVuLq9xP_d9w59Rtwezy7juy_WPe7uNBG7J0ooYRm5ijjvYPQyjOwgfzIYqq4uucp441sr1cXemYxCBiQWzn7kEjRx5Uot9NT1Jqpg5sqdxCmWg69uLusAYVCvCx2hzgw4-vLKFcJVytmZ2Z-SzsOJ2aP_w
//NOTE TO GRADER: My key is probably expired by the time you are grading this...

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from './components/Dashboard.jsx';
import defaultImage from './assets/default.jpeg';

function App() {

  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [mostCommonType, setMostCommonType] = useState('');
  const [mostCommonGender, setMostCommonGender] = useState('');
  const [mostCommonAge, setMostCommonAge] = useState('');

  const calculateMostCommonAttributes = (petsData) => {
    // console.log("entered")
    if (!petsData || petsData.length === 0) {
      return;
    }
  
    const typeCount = {};
    const genderCount = {};
    const ageCount = {};
  
    petsData.forEach((pet) => {
      typeCount[pet.type] = (typeCount[pet.type] || 0) + 1;
      genderCount[pet.gender] = (genderCount[pet.gender] || 0) + 1;
      ageCount[pet.age] = (ageCount[pet.age] || 0) + 1;
    });
  
    // console.log("typeCount:", typeCount);
    // console.log("genderCount:", genderCount);
    // console.log("ageCount:", ageCount);
    // console.log("called")

    const mostCommonType = Object.keys(typeCount).reduce((a, b) =>
    typeCount[a] > typeCount[b] ? a : b,
    ""
  );
  const mostCommonGender = Object.keys(genderCount).reduce((a, b) =>
    genderCount[a] > genderCount[b] ? a : b,
    ""
  );
  const mostCommonAge = Object.keys(ageCount).reduce((a, b) =>
    ageCount[a] > ageCount[b] ? a : b,
    ""
  );
  
    setMostCommonType(mostCommonType);
    setMostCommonGender(mostCommonGender);
    setMostCommonAge(mostCommonAge);
    // console.log(mostCommonType, mostCommonGender, mostCommonAge);
  };  

  const fetchPets = async () => {
    try {
      const response = await axios.get(
        "https://api.petfinder.com/v2/animals",
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJueExrd2llUXdjUEVxVUFVQncyT3hRMzhPdTRmMzNaUk9rTnVuWTc0S1MyQlo5dEpJbiIsImp0aSI6IjYwOWJkY2M3ZTA5NzZjNGE5Mzg3NjA1YTFiZmIxN2E2MDNjNzc4NWVhMzIyODA3MmZjMzA4MTZmZTMyZTgyNGM0ODE4YWFjMzE2ODQ2ZjRiIiwiaWF0IjoxNjc5OTg0OTA0LCJuYmYiOjE2Nzk5ODQ5MDQsImV4cCI6MTY3OTk4ODUwNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.PLVr24qLdR_-oFNusruJg0NdsQ4parJw-Rt6jodJ9odVnHMCj4_7vPNBbu4NuxGGyzaVmLCxO0p4G_NGhB2__JNqfPOZGUNlrS1IqH44NTj_Mf6P7jaxgatDspOIh2qj0UUMIePvYhyA-fuu-QnN1bukTkbpKbt2BxY4DccF7gNnb5G--zsKUqjw6voxVuLq9xP_d9w59Rtwezy7juy_WPe7uNBG7J0ooYRm5ijjvYPQyjOwgfzIYqq4uucp441sr1cXemYxCBiQWzn7kEjRx5Uot9NT1Jqpg5sqdxCmWg69uLusAYVCvCx2hzgw4-vLKFcJVytmZ2Z-SzsOJ2aP_w`,
          },
          params: {
            limit: 100,
          },
        }
      );
      setPets(response.data.animals);
      calculateMostCommonAttributes(response.data.animals);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleAgeFilterChange = (event) => {
    setAgeFilter(event.target.value);
  };
  
  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  useEffect(() => {
    const filtered = pets
      .filter((pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((pet) => (!typeFilter ? true : pet.type === typeFilter))
      .filter((pet) => (!ageFilter ? true : pet.age === ageFilter))
      .filter((pet) => (!genderFilter ? true : pet.gender === genderFilter));
  
    setFilteredPets(filtered);
  }, [search, pets, typeFilter, ageFilter, genderFilter]);
  

  useEffect(() => {
    fetchPets();
  }, []);
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  return (
    <div className="App">
      <h1>Pet Browser</h1>
      <Dashboard
        mostCommonType={mostCommonType}
        mostCommonGender={mostCommonGender}
        mostCommonAge={mostCommonAge}
      />

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
        />
        <div className="filter-dropdowns">
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="">Filter by Animal Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Small & Furry">Small & Furry</option>
          <option value="Horse">Horse</option>
          <option value="Scales, Fins & Other">Scales, Fins & Other</option>
          <option value="Barnyard">Barnyard</option>
        </select>
          <select value={ageFilter} onChange={handleAgeFilterChange}>
            <option value="">Filter by Age</option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
          <select value={genderFilter} onChange={handleGenderFilterChange}>
            <option value="">Filter by Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div className="pets-container">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <h3>{pet.name}</h3>
            <img
              src={pet.photos[0]?.medium || defaultImage}
              alt={pet.name}
            />
            <p>{pet.type}</p>
            <p>{pet.age}</p>
            <p>{pet.gender}</p>
            <p>{pet.breeds.primary}</p>
            <p>{pet.contact.address.city}, {pet.contact.address.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;