import { useContext, useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Common/Sidebar';
import { BlogContext } from '../components/context/blogcontext';

const Home = () => {
  const { blogs, setBlogs, filteredBlogs } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState('');

  const addBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  const likePost = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    const blogData = JSON.parse(localStorage.getItem('blogs'));
    const currentBlog = blogData.find((blog) => blog.id === id);
    if (!currentBlog.likedBy || !currentBlog.likedBy.includes(currentUser)) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === id
            ? {
                ...blog,
                likes: blog.likes + 1,
                likedBy: blog.likedBy ? [...blog.likedBy, currentUser] : [currentUser],
              }
            : blog
        )
      );

      const updatedBlogData = blogData.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              likes: blog.likes + 1,
              likedBy: blog.likedBy ? [...blog.likedBy, currentUser] : [currentUser],
            }
          : blog
      );
      localStorage.setItem('blogs', JSON.stringify(updatedBlogData));
    }
  };

  const addComment = (id, comment, currUser) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, [currUser, comment]] }
          : blog
      )
    );
  };

  const filteredSearchBlogs = filteredBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container home-container ">
      <Sidebar />
      <div className='serach-ic'>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <BlogList blogs={filteredSearchBlogs} likePost={likePost} addComment={addComment} />
    </div>
  );
};

export default Home;
