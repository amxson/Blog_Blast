import { useState } from 'react';
import BlogForm from '../components/Blog/BlogForm';


const Blogg = () => {
  let cc = JSON.parse(localStorage.getItem('blogs'))
  const [blogs, setBlogs] = useState(cc ? cc : []);
  const addBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <div className="container home-container ">
    <BlogForm addBlog={addBlog} />
  </div>
  );
};

export default Blogg;
