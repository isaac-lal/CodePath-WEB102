import React from "react";
import { Link } from "react-router-dom";

function Navbar({ showAddPost }) {
  return (
    <nav>
      <Link to="/">
        <h1>POST!</h1>
      </Link>
      {showAddPost && (
        <Link to="/add-post">
          <button>Add Post</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;