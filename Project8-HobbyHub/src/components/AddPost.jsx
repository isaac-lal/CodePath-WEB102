import React, { useState } from 'react';

import supabase from '../supabaseClient';
import Navbar from './Navbar';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const createPost = async () => {
    const newPost = {
      title,
      content,
      image,
      upvotes: 0,
      created_at: new Date(),
    };

    const { data, error } = await supabase.from('posts').insert(newPost);

    setTitle('');
    setContent('');
    setImage('');
  };

  return (
    <div>
      <Navbar showAddPost={false} />
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='Image URL'
        />
        <button onClick={createPost}>Create Post</button>
      </div>
    </div>
  );
}

export default AddPost;
