import { useState } from 'react';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [isShowContent, setIsShowContent] = useState(false);

  const showContent = { display: isShowContent ? '' : 'none' };

  return (
    <div style={blogStyle}>
      {`${blog.title} - ${blog.author} `}
      <button onClick={() => setIsShowContent(!isShowContent)}>
        {isShowContent ? 'hide' : 'view'}
      </button>
      <div style={showContent}>
        <p>{blog.url}</p>
        <p>Likes {blog.likes}</p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
