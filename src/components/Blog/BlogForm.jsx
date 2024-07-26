import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser } from '../../utils/authentic';
import { useNavigate } from 'react-router-dom';

const setLS = (blog) => {
  let blogs = JSON.parse(localStorage.getItem('blogs')) || []; // Get existing blogs or initialize an empty array
  blogs.push(blog); // Add the new blog to the array
  localStorage.setItem('blogs', JSON.stringify(blogs)); // Store the updated array in local storage
};

export const getLS = () => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || []; // Get existing blogs or return an empty array
  return blogs;
};

const BlogForm = ({ addBlog, editBlog, blog }) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    blog?.category || { id: 6, name: 'uncategorized' }
  ); // Default to 'uncategorized'

  const categories = [
    { id: 1, name: 'Art' },
    { id: 2, name: 'Cars' },
    { id: 3, name: 'Fitness' },
    { id: 4, name: 'Food' },
    { id: 5, name: 'Music' },
    { id: 6, name: 'uncategorized' },
  ];

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find((category) => category.id.toString() === selectedCategoryId);
    setSelectedCategory(selectedCategory || { id: 6, name: 'uncategorized' }); // Fallback to 'uncategorized'
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/splash');
      return;
    }

    const newBlog = {
      id: blog?.id || uuidv4(),
      title,
      content,
      likes: 0,
      comments: blog?.comments || [],
      author: currentUser.username,
      category: selectedCategory, // Store the selected category object
    };

    if (blog) {
      editBlog(newBlog);
    } else {
      addBlog(newBlog);
      setLS(newBlog);
    }
    setTitle('');
    setContent('');
    setSelectedCategory({ id: 6, name: 'uncategorized' }); // Reset to 'uncategorized'
    console.log(getLS());
    navigate('/');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className='newblog'>
      <h2>{blog ? 'Edit Blog Post' : 'Create a New Blog Post'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      ></textarea>

      <div>
        <select id="category" value={selectedCategory?.id || ''} onChange={handleCategoryChange}>
          <option value="6">Uncategorized</option>
          {categories
            .filter((category) => category.id !== 6) // Exclude 'uncategorized' from the options list
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <button className='postbtn' type="submit" disabled={!selectedCategory}>
        {blog ? 'Update' : 'Post'}
      </button>
    </form>
  );
};

export default BlogForm;
