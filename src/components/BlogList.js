import Togglable from './Togglable';
import BlogForm from './BlogForm';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({
  name,
  handleLogout,
  blogFormRef,
  createNewBlog,
  blogs,
  updateLikesBlog,
  removeBlog,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <div style={{ paddingBottom: '10px' }}>
        <span>{name} is logged in </span>
        <button onClick={handleLogout}>log out</button>
      </div>
      <Togglable buttonLabel='create new Blog' ref={blogFormRef}>
        <BlogForm creatBlog={createNewBlog} />
      </Togglable>
      <div style={{ paddingTop: '10px' }}>
        <h4>Blogs list: </h4>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikesBlog={updateLikesBlog}
              removeBlog={removeBlog}
              owner={name}
            />
          ))}
      </div>
    </div>
  );
};

BlogList.prototype = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  blogFormRef: PropTypes.func.isRequired,
  createNewBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  updateLikesBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default BlogList;
