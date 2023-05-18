import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return <div>{!user ? loginForm() : blogList()}</div>;
};

export default App;
