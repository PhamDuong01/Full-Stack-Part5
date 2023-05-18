import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
    setUser(user);
    window.localStorage.setItem('loginInfo', JSON.stringify(user));
    setUserName('');
    setPassword('');
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };
  const handleLogout = () => {
    window.localStorage.removeItem('loginInfo');
    setUser(null);
  };

  const handleAddNewBlog = async (e) => {
    e.preventDefault();
    const blogAdd = {
      title,
      author,
      url,
    };
    await blogService.createNew(blogAdd, user.token);
    const getBlog = await blogService.getAll();
    setBlogs(getBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
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
        <div>
          <span>{user.name} is logged in</span>
          <button onClick={handleLogout}>log out</button>
        </div>
        <div>
          <h1>create new</h1>
          <form onSubmit={handleAddNewBlog}>
            <div>
              <span>title:</span>
              <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <div>
              <span>author:</span>
              <input type='text' onChange={(e) => setAuthor(e.target.value)} value={author} />
            </div>
            <div>
              <span>url:</span>
              <input type='text' onChange={(e) => setUrl(e.target.value)} value={url} />
            </div>
            <button type='submit'>create</button>
          </form>
        </div>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };

  return <div>{!user ? loginForm() : blogList()}</div>;
};

export default App;
