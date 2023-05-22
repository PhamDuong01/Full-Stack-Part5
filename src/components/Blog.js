import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLikesBlog, removeBlog, curUser }) => {
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
  const owner = blog.user ? blog.user.name : '';
  const handleLikeClick = () => {
    setLikes(likes + 1);

    updateLikesBlog({
      ...blog,
      likes: likes + 1,
      user: blog.user ? blog.user.id : '',
    });
  };

  const handleRemoveClick = () => {
    window.confirm(`Remove ${blog.title} by ${blog.author}`) && removeBlog(blog.id);
    return;
  };

  return (
    <div className='blog-item' style={blogStyle}>
      <span className='blog-title'>{`${blog.title} - ${blog.author} `}</span>
      <button className='show-detail' onClick={() => setIsShowContent(!isShowContent)}>
        {isShowContent ? 'hide' : 'view'}
      </button>
      <div className='blog-detail' style={showContent}>
        <a href={blog.url} target='_Blank' rel='noreferrer'>
          {blog.url}
        </a>
        <div>
          <span>
            Likes <span className='like-Number'>{likes}</span>{' '}
          </span>
          <button className='btn-Like' onClick={handleLikeClick}>
            like
          </button>
        </div>
        <p className='blog-Owner'>{owner}</p>
        {curUser === owner && (
          <button className='btn-Remove' onClick={handleRemoveClick}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikesBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  curUser: PropTypes.string.isRequired,
};

export default Blog;
