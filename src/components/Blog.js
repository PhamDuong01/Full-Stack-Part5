import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLikesBlog, removeBlog, owner }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [isShowContent, setIsShowContent] = useState(false);
  const showContent = { display: isShowContent ? '' : 'none' };
  const [likes, setLikes] = useState(blog.likes);

  const handleLikeClick = () => {
    setLikes(likes + 1);

    updateLikesBlog({
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    });
  };

  const handleRemoveClick = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) removeBlog(blog.id);
    return;
  };
  return (
    <div style={blogStyle}>
      {`${blog.title} - ${blog.author} `}
      <button onClick={() => setIsShowContent(!isShowContent)}>
        {isShowContent ? 'hide' : 'view'}
      </button>
      <div style={showContent}>
        <a href={blog.url} target='_Blank' rel='noreferrer'>
          {blog.url}
        </a>
        <div>
          <span>Likes {likes} </span>
          <button onClick={handleLikeClick}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {owner === blog.user.name && <button onClick={handleRemoveClick}>remove</button>}
      </div>
    </div>
  );
};

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  updateLikesBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
};

export default Blog;
