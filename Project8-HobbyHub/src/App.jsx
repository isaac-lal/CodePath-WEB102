import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import AddPost from './components/AddPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              posts={posts}
              setPosts={setPosts}
            />
          }
        />
        <Route
          path='/add-post'
          element={<AddPost />}
        />
        <Route
          path='/post/:id'
          element={
            <Post
              posts={posts}
              setPosts={setPosts}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
