import React, { useState } from 'react';

function AddCrewmateForm({ supabase, onCrewmateAdded }) {
  const [name, setName] = useState('');
  const [favorite, setFavorite] = useState('');

  async function handleAddCrewmate() {
    if (name && favorite) {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([{ name, favorite }]);

      if (error) {
        console.error('Error adding crewmate:', error);
      } else {
        setName('');
        setFavorite('');
        if (onCrewmateAdded) {
          onCrewmateAdded(data[0]);
        }
      }
    }
  }

  return (
    <form>
      <input
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <label>
          <input
            type='radio'
            value='chocolate'
            checked={favorite === 'chocolate'}
            onChange={(e) => setFavorite(e.target.value)}
          />
          Chocolate
        </label>
        <label>
          <input
            type='radio'
            value='ice cream'
            checked={favorite === 'ice cream'}
            onChange={(e) => setFavorite(e.target.value)}
          />
          Ice Cream
        </label>
        <label>
          <input
            type='radio'
            value='apple'
            checked={favorite === 'apple'}
            onChange={(e) => setFavorite(e.target.value)}
          />
          Apple
        </label>
        <label>
          <input
            type='radio'
            value='burger'
            checked={favorite === 'burger'}
            onChange={(e) => setFavorite(e.target.value)}
          />
          Burger
        </label>
        <label>
          <input
            type='radio'
            value='fries'
            checked={favorite === 'fries'}
            onChange={(e) => setFavorite(e.target.value)}
          />
          Fries
        </label>
      </div>
      <button
        type='button'
        onClick={handleAddCrewmate}>
        Add Crewmate
      </button>
    </form>
  );
}

export default AddCrewmateForm;
