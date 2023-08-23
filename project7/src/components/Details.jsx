import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./details.css";
import img from "../assets/default.png";
import EditCrewmateForm from "./EditCrewmateForm.jsx";

function Details({ supabase, deleteCrewmate }) {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCrewmate(id);
  }, [id]);

  async function fetchCrewmate(id) {
    const { data } = await supabase.from("crewmates").select("*").eq("id", id).single();
    setCrewmate(data);
  }

  async function handleUpdateCrewmate(name, favorite) {
    if (name && favorite) {
      await supabase
        .from("crewmates")
        .update({ name, favorite })
        .eq("id", id);
      fetchCrewmate(id);
      setEditing(false);
    }
  }

  async function handleDeleteCrewmate(id) {
    await deleteCrewmate(id);
    window.location = "/";
  }

  function handleEditClick() {
    setEditing(true);
  }

  return (
    <div className="crewmate-details">
      {editing ? (
        <EditCrewmateForm
          crewmate={crewmate}
          onSubmit={handleUpdateCrewmate}
        />
      ) : (
        <div className="details">
          {crewmate ? (
            <>
              <img src={img} alt="Crewmate" />
              <p>Name: {crewmate.name}</p>
              <p>Favorite: {crewmate.favorite}</p>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={() => handleDeleteCrewmate(id)}>Delete</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
