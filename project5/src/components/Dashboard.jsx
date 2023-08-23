import React from 'react';

function Dashboard({ mostCommonType, mostCommonGender, mostCommonAge }) {
  return (
    <div className="dashboard">
      <div className="common-type">
        <h2>Common Animal:</h2>
        <p>{mostCommonType}</p>
      </div>
      <div className="common-gender">
        <h2>Common Gender:</h2>
        <p>{mostCommonGender}</p>
      </div>
      <div className="common-age">
        <h2>Common Age:</h2>
        <p>{mostCommonAge}</p>
      </div>
    </div>
  );
}

export default Dashboard;
