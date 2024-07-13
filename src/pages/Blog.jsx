import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BlogPost from '../components/Blog/BlogPost';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const foundBlog = blogs.find((b) => b.id === id);
    setBlog(foundBlog);
  }, [id]);

  const likePost = (id) => {
    const updatedBlog = { ...blog, likes: 0 };
    setBlog(updatedBlog);
  };

  const addComment = (comment) => {
    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, comment],
    };
    setBlog(updatedBlog);
  };

  return blog ? (
    <BlogPost blog={blog} likePost={likePost} addComment={addComment} />
  ) : (
    <p>Loading...</p>
  );
};

export default Blog;
