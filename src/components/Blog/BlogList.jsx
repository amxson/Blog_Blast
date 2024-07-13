import React from 'react';
import BlogPost from './BlogPost';

const BlogList = ({ blogs, likePost, addComment }) => {
  return (
    <div className="blog-list">
      {blogs.length === 0 ? (
        <p className='noblog'>No blogs found</p>
      ) : (
        blogs.map((blog) => (
          <BlogPost key={blog.id} blog={blog} likePost={likePost} addComment={addComment} />
        ))
      )}
    </div>
  );
};

export default BlogList;
