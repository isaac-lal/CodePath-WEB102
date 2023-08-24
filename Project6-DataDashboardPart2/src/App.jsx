//NOTE TO GRADER: My key is probably expired by the time you are grading this...

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import axios from 'axios';
import './App.css';
import './components/graphs.css';
import Dashboard from './components/Dashboard.jsx';
import PetDetail from './components/PetDetail.jsx';
import PetList from './components/PetList.jsx';
import TypeFrequencyBarChart from './components/TypeFrequencyBarChart';
import GenderFrequencyBarChart from './components/GenderFrequencyBarChart';

function App() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [mostCommonType, setMostCommonType] = useState('');
  const [mostCommonGender, setMostCommonGender] = useState('');
  const [mostCommonAge, setMostCommonAge] = useState('');

  const typeFrequencyData = useMemo(() => {
    const typeCount = {};

    pets.forEach((pet) => {
      if (pet.type === 'Dog' || pet.type === 'Cat') {
        typeCount[pet.type] = (typeCount[pet.type] || 0) + 1;
      }
    });

    return Object.keys(typeCount).map((type) => ({
      type,
      frequency: typeCount[type],
    }));
  }, [pets]);

  const genderFrequencyData = useMemo(() => {
    const genderCount = {};

    pets.forEach((pet) => {
      genderCount[pet.gender] = (genderCount[pet.gender] || 0) + 1;
    });

    return Object.keys(genderCount).map((gender) => ({
      gender,
      frequency: genderCount[gender],
    }));
  }, [pets]);

  const PetDetailWrapper = ({ pets }) => {
    const { id } = useParams();
    const pet = pets.find((p) => p.id.toString() === id);
    return pet ? <PetDetail pet={pet} /> : <h2>Pet not found</h2>;
  };

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

    const mostCommonType = Object.keys(typeCount).reduce(
      (a, b) => (typeCount[a] > typeCount[b] ? a : b),
      ''
    );
    const mostCommonGender = Object.keys(genderCount).reduce(
      (a, b) => (genderCount[a] > genderCount[b] ? a : b),
      ''
    );
    const mostCommonAge = Object.keys(ageCount).reduce(
      (a, b) => (ageCount[a] > ageCount[b] ? a : b),
      ''
    );

    setMostCommonType(mostCommonType);
    setMostCommonGender(mostCommonGender);
    setMostCommonAge(mostCommonAge);
    // console.log(mostCommonType, mostCommonGender, mostCommonAge);
  };

  const fetchPets = async () => {
    try {
      const response = await axios.get('https://api.petfinder.com/v2/animals', {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJueExrd2llUXdjUEVxVUFVQncyT3hRMzhPdTRmMzNaUk9rTnVuWTc0S1MyQlo5dEpJbiIsImp0aSI6ImM5Y2FiZTQ3YjZiMGNhNmM0MjM4MGE0NTk3NzIwYTc2MDJiN2Y4ZWY1NjMxODU1MzFiMzM2MTAzYjcyOTBjZDMyMGQyZjI0YzcxNTRiMzU2IiwiaWF0IjoxNjgwNjIxODcxLCJuYmYiOjE2ODA2MjE4NzEsImV4cCI6MTY4MDYyNTQ3MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.B5Gp35896jWDjcrS6G1euvxPjFXx3aguAvDueYAokoeMdz2hLmbMQt5RiLGpxL_UFFKu1fXpgbmx8ntGn0bMUuiNd7s69H1sOpp14k47Hm45Qf5RZUsdQZF8rEd_FBIVBGptrxNXeXIjh-wFZBf_SxZtbHCOBMCYdVTY_eFFBzkBS_sDfw3ei4deAM41UtYrGHa8T5aYfnlUbYlraFkX_i2HP88Z2aolnkPrywVQaTRWJi9Foz0c3BU4uaKaiXZ23ZZzN0gCe8KD9mxOu_2bfiOX8yeHAOfdxnAt4iIybJFkPd5qAn_UvdDAmdzhOKN4uXfpF19jhYsrU0Hfw9bRzA`,
        },
        params: {
          limit: 100,
        },
      });
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
      .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
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
    <BrowserRouter>
      <div className='App'>
        <h1>
          <Link
            to='/'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            Pet Browser
          </Link>
        </h1>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Dashboard
                  mostCommonType={mostCommonType}
                  mostCommonGender={mostCommonGender}
                  mostCommonAge={mostCommonAge}
                />
                <div className='graph-container'>
                  <GenderFrequencyBarChart data={genderFrequencyData} />
                  <TypeFrequencyBarChart data={typeFrequencyData} />
                </div>

                <PetList pets={filteredPets} />
              </>
            }
          />
          <Route
            path='/pet/:id'
            element={<PetDetailWrapper pets={pets} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
