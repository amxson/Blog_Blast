import { useState } from "react";
import { getCurrentUser } from "../../utils/authentic";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp, faCommentDots, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { BlogContext } from "../context/blogcontext";

let currentUser = getCurrentUser() ? getCurrentUser().username : null;

const BlogPost = ({ blog, likePost, addComment, updateBlog, deleteBlog }) => {

  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editContent, setEditContent] = useState(blog.content);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      if (comment) {
        addComment(blog.id, comment, currentUser);
        setComment("");
        setShowModal(false);
      }
    } else {
      navigate('/splash');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    let blogData = JSON.parse(localStorage.getItem("blogs"));
    let currId = blog.id;
    let editedPostIndex = blogData.findIndex((blog) => blog.id === currId);
    if (editedPostIndex !== -1) {
      blogData[editedPostIndex].title = editTitle;
      blogData[editedPostIndex].content = editContent;
      localStorage.setItem("blogs", JSON.stringify(blogData));
    }
    window.location.reload();
    setIsEditing(false);
  };

  const handleDelete = () => {
    let currId = blog.id;
    let blogData = JSON.parse(localStorage.getItem("blogs")).reverse();
    let editedPostIndex = blogData.findIndex((blog) => blog.id === currId);
    if (editedPostIndex !== -1) {
      blogData.splice(editedPostIndex, 1);
      localStorage.setItem("blogs", JSON.stringify(blogData));
    }
    window.location.reload();
  };

  return (
 
    <div className="blog-post">
      <div className="user">
        <img src='../profile.png' width= '40px' height= '40px'alt="Profile" /> 
        <div className="user__info">
            <h5>{blog.author}</h5>
        </div>
        {currentUser === blog.author && (
            <div className="btn_container">
              <button onClick={handleEdit}><FontAwesomeIcon style={{ fontSize: '25px' }} icon={faEdit} /></button>
              <button onClick={handleDelete}><FontAwesomeIcon style={{ fontSize: '25px' }} icon={faTrash} /></button>
            </div>
          )}
      </div>

      {isEditing ? (
        <>
          <div className="max">
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
        <div className="titles">
        <div class="card__body"> 
    <span class="tag tag-red">{blog.category.name}</span> 
    <h4>{blog.title}</h4> 
    <p>{blog.content}</p> 
  </div> 
        </div>

        </>
      )}

      <div className="thumb">
        <button onClick={() => likePost(blog.id)}>
          <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faThumbsUp} />({blog.likes})
        </button>
        <button onClick={() => setShowModal(true)}>
          <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faCommentDots} />
        </button>
      </div>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
           
            <div className="card mb-3">
            <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
              <div className="card-body">
                <h5 className="card-title">Leave a comment</h5>
                <hr />
                <form onSubmit={handleCommentSubmit}>
                  <div className="form-group">
                    <textarea
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-control"
                      placeholder="Add a comment"
                    />
                  </div>
                  <button type="submit" className="btn">Comment</button>
                </form>
              </div>
            </div>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        <div id="comments">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <div key={index} className="comment">
                <img
                  src="./profile.png"
                  alt="Avatar"
                />
                <div className="comment-content">
                  <p>
                    <strong>{comment[0]}:</strong> {comment[1]}
                  </p>
                  <div className="comment-actions">
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;