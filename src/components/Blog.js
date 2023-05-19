import { useState } from 'react';

const Blog = ({ blog, updateLikesBlog }) => {
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
    });
    // console.log(updateBlog);
  };
  return (
    <div style={blogStyle}>
      {`${blog.title} - ${blog.author} `}
      <button onClick={() => setIsShowContent(!isShowContent)}>
        {isShowContent ? 'hide' : 'view'}
      </button>
      <div style={showContent}>
        <a href={blog.url} target='_Blank'>
          {blog.url}
        </a>
        <div>
          <span>Likes {likes} </span>
          <button onClick={handleLikeClick}>like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
