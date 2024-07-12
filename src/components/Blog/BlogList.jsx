import BlogPost from './BlogPost';

const BlogList = ({ blogs, likePost, addComment }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogPost key={blog.id} blog={blog} likePost={likePost} addComment={addComment} />
      ))}
    </div>
  );
};

export default BlogList;
