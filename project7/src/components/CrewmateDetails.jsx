import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, Link } from "react-router-dom";
import "./details.css";
import img from "../assets/default.png";
import Form from "./form.jsx";

const supabaseUrl = "https://opcsqcaivuonyyhiqyso.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3NxY2FpdnVvbnl5aGlxeXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzNDI3MzgsImV4cCI6MTk5NjkxODczOH0.6X-1oPrvUfSxpz1E0k6JPrUDcSbVqdY7OYzFK0sCi6k";

const supabase = createClient(supabaseUrl, supabaseKey);

function CrewmateDetails({ deleteCrewmate, updateCrewmate }) {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState("");
  const [formFavorite, setFormFavorite] = useState("");

  useEffect(() => {
    fetchCrewmate(id);
  }, [id]);

  async function fetchCrewmate(id) {
    const { data } = await supabase.from("crewmates").select("*").eq("id", id).single();
    setCrewmate(data);
    setFormName(data?.name || "");
    setFormFavorite(data?.favorite || "");
  }

  async function handleUpdateCrewmate() {
    if (formName && formFavorite) {
      await updateCrewmate(id, formName, formFavorite);
      fetchCrewmate(id);      
      setEditing(false);
    }
  }

  function handleEditClick() {
    setEditing(true);
  }

  return (
    <div className="crewmate-details">
      <Link to="/">Crewmates</Link>
      {editing ? (
        <Form />
      ) : (
        <div className="details">
          {crewmate ? (
            <>
              <img src={img} alt="Crewmate" />
              <p>Name: {crewmate.name}</p>
              <p>Favorite: {crewmate.favorite}</p>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={() => deleteCrewmate(id)}>Delete</button>
              
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CrewmateDetails;