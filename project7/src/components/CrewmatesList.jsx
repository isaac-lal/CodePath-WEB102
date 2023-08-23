import React from "react";
import { Link } from "react-router-dom";

function CrewmatesList({ crewmates }) {
  return (
    <div>
      <Link to="/add">Add Crewmate</Link>
      <ul>
        {crewmates.map((crewmate) => (
          <li key={crewmate.id}>
            <Link to={`/crewmate/${crewmate.id}`}>
              <img src="./src/assets/default.png" alt="Crewmate" />
            </Link>
            <span>{crewmate.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrewmatesList;
