import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';

const App = () => {
  const [messageShow, setMessageShow] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loginInfo = window.localStorage.getItem('loginInfo');
    if (loginInfo) {
      setUser(JSON.parse(loginInfo));
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  function showMessage(isSuccess, message, timeOut) {
    setMessageShow({
      styleMessage: isSuccess ? 'success' : 'error',
      message: message,
    });
    setTimeout(() => {
      setMessageShow(null);
    }, timeOut);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await loginService.login({ username, password });
    if (user.token) {
      setUser(user);
      window.localStorage.setItem('loginInfo', JSON.stringify(user));
      setUserName('');
      setPassword('');
      const getBlog = await blogService.getAll();
      setBlogs(getBlog);
      showMessage(true, `Welcome ${user.name}`, 5000);
    } else {
      showMessage(false, user.error, 5000);
    }
  };

  const handleUsernameChange = (value) => {
    setUserName(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
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
      showMessage(false, blog.message, 5000);
      return;
    }
    blogFormRef.current();
    const getAllBlog = await blogService.getAll();
    setBlogs(getAllBlog);
    const message = `a new blog ${blogAdd.title} by ${blogAdd.author} added`;
    showMessage(true, message, 5000);
  };

  const updateLikesBlog = async (getBlog) => {
    await blogService.updateBlog(getBlog, user.token);
    const getAllBlog = await blogService.getAll();
    setBlogs(getAllBlog);
  };

  const removeBlog = async (getBlogId) => {
    const blog = await blogService.removeBlog(getBlogId, user.token);
    const getAllBlog = await blogService.getAll();
    setBlogs(getAllBlog);
    showMessage(true, blog.message, 5000);
  };

  return (
    <div>
      {messageShow && <Notification message={messageShow} />}

      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      ) : (
        <BlogList
          name={user.name}
          handleLogout={handleLogout}
          blogFormRef={blogFormRef}
          createNewBlog={createNewBlog}
          blogs={blogs}
          updateLikesBlog={updateLikesBlog}
          removeBlog={removeBlog}
        />
      )}
    </div>
  );
};

export default App;
