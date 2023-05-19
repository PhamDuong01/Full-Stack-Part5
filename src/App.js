import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  // const [url, setUrl] = useState('');

  const [messageShow, setMessageShow] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loginInfo = window.localStorage.getItem('loginInfo');
    if (loginInfo) {
      setUser(JSON.parse(loginInfo));
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await loginService.login({ username, password });
    if (user.token) {
      setUser(user);
      window.localStorage.setItem('loginInfo', JSON.stringify(user));
      setUserName('');
      setPassword('');
      setMessageShow({
        styleMessage: 'success',
        message: `Welcome ${user.name}`,
      });
      const getBlog = await blogService.getAll();
      setBlogs(getBlog);
      setTimeout(() => {
        setMessageShow(null);
      }, 5000);
    } else {
      setMessageShow({
        styleMessage: 'error',
        message: user.error,
      });
      setTimeout(() => {
        setMessageShow(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loginInfo');
    setUser(null);
  };

  const createNewBlog = async (getBlog) => {
    const blogAdd = {
      title: getBlog.title.length < 1 ? null : getBlog.title,
      author: getBlog.author,
      url: getBlog.url.length < 1 ? null : getBlog.url,
    };

    const blog = await blogService.createNew(blogAdd, user.token);
    if (!blog.title) {
      setMessageShow({
        styleMessage: 'error',
        message: blog.message,
      });
      setTimeout(() => {
        setMessageShow(null);
      }, 5000);
      return;
    }
    blogFormRef.current();

    const getAllBlog = await blogService.getAll();
    setMessageShow({
      styleMessage: 'success',
      message: `a new blog ${blogAdd.title} by ${blogAdd.author} added`,
    });

    setBlogs(getAllBlog);
    setTimeout(() => {
      setMessageShow(null);
    }, 5000);
  };

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            Username :
            <input type='text' onChange={(e) => setUserName(e.target.value)} value={username} />
          </div>
          <div>
            Password :
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  };

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div style={{ paddingBottom: '10px' }}>
          <span>{user.name} is logged in </span>
          <button onClick={handleLogout}>log out</button>
        </div>
        <Togglable buttonLabel='create new Blog' ref={blogFormRef}>
          <BlogForm creatBlog={createNewBlog} />
        </Togglable>
        <div style={{ paddingTop: '10px' }}>
          <h4>Blogs list: </h4>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {messageShow && <Notification message={messageShow} />}

      {!user ? loginForm() : blogList()}
    </div>
  );
};

export default App;
